class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
        
    }
    init(highScoreConfig){
        this.p1High = highScoreConfig.p1HighScore||0;
        this.p2High = highScoreConfig.p2HighScore||0;
    }
    preload(){
        //load audio
        this.load.audio('sfx_select', 'assets/select.wav');
        this.load.audio('sfx_rocket', 'assets/fire.wav');
        this.load.audio('sfx_explosion1', 'assets/explosion1.wav');
        this.load.audio('sfx_explosion2', 'assets/explosion2.wav');
        this.load.audio('sfx_explosion3', 'assets/explosion3.wav');
        this.load.audio('sfx_explosion4', 'assets/explosion4.wav');
        this.load.audio('sfx_explosion5', 'assets/explosion5.wav');
    }

    create(){
         //high score config
        this.highScoreConfig = {
            p1HighScore: this.p1High,
            p2HighScore: this.p2High
        }
        //menu text config
        let menuConfig = {
            fontFamily: 'Comic Sans',
            fontSize: '42px',
            backgroundColor: '#2D9E28',
            color: '#212426',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
            angle: 0
        }

        //show menu text
        this.add.text(game.config.width/2, borderUISize + borderPadding, 'PADDLE PATROL', menuConfig).setOrigin(.5);

        menuConfig.fontSize = '32px'
        //how 2 play
        this.add.text(game.config.width/2, borderUISize + borderPadding, 'Shoot the ships and pass \nyour opponent to get points', menuConfig).setOrigin(.5);

        //p1 p2 controls
        this.add.text(game.config.width/2, game.config.height/2, 'Player 1 High Score: ' + this.p1High + ' W/S to move E to fire', menuConfig).setOrigin(.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Player 2 High Score: ' + this.p2High + ' I/K to move O to fire', menuConfig).setOrigin(.5);
        
        menuConfig.backgroundColor = '#FFFFFF';
        let splashText = this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Now with music!', menuConfig).setOrigin(.5);
        splashText.angle = 10;
  
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        let selectionText = this.add.text(game.config.width/2, game.config.height/2 + 2*(borderUISize + borderPadding), 'Press ← for Novice or → for Expert',menuConfig).setOrigin(.5);
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        //easy mode
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 15000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene',this.highScoreConfig);
        }
        //hard mode
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 7000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene',this.highScoreConfig);
        }
    }
}