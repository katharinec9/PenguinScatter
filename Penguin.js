var margin = {
    top: 20,
    right: 20,
    botton: 30,
    left: 40
}
width = 700 - margin.left - margin.right;
height = 500 - margin.top - margin.bottom;
var getChange = function(student)
    {
        return student.final[0].grade - student.final[0].grade[student.final[0].grade.length-1];
    }
var sortByProperty = function(property)
{
    return function(a,b)
        {
        if(a[property] == b[property])
            {return 0}
            else if (a[property] < b[property])
                {return 1}
                else
                    {return -1}
    }
}
var classDataPromise = d3.json("classData.json");
    classDataPromise.then (function(student){
            console.log("worked", student); 
                                     displaySpread(student);
                                      
                                      },
                      function(err){
                    console.log("failed:", err);
    })

var displaySpread = function(student)
    {
        var width = 550;
        var height = 300;
        
    var svg = d3.select("#spread svg")
                .attr("width", width)
                .attr("height", height)
                .attr("id", "graph")
    
    var xScale = d3.scaleLinear()
                    .domain( [0, student.length])
                    .range( [0, width])
    
    var yScale = d3.scaleLinear()
                    .domain([
                            d3.min(student,getChange),
                            d3.max(student,getChange)
                    ])
                    .range([height,0]);
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        
        svg.selectAll("cirlce")
            .data(student)
            .enter()
            .append("circle")
            .attr("cx", function(student,index)
                 {
                return xScale(index);
        })
        .attr("cy", function(student)
             {
            return yScale(getChange(student));
        })
        .attr("r",3)
        .attr("fill",function(student)
             {
            return colorScale(student.final[0].grade);
        })
    svg.append("line")
        .attr("x1",length, 0)
        .attr("x2",length, 0)
        .attr("y1",height, 10)
        .attr("y2",height, 10)
        .attr("stroke","red")
    }