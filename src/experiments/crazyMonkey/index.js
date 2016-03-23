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

      var renderOptions = engine.render.options;
      renderOptions.background = '/experiments/crazyMonkey/img/background.jpg';
      renderOptions.showAngleIndicator = false;
      renderOptions.wireframes = false;

      Engine.run(engine);

      envData.resizeCanvas();
    }

    function createScene() {
      var floor = Bodies.rectangle(sceneWidth/2, sceneHeight-100, sceneWidth, 10, { isStatic: true, render: { visible:false } });
      floor.label = 'floor';
      World.add(engine.world, [floor]);
    };

    function createMonkey() {
      var monkey = Bodies.rectangle(200, 100, 100, 100, {render:{sprite:{texture:'/experiments/crazyMonkey/img/evilmonkey.png'}}});
      monkey.label = 'monkey';
      World.add(engine.world, [monkey]);
    }

})();
