PIXI.utils.skipHello();

var app = new PIXI.Application({
    width: 1400,
    height: 600,
    view: document.getElementById('canvas')
});

var loader = new PIXI.loaders.Loader();

loader.add('bird', '/assets/spine/bird.json');

var bird1, bird2, bird3;

loader.load((loader) => {
    
    bird1 = new PIXI.spine.Spine(loader.resources['bird'].spineData);
    bird2 = new PIXI.spine.Spine(loader.resources['bird'].spineData);
    bird3 = new PIXI.spine.Spine(loader.resources['bird'].spineData);
    

    //FIRST
    var container1 = new PIXI.Container();
    var text1 = new PIXI.Text('First animation', {fill: 0xffffff});
    container1.addChild(bird1, text1);
    container1.position.set(200, 200);
    text1.position.set(-100, -190);

    bird1.state.setAnimation(0, 'WinEffect', true);
    
    //SECOND
    var container2 = new PIXI.Container();
    var text2 = new PIXI.Text('Second animation', {fill: 0xffffff});
    container2.addChild(bird2, text2);
    container2.position.set(600, 200);
    text2.position.set(-100, -190);

    bird2.state.setAnimation(0, 'Win', true);

    //TOGETHER
    var container3 = new PIXI.Container();
    var text3 = new PIXI.Text('Together', {fill: 0xffffff});
    container3.addChild(bird3, text3);
    container3.position.set(1000, 200);
    text3.position.set(-100, -190);

    bird3.state.setAnimation(0, 'WinEffect', true);
    bird3.state.setAnimation(1, 'Win', true);

    app.stage.addChild(
        container1,
        container2,
        container3
    );
})
