(function(){
  var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

    var domElement = document.getElementById('canvas');
    var engine = null;

    var sceneWidth = 800;
    var sceneHeight = 600;

    window.runExperiment = function(envData){
      sceneWidth = domElement.width;
      sceneHeight = domElement.height;

      engine = Engine.create({
        render: {
          element: document.body,
          canvas: domElement,
        }
      });

      createScene();
      createMonkey();
      listenEvents();
      createHappyFaces();

      var mouseConstraint = Matter.MouseConstraint.create(engine);
      World.add(engine.world, [mouseConstraint]);

      var renderOptions = engine.render.options;
      renderOptions.background = '/experiments/crazyMonkey/img/background.jpg';
      renderOptions.showAngleIndicator = false;
      renderOptions.wireframes = false;

      Engine.run(engine);

      envData.resizeCanvas();
    }

    function createScene() {
      var floor = Bodies.rectangle(-20, sceneHeight-60, sceneWidth*2, 10, { isStatic: true, render: { visible:false } });
      floor.label = 'floor';

      var leftWall = Bodies.rectangle(-5, 0, 10, sceneHeight*2, {isStatic: true, render:{visible:true}});
      leftWall.label = 'wall';
      leftWall.restitution = 1.00;

      var rightWall = Bodies.rectangle(sceneWidth+5, 0, 10, sceneHeight*2, {isStatic: true, render:{visible:true}});
      rightWall.label = 'wall';
      rightWall.restitution = 1.00;

      World.add(engine.world, [floor, leftWall, rightWall]);
    };

    function createMonkey() {
      var monkey = Bodies.rectangle(200, 300, 200, 200, {render:{sprite:{texture:'/experiments/crazyMonkey/img/evilmonkey.png'}}});
      monkey.label = 'monkey';
      World.add(engine.world, [monkey]);
    }

    function createHappyFaces(){
      for(var x = 0; x< 50; x++){
        var happyFace = Bodies.circle(Math.random() * sceneWidth, 0, 20, {render:{sprite:{texture:'/experiments/crazyMonkey/img/happyface.png', xScale:.3, yScale:.3}}});
        happyFace.label = 'face';
        World.add(engine.world, [happyFace]);
      }
    }

    function listenEvents(){
      Matter.Events.on(engine, 'collisionActive', function(e) {
        for (var i = 0; i < e.pairs.length; i++) {

          if(e.pairs[i].bodyA.label === 'monkey' && e.pairs[i].bodyB.label == 'face'){
            e.pairs[i].bodyB.render.sprite.texture = '/experiments/crazyMonkey/img/sadface.png';
          }

          if(e.pairs[i].bodyB.label === 'monkey' && e.pairs[i].bodyA.label == 'face'){
            e.pairs[i].bodyA.render.sprite.texture = '/experiments/crazyMonkey/img/sadface.png';
          }

          if(e.pairs[i].bodyA.label === 'wall'){
            World.remove(engine.world, e.pairs[i].bodyB);
          }

          if(e.pairs[i].bodyB.label === 'wall'){
            World.remove(engine.world, e.pairs[i].bodyA);
          }
        }
      });
    }

})();
