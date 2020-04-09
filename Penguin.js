var original = [];
var classDataPromise = d3.json("classData.json");
    classDataPromise.then (function(student){
            console.log("worked", student);
                                     original = student.slice(); 
                                     
                                      
                                      },
                      function(err){
                    console.log("failed:", err);
    })
var makeTitle = function(msg)