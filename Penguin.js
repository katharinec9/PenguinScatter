var margin = {
    top: 20,
    right: 20,
    botton: 30,
    left: 40
}
width = 700 - margin.left - margin.right;
height = 500 - margin.top - margin.bottom;


var getFinal = function(student)
    {return (student.final[0].grade)}

var getmeanHW = function(student)
{
  var Grade = student.homework.map(function(homework)
                {
    return (homework.grade)
                })
  return d3.mean(Grade)
}

var getmeanQuiz = function(student)
{
    var Grade = student.quizes.map(function(quizes)
                    {return (quizes.grade)
                    })
    return d3.mean(Grade)
}

var getmeanTest = function(student)
{
    var Grade = student.test.map(function(test)
                                {return (test.grade)})
    return d3.mean(Grade)
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
        student.sort(sortByProperty("property")),                        
        displayFinalHW(student);
                                      
                                      },
                      function(err){
                    console.log("failed:", err);
    })

var displayFinalHW = function(students)
    {
        var width = 550;
        var height = 300;
        
    var svg = d3.select("#spread svg")
                .attr("width", width)
                .attr("height", height)
                .attr("id", "graph")
    
    var xScale = d3.scaleLinear()
                    .domain( [
                        d3.min(students, getmeanHW),
                        d3.max(students, getmeanHW)
                    ])
                    .range( [0, width])
    
    var yScale = d3.scaleLinear()
                    .domain([
                            d3.min(students, getFinal),
                            d3.max(students, getFinal)
                    ])
                    .range([height,0]);
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        
        svg.selectAll("circle")
            .data(students)
            .enter()
            .append("circle")
            .attr("cx", function(student,index)
                 {
                return xScale(getmeanHW(student));
        })
        .attr("cy", function(student)
             {
            return yScale(getFinal(student));
        })
        .attr("r",3)
        .attr("fill",function(student)
             {
            return colorScale(student.final[0].grade);
        })
        .on("mouseover", function(student){
            var xPosition = d3.event.pageX;
            var yPosition = d3.event.pageY
              d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("img")
                .attr("src", "imgs/"+student.picture)
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value")
                .text(getFinal(student))
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value1")
                .text(getmeanHW(student))
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value2")
                .text(getmeanQuiz(student))
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value3")
                .text(getmeanTest(student))
        
            d3.select("#tooltip").classed("hidden", false)
            
        })
        
        .on("mouseout", function(){
            d3.select("#tooltip").classed("hidden", true)
        })
    /*svg.append("line")
        .attr("x1",xScale(0))
        .attr("x2",xScale(width))
        .attr("y1",yScale(70))
        .attr("y2", yScale(70))
        .attr("stroke","red")*/
    d3.select("#button1").on("click", function()
        {
         d3.selectAll("circle") 
            .remove();
        displayFinalHW(students) 
    })
        d3.select("#button2").on("click", function()
        {
         d3.selectAll("circle") 
            .remove();
        displayHWquiz(students) 
    })
      d3.select("#button3").on("click", function()
        {
         d3.selectAll("circle") 
            .remove();
        displayFinalTest(students)
    }) 
        d3.select("#button4").on("click", function()
        {
         d3.selectAll("circle") 
            .remove();
        displayFinalQuiz(students)
        d3.select("#average").classed("hidden", false)
    })

        
        
    }
