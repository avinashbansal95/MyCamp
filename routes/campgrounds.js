
var express = require("express");
var router  = express.Router();
var Campgrounds  = require("../models/campground");
var middleware = require("../middleware");



router.get("/campgrounds",function(req,res)
{
    //Get all the campground from db
    Campgrounds.find({},function(err, allCampground)
    {
        if(err)
        {
            console.log(err);
        }
        else{
               res.render("campgrounds/campgrounds",{campgrounds:allCampground, currentUser:req.user});
        }
 });

});
router.post("/campgrounds",middleware.isLoggedIn,function(req,res)
{
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.image;
    var desc=req.body.description;
    var author = {
        id:req.user._id,
        username:req.user.username
    }
    var newCampground={name: name, price:price, img: image, description:desc, author:author};
     //create a new campground and save it to db
    Campgrounds.create(newCampground, function(err, newlyCreated)
     {
       if(err)
       {
           req.flash("error","Something went wrong,try again");
       }
       else{
           req.flash("success","Campground posted successfully!!")
          res.redirect("/campgrounds");
       }
     
     });
    //redirect to get request
    
});
router.get("/campgrounds/new",middleware.isLoggedIn, function(req,res)
{
    res.render("campgrounds/new");
})

//show page route
router.get("/campgrounds/:id",function(req,res)
{
    Campgrounds.findById(req.params.id).populate("comments").exec(function(err, newCampground)
    {
        if(err)
        {
            console.log(err)
        }
        else{
            console.log(newCampground)
          res.render("campgrounds/show",{campground:newCampground});  
        }
    })
    
});

//EDIT ROUTE
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req, res)
{
    Campgrounds.findById(req.params.id, function(err, foundCampground)
    {
        res.render("campgrounds/edit",{campground:foundCampground});
    });
});
       
//UPDATE ROUTE
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req, res)
{
    //Find and update the campground
    Campgrounds.findByIdAndUpdate(req.params.id, req.body.campground,function(err, updatedCampground)
    {
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else
        {
            //Redirect somewhere
            req.flash("success","Campground updated successfully");
            res.redirect("/campgrounds/" + req.params.id)//or updatedCampground._id
        }
    })
    
})

//DESTROY CAMPGROUND
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req, res)
{
    Campgrounds.findByIdAndRemove(req.params.id, function(err)
    {
        if(err)
        {
            res.redirect("/campgrounds/" + req.params.id)
        }
        else
        {
            req.flash("success","Deleted");
            res.redirect("/campgrounds")
        }
    })
})


module.exports = router;