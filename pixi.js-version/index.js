var app = new PIXI.Application(800, 600);
document.body.appendChild(app.view);


app.stage.addChild(bunny);

// Listen for animate update
app.ticker.add(function (delta) {
  // just for fun, let's rotate mr rabbit a little
  // delta is 1 if running at 100% performance
  // creates frame-independent transformation
  bunny.rotation += 0.1 * delta;
});