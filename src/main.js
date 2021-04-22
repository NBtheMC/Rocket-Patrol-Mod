// Point breakdown -----------------------------------------
// Track high score across scenes and display it in UI (5)
// Simultaneous two player mode (30)
// Create own mod: While shooting, a paddle is deployed. This paddle reflects any incoming rockets. If a rocket passes a player, points gets added  (10)
// Display time remaining (in seconds) on the screen (10)
// Create new title screen (10)
// Create new scrolling tile sprite for background (5)
// Implement parallax scrolling (10)
// Add your own (copyright-free) background music to the Play scene (5)
// Create 4 new explosion SFX and randomize which one plays on impact (10)


console.log("hows it going dood");
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu,Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//menu stuff
let keyR, keyLEFT, keyRIGHT;

// P1 controls 
let keyF1, keyUP1, keyDOWN1;
// P2 controls 
let keyF2, keyUP2, keyDOWN2;