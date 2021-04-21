class Menu extends Phaser.Scene {
    constructor(highScoreConfig){
        super("menuScene");
        if(highScoreConfig === undefined){
            this.p1High = 0;
        }
        else{
            this.p1High = highScoreConfig.p1HighScore;
        }
        if(highScoreConfig === undefined){
            this.p2High = 0;
        }
        else{
            this.p2High = highScoreConfig.p2HighScore;
        }
    }
    preload(){
        //load audio
        this.load.audio('sfx_select', 'assets/blip_select12.wav');       
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav');
        this.load.audio('sfx_explosion1', 'assets/explosion1.wav');
        this.load.audio('sfx_explosion2', 'assets/explosion2.wav');
        this.load.audio('sfx_explosion3', 'assets/explosion3.wav');
        this.load.audio('sfx_explosion4', 'assets/explosion4.wav');
        this.load.audio('sfx_explosion5', 'assets/explosion5.wav');
    }

    create(){
        console.log("p1: " + this.p1High + " p2: " + this.p2High);
        //high score config
        this.highScoreConfig = {
            p1HighScore: this.p1High,
            p2HighScore: this.p2High
        }
        //menu text config
        let menuConfig = {
            fontFamily: 'Comic Sans',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        this.add.text(game.config.width/2, borderUISize + borderPadding, 'PONG PATROL', menuConfig).setOrigin(.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Player 1 High Score: ' + this.p1High + ' W/S to move E to fire', menuConfig).setOrigin(.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Player 2 High Score: I/K to move O to fire', menuConfig).setOrigin(.5);
        
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + 2*(borderUISize + borderPadding), 'Press ← for Novice or → for Expert',menuConfig).setOrigin(.5);
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        //easy mode
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene',this.highScoreConfig);
        }
        //hard mode
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene',highScoreConfig);
        }
    }
}