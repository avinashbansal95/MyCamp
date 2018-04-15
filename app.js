var express=require('express');
var app=express();
app.set("view engine", "ejs");

    var campgrounds=[
      {name:"Additya shrivastva", img:"https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144397f3c479a3eab1_340.jpg"},
      {name:"Aviansh bansal", img:"https://pixabay.com/get/ea37b7072ef7063ed1584d05fb1d4e97e07ee3d21cac104497f2c27ca7e9b2bc_340.jpg"},
    {name:"sooraj tripathi", img:"https://pixabay.com/get/eb32b7072df5043ed1584d05fb1d4e97e07ee3d21cac104497f2c27ca5e4bcb9_340.jpg"}
]
app.get("/", function(req,res)
{
    res.render("landing");
});
app.get("/campgrounds",function(req,res)
{
res.render("campgrounds",{campgrounds:campgrounds});
});
app.post("/campgrounds",function(req,res)
{
    var name=req.body.name;
    var image=req.body.image;
    var newCampground={name: name, img: image};
    campgrounds.push(newCampground);
    //redirect to get request
    res.redirect("/campgrounds")
});
app.get("/campgrounds/new", function(req,res)
{
    res.render("new");
})
app.listen(process.env.PORT, process.env.IP, function()
{
    console.log("The yelpCamp server has started")
})