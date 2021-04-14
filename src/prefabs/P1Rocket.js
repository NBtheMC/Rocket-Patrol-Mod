class P1Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        //add to scene
        scene.add.existing(this);    
        this.movementSpeed = 2;    //pixels per frame
        this.isFiring = false;     //firing status
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update(){
        //move up and down
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.movementSpeed;
            }
            if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.movementSpeed;
            }
        }
        this.x = Phaser.Math.Clamp(this.x, borderUISize+borderPadding, game.config.width - borderUISize - borderPadding);

        //fire
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring){
            this.isFiring = true;
            this.sfxRocket.play();
        }
        //move up when fired
        if(this.isFiring && this.y >= borderUISize*3 + borderPadding*.5){
            this.y -= this.movementSpeed;
        }
        //reset on miss
        if(this.y <= borderUISize*3 + borderPadding*.5){
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
        
    }

    //move rocket back to original position
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}