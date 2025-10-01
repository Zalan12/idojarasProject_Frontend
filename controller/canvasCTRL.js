

async function chartOs() {
    let adatok=[];
    let maximum=0;
    let minimumm=0;
    try{    
        let res=await fetch(`${serverURL}/weather/user/${loggedUser.id}`);
        weathers=await res.json();

        weathers.forEach(weather => {
            ujObj={label:weather.datum, y:[weather.minTemp,weather.maxTemp], name:weather.weatherType}
            if(weather.maxTemp>=maximum)
            {
                maximum=weather.maxTemp;
            }
            if(weather.maxTemp<=minimumm)
                {
                    minimumm=weather.maxTemp;
                }
            adatok.push(ujObj)
        });

    var chart = new CanvasJS.Chart("chartContainer", {   
        theme:"dark2",
        title:{
            text: "Időjárási adatok"              
        },
        axisY: {
            suffix: " °C",
            maximum: maximum+15,
            gridThickness: 0,
            minimum:minimumm-20

        },
        toolTip:{
            shared: true,
            content: "{name} </br> <strong>Temperature: </strong> </br> Min: {y[0]} °C, Max: {y[1]} °C"
        },
        data: [{
            type: "rangeSplineArea",
            fillOpacity: 0.1,
            color: "#91AAB1",
            indexLabelFormatter: formatter,
            dataPoints: adatok
        }]
    });
    chart.render();
     
    var images = [];    
     
    addImages(chart);
    
    function addImages(chart) {
        for(var i = 0; i < chart.data[0].dataPoints.length; i++){
            var dpsName = chart.data[0].dataPoints[i].name;
            if(dpsName == "Felhős"){
                images.push($("<img>").attr("src", "https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/cloudy.png"));
            } else if(dpsName == "Esős"){
            images.push($("<img>").attr("src", "https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/rainy.png"));
            } else if(dpsName == "Napos"){
                images.push($("<img>").attr("src", "https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/sunny.png"));
            }
             else if(dpsName == "Viharos"){
            images.push($("<img>").attr("src", "https://cdn-icons-png.flaticon.com/128/1146/1146860.png"));
            }
            else if(dpsName == "Szeles"){
                images.push($("<img>").attr("src", "https://cdn-icons-png.flaticon.com/128/2044/2044008.png"));
                }
     
        images[i].attr("class", dpsName).appendTo($("#chartContainer>.canvasjs-chart-container"));
        positionImage(images[i], i);
        }
    }
     
    function positionImage(image, index) {
        var imageCenter = chart.axisX[0].convertValueToPixel(chart.data[0].dataPoints[index].x);
        var imageTop =  chart.axisY[0].convertValueToPixel(chart.axisY[0].maximum);
     
        image.width("40px")
        .css({ "left": imageCenter - 20 + "px",
        "position": "absolute","top":imageTop + "px",
        "position": "absolute"});
    }
     
    $( window ).resize(function() {
        var cloudyCounter = 0, rainyCounter = 0, sunnyCounter = 0;    
        var imageCenter = 0;
        for(var i=0;i<chart.data[0].dataPoints.length;i++) {
            imageCenter = chart.axisX[0].convertValueToPixel(chart.data[0].dataPoints[i].x) - 20;
            if(chart.data[0].dataPoints[i].name == "Felhős") {					
                $(".cloudy").eq(cloudyCounter++).css({ "left": imageCenter});
            } else if(chart.data[0].dataPoints[i].name == "Esős") {
                $(".rainy").eq(rainyCounter++).css({ "left": imageCenter});  
            } else if(chart.data[0].dataPoints[i].name == "Napos") {
                $(".sunny").eq(sunnyCounter++).css({ "left": imageCenter});  
            }     
            else if(chart.data[0].dataPoints[i].name == "Viharos") {
                $(".storm").eq(sunnyCounter++).css({ "left": imageCenter});  
            }
            else if(chart.data[0].dataPoints[i].name == "Szeles") {
                $(".windy").eq(sunnyCounter++).css({ "left": imageCenter});  
            }  
        }
    });
     
    function formatter(e) { 
        if(e.index === 0 && e.dataPoint.x === 0) {
            return " Min " + e.dataPoint.y[e.index] + "°";
        } else if(e.index == 1 && e.dataPoint.x === 0) {
            return " Max " + e.dataPoint.y[e.index] + "°";
        } else{
            return e.dataPoint.y[e.index] + "°";
        }
    } 
     
}
catch(err){console.log(err)}
    }
