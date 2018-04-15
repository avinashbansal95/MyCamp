
var Campgrounds = require("../models/campground");
var Comment     = require("../models/comments")

var middlewareObj = {}
 
middlewareObj.checkCampgroundOwnership = function(req, res, next)
{


    //does the user logged in at all?
     if(req.isAuthenticated())
     {
     Campgrounds.findById(req.params.id, function(err, foundCampground)
     {
         if(err)
         {
             res.redirect("back");
         }
         else
         {
             //does user own the campground?
             if(foundCampground.author.id.equals(req.user._id))
             {
                 next();
             }
             else
             {
                 req.flash("error","You don't have permission to do that")
                 res.redirect("back");
             }
         }
     });
     
     }
     else
     {
         req.flash("error","You need to be logged in first")
         res.redirect("back");
     }
}

//comment ownership
middlewareObj.checkCommentOwnership = function(req, res, next)
{
    //does the user logged in at all?
     if(req.isAuthenticated())
     {
     Comment.findById(req.params.comment_id, function(err, foundComment)
     {
         if(err)
         {
             res.redirect("back");
         }
         else
         {
             //does user own the campground?
             if(foundComment.author.id.equals(req.user._id))
             {
                 next();
             }
             else
             {
                 req.flash("error","You don't have the permission to do that")
                 res.redirect("back");
             }
         }
     });
     
     }
     else
     {
         req.flash("error","You need to be logged in first")
         res.redirect("back");
     }
}

//LOGIN MIDDLEWARE


middlewareObj.isLoggedIn= function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","you need to be logged in first");
    res.redirect("/login");
}

module.exports = middlewareObj;