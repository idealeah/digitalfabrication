var center = new Point(500, 250);

var path = new Path();
path.strokeColor = 'red';
path.moveTo(center + [-100, -100]);
path.lineTo(center + [100, 100]);

console.log(path);