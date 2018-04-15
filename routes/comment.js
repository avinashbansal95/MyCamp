var express      = require("express");
var router       = express.Router();
var Campgrounds  = require("../models/campground");
var Comment      = require("../models/comments")
var middleware = require("../middleware");
//COMMENTS NEW ROUTE
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req,res)
{
    
    Campgrounds.findById(req.params.id,function(err, campground)
    {
        if(err)
        {
            console.log(err)
        }
        else{
           
          res.render("comments/new",{campground:campground});  
        }
    })
 
})

//comment form submission

router.post("/campgroundS/:id/comments",middleware.isLoggedIn, function(req, res)
{
    //LOOKUP CAMPGROUND USING ID
    
    Campgrounds.findById(req.params.id,function(err, campground)
    {
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds")
        }
        else
        {
            //CREATE NEW COMMENT
            
            Comment.create(req.body.comment, function(err, comment)
            {
                if(err){
                    req.flash("error", "Couldn't create the comment");
                }
                else
                {
                    //ADD USENAME AND UID
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                     //CONNECT NEW COMMENT TO CAMPGROUND
                    campground.comments.push(comment);
                    campground.save();
                    
                    //REDIRECT TO CAMPGROUND SHOW PAGE
                    req.flash("success","Comment posted")
                    res.redirect("/campgrounds/"+campground._id)
                }
                
            })
        }
    })

})
//COMMENT EDIT

router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req, res)
{
   
    Comment.findById(req.params.comment_id, function(err, comment)
    {
        if(err)
        {
            res.redirect("back");
        }
        else
        {
            res.render("comments/edit",{comment:comment, campground_id: req.params.id});
        }
    });
    
});

//COMMENTS UPDATE
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership, function(req, res)
{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment,function(err, updatedComment)
    {
       if(err)
           {
              res.redirect("back") ;
           }
           else
           {
               req.flash("success","successfully eddited the comment");
               res.redirect("/campgrounds/" + req.params.id)
           }
    })
})

//Destroy route
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req, res)
{
    Comment.findByIdAndRemove(req.params.comment_id, function(err)
    {
        if(err)
        {
            res.redirect("back")
        }
        else
        {
            req.flash("success","Deleted the comment");
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})


module.exports = router;