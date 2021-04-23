class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    init(highScoreConfig){
        this.p1High = highScoreConfig.p1HighScore||0;
        this.p2High = highScoreConfig.p2HighScore||0;
    }
    preload(){
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('earth', 'assets/earth.png');
        this.load.image('saturn', 'assets/saturn.png');
        this.load.image('asteroids', 'assets/asteroids.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.image('paddle', 'assets/paddle.png');
        //spritesheet
        this.load.spritesheet('explosion', 'assets/explosion.png', 
            {frameWidth: 32, frameHeight: 64, startFrame: 0, endFrame: 9});
    }
    create(){
        console.log("p1: " + this.p1High + " p2: " + this.p2High);

        this.starfield = this.add.tileSprite(0,0,640,480, 'starfield').setOrigin(0,0);
        this.saturn = this.add.tileSprite(0,0,640,480, 'saturn').setOrigin(0,0);
        this.earth = this.add.tileSprite(0,0,640,480, 'earth').setOrigin(0,0);
        this.asteroids = this.add.tileSprite(0,0,640,480, 'asteroids').setOrigin(0,0);

        // Keyboard input declaration
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R); //reset key       
        //player 1
        keyUP1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyF1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); 
        //player 2
        keyUP2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyDOWN2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        keyF2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O); 

        //p1 paddle
        this.p1Paddle = new Paddle(this, borderUISize + borderPadding, game.config.height/2, 'paddle');
        this.p1Paddle.upKey = keyUP1;
        this.p1Paddle.downKey = keyDOWN1;
        //p1 rocket
        this.p1Rocket = new Rocket(this, borderUISize + borderPadding + 16, game.config.height/2, 'rocket');
        this.p1Rocket.player = 1;
        this.p1Rocket.currentPlayer = 1;
        this.p1Rocket.upKey = keyUP1;
        this.p1Rocket.downKey = keyDOWN1;
        this.p1Rocket.fireKey = keyF1;
        this.p1Rocket.angle = 90;
        this.p1Rocket.paddle = this.p1Paddle;

        //p2 paddle
        this.p2Paddle = new Paddle(this, game.config.width - borderUISize - borderPadding, game.config.height/2, 'paddle');
        this.p2Paddle.upKey = keyUP2;
        this.p2Paddle.downKey = keyDOWN2;
        //p2 rocket
        this.p2Rocket = new Rocket(this, game.config.width - borderUISize - borderPadding - 16, game.config.height/2, 'rocket');
        this.p2Rocket.player = 2;
        this.p2Rocket.currentPlayer = 2;
        this.p2Rocket.upKey = keyUP2;
        this.p2Rocket.downKey = keyDOWN2;
        this.p2Rocket.fireKey = keyF2;
        this.p2Rocket.angle = 270;
        this.p2Rocket.paddle = this.p2Paddle;

        //add spaceships
        this.ship01 = new Ship(this, game.config.width/2, game.config.height/2, 'spaceship', 0, 30);
        this.ship02 = new Ship(this, 2* (game.config.width/3), game.config.height/3, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Ship(this, game.config.width/3, 2 * game.config.height/3, 'spaceship', 0, 20).setOrigin(0,0);

        //green rectangle
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize*2, 0x00FF00).setOrigin(0,0);
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);            
            
        //animation config. binds to this scene
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion',{start: 0, end: 9, first: 0}),
            frameRate:30
        });

        this.p1Score = 0;
        //display score p1
        let scoreConfigp1 = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#EB8A23',
            color: '#000000',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
          }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfigp1);
        
        this.p2Score = 0;
        //display score p2
        let scoreConfigp2 = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#54579E',
            color: '#000000',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
          }
        this.scoreRight = this.add.text(game.config.width - 3.5*(borderUISize + borderPadding), borderUISize + borderPadding*2, this.p1Score, scoreConfigp2);

        //GAME OVER flag
        this.gameOver = false;
        //play timer
        this.secondsLeft = game.settings.gameTimer;
        this.secondsLeft/=1000;
        this.timerText = this.add.text(32, 32, this.secondsLeft);
        scoreConfigp1.fixedWidth = 0;
        scoreConfigp2.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, ()=>{
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfigp1).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfigp1).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        // Each 1000 ms call onEvent
        // from jjcapellan
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: onSecond, callbackScope: this, loop: true });
        function onSecond ()
        {
            if(this.secondsLeft>0){
                this.secondsLeft -= 1; // One second
                this.timerText.setText(this.secondsLeft);
            }
        }
    }

 
    

    update(){
        //restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            let highScoreConfig = {
                p1HighScore: Math.max(this.p1Score,this.p1High),
                p2HighScore: Math.max(this.p2Score,this.p2High)
            };
            this.scene.restart(highScoreConfig);
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            let highScoreConfig = {
                p1HighScore: Math.max(this.p1Score,this.p1High),
                p2HighScore: Math.max(this.p2Score,this.p2High)
            };
            this.scene.start("menuScene", highScoreConfig);
        }
        //parallax scrolling
        this.starfield.tilePositionY -= 0.2;
        this.earth.tilePositionY -= 1.2;
        this.saturn.tilePositionY -= 0.5;
        this.asteroids.tilePositionX -= -1.2;
        this.asteroids.tilePositionY -= -1.5;
        if(!this.gameOver){
            this.p2Rocket.update();
            this.p2Paddle.update();
            this.p1Rocket.update();
            this.p1Paddle.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        
        //collision checking P1
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship01);
        }
        else if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship02);
        }
        else if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship03);
        }
        else if(this.checkCollision(this.p1Rocket, this.p1Paddle) || this.checkCollision(this.p1Rocket, this.p2Paddle)){
           this.p1Rocket.reflect();
        }

        //collision checking P2
        if(this.checkCollision(this.p2Rocket, this.ship01)){
            this.p2Rocket.reset();
            this.shipExplode(this.p2Rocket, this.ship01);
        }
        else if(this.checkCollision(this.p2Rocket, this.ship02)){
            this.p2Rocket.reset();
            this.shipExplode(this.p2Rocket, this.ship02);
        }
        else if(this.checkCollision(this.p2Rocket, this.ship03)){
            this.p2Rocket.reset();
            this.shipExplode(this.p2Rocket, this.ship03);
        }
        else if(this.checkCollision(this.p2Rocket, this.p1Paddle) || this.checkCollision(this.p2Rocket, this.p2Paddle)){
            this.p2Rocket.reflect();
        }

        //scoring on other player
        if(this.p1Rocket.x < borderUISize){
            this.p2Score += 50;
            this.scoreRight.text = this.p2Score;
            this.p1Rocket.reset();
        }
        else if(this.p1Rocket.x > game.config.width){
            this.p1Score += 50;
            this.scoreLeft.text = this.p1Score;
            this.p1Rocket.reset();
        }
        if(this.p2Rocket.x < borderUISize){
            this.p2Score += 50;
            this.scoreRight.text = this.p2Score;
            this.p2Rocket.reset();
        }
        else if(this.p2Rocket.x > game.config.width){
            this.p1Score += 50;
            this.scoreLeft.text = this.p1Score;
            this.p2Rocket.reset();
        }
    }

    checkCollision(rocket,notRocket){
        //AABB checking
        if(rocket.x < notRocket.x + notRocket.width && rocket.x + rocket.width > notRocket.x
            && rocket.y < notRocket.y + notRocket.height && rocket.height +rocket.y > notRocket.y){
                return true;
        }
        else{
            return false;
        }
    }

    shipExplode(rocket,ship){
        //hide ship
        ship.alpha = 0;
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x,ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete',() =>{        //callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        //add to score
        if(rocket.currentPlayer == 1){
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
        }
        else if(rocket.currentPlayer == 2){
            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score;
        }
        //play random explosion sound
        let soundToPlay = Math.floor((Math.random() * 40) + 1);
        console.log(soundToPlay);
        switch(true){
            case (soundToPlay<=10):
                this.sound.play('sfx_explosion1');
                break;
            case (soundToPlay<=20):
                this.sound.play('sfx_explosion2');
                break;
            case (soundToPlay<=30):
                this.sound.play('sfx_explosion3');
                break;
            case (soundToPlay<=40):
                this.sound.play('sfx_explosion4');
                break;
            case 41:
                this.sound.play('sfx_explosion5');
                break;
        }
        //this.sound.play('sfx_explosion4');
    }
}