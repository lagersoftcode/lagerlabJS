(function(){
  var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

  var domElement = document.getElementById('canvas');
  var engine = Engine.create({
    render: {
      element: document.body,
      canvas: domElement,
    }
  });

  var boxA = Bodies.rectangle(400, 200, 80, 80);
  var boxB = Bodies.rectangle(450, 50, 80, 80);
  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

  World.add(engine.world, [boxA, boxB, ground]);

  Engine.run(engine);

})();
