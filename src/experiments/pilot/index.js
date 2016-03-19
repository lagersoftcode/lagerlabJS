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
  var box = Bodies.rectangle(400, 200, 80, 80);
  removeFriction(box);
  box.restitution = 1.765003; //almost...

  World.add(engine.world, [box].concat(createBoxedWorld()));

  Engine.run(engine);
})();
