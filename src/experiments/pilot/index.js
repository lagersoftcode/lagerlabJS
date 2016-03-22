(function(){
  var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

  var domElement = document.getElementById('canvas');
  var engine = Engine.create({
    render: {
      element: document.body,
      canvas: domElement,
    }
  });

  var removeFriction = function(body) {
    body.friction = 0;
    body.frictionStatic = 0;
    body.frictionAir = 0;
  };

  var createBoxedWorld = function() {
    var screenStartX = 410;
    var screenStartY = 600;

    var maxY = 640;
    var maxX = 800;

    var solid = 20;

    var floor = Bodies.rectangle(screenStartX+(solid/2), maxY+(solid*1.5), maxX-solid, solid, { isStatic: true });
    floor.label = 'floor';
    removeFriction(floor);
    floor.restitution = 1.0;

    var leftWall = Bodies.rectangle(solid, maxY/2+(solid*1.5), solid, maxY+solid, { isStatic: true});
    removeFriction(leftWall);
    leftWall.restitution = 1.0;

    var rightWall = Bodies.rectangle(maxX+solid, maxY/2+(solid*1.5), solid, maxY+solid, { isStatic: true});
    removeFriction(rightWall);
    rightWall.restitution = 1.0;

    var roof = Bodies.rectangle(screenStartX+(solid/2), (screenStartY/6)-(solid*2), maxX-solid, solid, { isStatic: true});
    removeFriction(roof);
    roof.restitution = 1.0;

    return [floor, roof, leftWall, rightWall];
  };

  // Actual logic
  var mainBox = Bodies.rectangle(400, 200, 80, 80);
  removeFriction(mainBox);
  mainBox.restitution = 1.765003; //almost...

  var currentBoxes = [];

  var boxId = 0;
  function drawBoxes(){
    if(currentBoxes.length < 200){
      var newBox = Bodies.rectangle(Math.random() *500 + 100, Math.random() * 500 + 100, 10, 10, { frictionAir: .7 });
      newBox.label = 'box'+boxId;
      boxId++;
      currentBoxes.push(newBox);
      World.add(engine.world, newBox);
    }

    setTimeout(drawBoxes, 1);
  }

  World.add(engine.world, [mainBox].concat(createBoxedWorld()));

  drawBoxes();

  //Remove objects touching floor
  Matter.Events.on(engine, 'collisionActive', function(e) {
    for (var i = 0; i < e.pairs.length; i++) {
      if(e.pairs[i].bodyA.label === 'floor'){
        for (var j = 0; j < currentBoxes.length; j++) {
          if(currentBoxes[j].label == e.pairs[i].bodyB.label){
            currentBoxes.splice(j, 1);
          }
        }
        World.remove(engine.world, e.pairs[i].bodyB);

      }

      if(e.pairs[i].bodyB.label === 'floor'){
        for (var j = 0; j < currentBoxes.length; j++) {
          if(currentBoxes[j].label == e.pairs[i].bodyA.label){
            currentBoxes.splice(j, 1);
          }
        }
        World.remove(engine.world, e.pairs[i].bodyA);

      }
    }
  });

  Engine.run(engine);

})();
