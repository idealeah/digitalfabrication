//demo using a simplex noise library, documentation here: https://www.npmjs.com/package/simplex-noise
//Remember to link the library in index.html

//instantiate our simplex noise
var simplex = new SimplexNoise();

//create our line parameters
var numPoints = 800 / 20; //the number of points
var stepSize = 800 / numPoints; //distance between points

// Create a Paper.js Path:
var path = new Path({
    strokeColor: 'red',
    strokeWidth: 5
});

//add points to our line:
for (i = 0; i < numPoints; i++) {
    //add our points to the path
    path.add(new Point(i * stepSize, 400));
}

function onFrame(event) {
    for (var i = 0; i < numPoints; i++) {
        //get milliseconds
        var millis = event.time;
        console.log(event);
        //get 2D noise information
        var y = simplex.noise2D(i / 20, millis / 8);
        //calibrate the y value so it fits the canvas
        y = (y + 5) * 60;
        //move the y value of each point
        path.segments[i].point.y = y;
    }

    //smooth the path
    path.smooth();
    //console.log(event.count);

    //download svg every 100th frame using modulo operator
    if (event.count % 100 == 0) {
        //downloadAsSVG();
    }
}

//a function to download the .svg file
function downloadAsSVG(fileName) {
    // use default name if not provided
    fileName = fileName || "output.svg";

    // create a data url of the file
    var svgData = project.exportSVG({
        asString: true
    });
    var url = "data:image/svg+xml;utf8," + encodeURIComponent(svgData);

    // create a link to the data, and "click" it
    var link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.click();
}