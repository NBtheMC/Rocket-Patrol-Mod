class Ship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.movementSpeed = game.settings.spaceshipSpeed;
    }

    update(){
        //move spaceship
        this.y += this.movementSpeed;
        //move from bottom to top
        if(this.y >= game.config.height){
            this.y = 0;
        }
    }

    //position reset
    reset(){
        this.y = 0;
    }
}