var displayHWquiz = function(students)
{
            var width = 550;
        var height = 300;
        
    var svg = d3.select("#spread svg")
                .attr("width", width)
                .attr("height", height)
                .attr("id", "graph")
    
    var xScale = d3.scaleLinear()
                    .domain( [
                        d3.min(students, getmeanHW),
                        d3.max(students, getmeanHW)
                    ])
                    .range( [0, width])
    
    var yScale = d3.scaleLinear()
                    .domain([
                            d3.min(students, getmeanQuiz),
                            d3.max(students, getmeanQuiz)
                    ])
                    .range([height,0]);
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        
        svg.selectAll("circle")
            .data(students)
            .enter()
            .append("circle")
            .attr("cx", function(student,index)
                 {
                return xScale(getmeanHW(student));
        })
        .attr("cy", function(student)
             {
            return yScale(getmeanQuiz(student));
        })
        .attr("r",3)
        .attr("fill",function(student)
             {
            return colorScale(student.final[0].grade);
        })
    .on("mouseover", function(student){
            var xPosition = d3.event.pageX;
            var yPosition = d3.event.pageY
              d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("img")
                .attr("src", "imgs/"+student.picture)
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value")
                .text(getFinal(student))
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value1")
                .text(getmeanHW(student))
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value2")
                .text(getmeanQuiz(student))
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value3")
                .text(getmeanTest(student))
            
            d3.select("#tooltip").classed("hidden", false)
            
        })
        
        .on("mouseout", function(){
            d3.select("#tooltip").classed("hidden", true)
        })
    
}
var displayFinalTest = function(students)
{
        var width = 550;
        var height = 300;
        
    var svg = d3.select("#spread svg")
                .attr("width", width)
                .attr("height", height)
                .attr("id", "graph")
    
    var xScale = d3.scaleLinear()
                    .domain( [
                        d3.min(students, getmeanTest),
                        d3.max(students, getmeanTest)
                    ])
                    .range( [0, width])
    
    var yScale = d3.scaleLinear()
                    .domain([
                            d3.min(students, getFinal),
                            d3.max(students, getFinal)
                    ])
                    .range([height,0]);
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        
        svg.selectAll("circle")
            .data(students)
            .enter()
            .append("circle")
            .attr("cx", function(student,index)
                 {
                return xScale(getmeanTest(student));
        })
        .attr("cy", function(student)
             {
            return yScale(getFinal(student));
        })
        .attr("r",3)
        .attr("fill",function(student)
             {
            return colorScale(student.final[0].grade);
        })
    .on("mouseover", function(student){
            var xPosition = d3.event.pageX;
            var yPosition = d3.event.pageY
              d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("img")
                .attr("src", "imgs/"+student.picture)
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value")
                .text(getFinal(student))
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value1")
                .text(getmeanHW(student))
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value2")
                .text(getmeanQuiz(student))
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value3")
                .text(getmeanTest(student))
            
            d3.select("#tooltip").classed("hidden", false)
            
        })
        
        .on("mouseout", function(){
            d3.select("#tooltip").classed("hidden", true)
        })
    
}
var displayFinalQuiz = function(students)
{
        var width = 550;
        var height = 300;
        
    var svg = d3.select("#spread svg")
                .attr("width", width)
                .attr("height", height)
                .attr("id", "graph")
    
    var xScale = d3.scaleLinear()
                    .domain( [
                        d3.min(students, getmeanTest),
                        d3.max(students, getmeanTest)
                    ])
                    .range( [0, width])
    
    var yScale = d3.scaleLinear()
                    .domain([
                            d3.min(students, getmeanQuiz),
                            d3.max(students, getmeanQuiz)
                    ])
                    .range([height,0]);
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        
        svg.selectAll("circle")
            .data(students)
            .enter()
            .append("circle")
            .attr("cx", function(student,index)
                 {
                return xScale(getmeanTest(student));
        })
        .attr("cy", function(student)
             {
            return yScale(getmeanQuiz(student));
        })
        .attr("r",3)
        .attr("fill",function(student)
             {
            return colorScale(student.final[0].grade);
        })
    .on("mouseover", function(student){
            var xPosition = d3.event.pageX;
            var yPosition = d3.event.pageY
              d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("img")
                .attr("src", "imgs/"+student.picture)
           d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value")
                .text(getFinal(student))
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value1")
                .text(getmeanHW(student))
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value2")
                .text(getmeanQuiz(student))
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value3")
                .text(getmeanTest(student))
            
            
            d3.select("#tooltip").classed("hidden", false)
            
        })
        
        .on("mouseout", function(){
            d3.select("#tooltip").classed("hidden", true)
        })
    
}