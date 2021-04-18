class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('planets', 'assets/planets.png');
        this.load.image('asteroids', 'assets/asteroids.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        //spritesheet
        this.load.spritesheet('explosion', 'assets/explosion.png', 
            {frameWidth: 32, frameHeight: 64, startFrame: 0, endFrame: 7});
    }
    create(){
        console.log("play");

        this.starfield = this.add.tileSprite(0,0,640,480, 'starfield').setOrigin(0,0);
        this.planets = this.add.tileSprite(0,0,640,480, 'planets').setOrigin(0,0);
        this.asteroids = this.add.tileSprite(0,0,640,480, 'asteroids').setOrigin(0,0);

        // Keyboard input declaration
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R); //reset key       
        //player 1
        keyUP1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyF1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); 
        //player 2
        keyUP2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyDOWN2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        keyF2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O); 

        //p1 rocket
        this.p1Rocket = new Rocket(this, borderUISize + borderPadding, game.config.height/2, 'rocket');
        this.p1Rocket.player = 1;
        this.p1Rocket.upKey = keyUP1;
        this.p1Rocket.downKey = keyDOWN1;
        this.p1Rocket.fireKey = keyF1;
        this.p1Rocket.angle = 90;

        //p2 rocket
        this.p2Rocket = new Rocket(this, game.config.width - borderUISize - borderPadding, game.config.height/2, 'rocket');
        this.p2Rocket.player = 2;
        this.p2Rocket.upKey = keyUP2;
        this.p2Rocket.downKey = keyDOWN2;
        this.p2Rocket.fireKey = keyF2;
        this.p2Rocket.angle = 270;

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
            backgroundColor: '#F3B141',
            color: '#843605',
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
            backgroundColor: '#F3B141',
            color: '#843605',
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
        scoreConfigp1.fixedWidth = 0;
        scoreConfigp2.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, ()=>{
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfigp1).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfigp1).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    
    update(){
        //restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }
        //parallax scrolling
        this.starfield.tilePositionX -= 1;
        this.planets.tilePositionX -= 1.2;
        this.asteroids.tilePositionX -= -3;
        if(!this.gameOver){
            this.p1Rocket.update();
            this.p2Rocket.update();
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
    }

    checkCollision(rocket,ship){
        //AABB checking
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x
            && rocket.y < ship.y + ship.height && rocket.height +rocket.y > ship.y){
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
        if(rocket.player == 1){
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
        }
        else if(rocket.player == 2){
            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score;
        }
        //play explosion sound
        this.sound.play('sfx_explosion');
    }
}