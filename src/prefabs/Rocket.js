class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        //add to scene
        scene.add.existing(this); 
        //set player value, 1 or 2
        this.player;
        this.currentPlayer;
        this.paddle;
        //set key bindings accordingly
        this.upKey;
        this.downKey;
        this.fireKey;    
        this.movementSpeed = 6;    //pixels per frame
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
        this.y = Phaser.Math.Clamp(this.y, borderUISize+borderPadding, game.config.height - borderUISize - borderPadding);

        //fire
        if(Phaser.Input.Keyboard.JustDown(this.fireKey) && !this.isFiring){
            this.isFiring = true;
            this.sfxRocket.play();
        }
        //move right when fired by p1. left by p2
        if(this.player == 1){
            if(this.isFiring && this.x <= game.config.width){
                this.x += this.movementSpeed;
            }
            //reset on miss
            if(this.x > game.config.width){
                this.isFiring = false;
                this.x = borderUISize + borderPadding;
            }
        }
        else if(this.player == 2){
            if(this.isFiring && this.x >= borderUISize + borderPadding){
                this.x -= this.movementSpeed;
            }
            //reset on miss
            if(this.x < borderUISize + borderPadding){
                this.isFiring = false;
                this.x = game.config.width - borderUISize - borderPadding;
            }
        }
        
        
    }

    //move rocket back to original position
    reset(){
        this.isFiring = false;
        //reset on left side
        if(this.player == 1){
            this.x = this.paddle.x + 12;
        }
        //reset on right side
        else if(this.player == 2){
            this.x = this.paddle.x - 12;
        }
    }
}