var mongoose = require("mongoose");
var Campgrounds = require("./models/campground");
var comment     = require("./models/comments");
var data = [
    {
        name: "Cloud's Rest", 
        img: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Desert Mesa", 
        img: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Canyon Floor", 
        img: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
]

function seedDB(){
    Campgrounds.remove({}, function(err)
    {
        if(err)
        {
            console.log(err);
        }
        console.log("campgrounds removed!!")
        //ADD CAMPGROUNDS
    data.forEach(function(seed){
    Campgrounds.create(seed, function(err, campground)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("added a campground");
            //Creating comment
            comment.create(
                {
                    text:"This place is great but i wish there was internet",
                    author:"Desmond haynes"
                },function(err, comment){
                  if(err)
                  {
                      console.log(err)
                  }
                  else{
                      campground.comments.push(comment);
                      campground.save();
                      console.log("created new comment");
                  }
            
                });
        }
    });
    
    
});
    });
}
    
    //TO DISPLAY COMMENTS 
    
    
//  Campgrounds.findOne({name:"Cloud's Rest"}).populate("comments").exec(function(err, user)
//   {
//       if(err)
//       {
//           console.log(err)
//       }
//       else{
//           console.log(user)
//       }
//   })
    
// }
module.exports = seedDB;