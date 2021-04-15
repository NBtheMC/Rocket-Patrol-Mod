class Paddle extends Phaser.GameObjects.Sprite{
    
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        //add to scene
        scene.add.existing(this); 
        //set player value, 1 or 2
        this.player;
        //set key bindings accordingly
        this.upKey;
        this.downKey;
    }


    update(){
        //move up and down
        
    }
}