class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, p){
        super(scene, x, y, texture, frame);
        //add to scene
        scene.add.existing(this); 
        //set player value, 1 or 2
        this.player = p;
        this.paddle;
        this.currentPlayer;
        // if(p == 1){
        //     this.p1Paddle = new Paddle(this, borderUISize + borderPadding, game.config.height/2, 'paddle');
        // }
        // else if(p == 2){
        //     this.p2Paddle = new Paddle(this, game.config.width - borderUISize - borderPadding, game.config.height/2, 'paddle');
        // }
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
                this.x = this.paddle.getX() + 6;
                this.y = this.paddle.getY();
            }
        }
        else if(this.player == 2){
            if(this.isFiring && this.x >= borderUISize + borderPadding){
                this.x -= this.movementSpeed;
            }
            //reset on miss
            if(this.x < borderUISize + borderPadding){
                this.isFiring = false;
                this.x = this.paddle.getX() - 6;
                this.y = this.paddle.getY();
            }
        }
        
        
    }

    //move rocket back to original position
    reset(){
        this.isFiring = false;
        //reset on left side
        if(this.player == 1){
            this.x = this.paddle.getX() + 6;
            this.y = this.paddle.getY();
        }
        //reset on right side
        else if(this.player == 2){
            this.x = this.paddle.getX() - 6;
            this.y = this.paddle.getY();
        }
    }
}