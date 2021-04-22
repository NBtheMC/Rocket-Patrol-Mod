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
        this.movementSpeed = 6;    //pixels per frame      
    }

    update(){
        //move up and down
        if((this.upKey).isDown && this.y >= borderUISize){
            this.y -= this.movementSpeed;
        }
        if(this.downKey.isDown && this.y <= game.config.height - borderUISize){
            this.y += this.movementSpeed;
        }
        this.y = Phaser.Math.Clamp(this.y, 3*(borderUISize+borderPadding), game.config.height - borderUISize - borderPadding);
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
}