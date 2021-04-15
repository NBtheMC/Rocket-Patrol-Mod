class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        //add to scene
        scene.add.existing(this); 
        //set player value, 1 or 2
        this.player;
        //current direction flying. -1 for left, 1 for right
        this.direction;
        if(this.player == 1){
            this.direction = 1;
        }
        else if(this.player == 2){
            this.direction = -1;
        }
        //set key bindings accordingly
        this.upKey;
        this.downKey;
        this.fireKey;    
        this.movementSpeed = 2;    //pixels per frame
        this.isFiring = false;     //firing status
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update(){
        //move up and down
        if(!this.isFiring){
            if((this.upKey).isDown && this.y >= borderUISize){
                this.y -= this.movementSpeed;
            }
            if(this.downKey.isDown && this.y <= game.config.height - borderUISize){
                this.y += this.movementSpeed;
            }      
        }
        this.x = Phaser.Math.Clamp(this.x, borderUISize+borderPadding, game.config.width - borderUISize - borderPadding);

        //fire
        if(Phaser.Input.Keyboard.JustDown(this.fireKey) && !this.isFiring){
            this.isFiring = true;
            this.sfxRocket.play();
        }
        //move left when fired by p1. right by p2
        if(this.isFiring && this.x >= borderUISize + borderPadding){
            this.x -= this.movementSpeed;
        }
        //reset on miss
        if(this.x <= borderUISize + borderPadding){
            this.isFiring = false;
            this.x = game.config.height - borderUISize - borderPadding;
        }
    }

    //move rocket back to original position
    reset(){
        this.isFiring = false;
        //reset on left side
        if(this.player == 1){
            this.x = borderUISize + borderPadding;
        }
        //reset on right side
        else if(this.player == 2){
            this.x = game.config.width - borderUISize - borderPadding;
        }
    }
}