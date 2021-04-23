// Point breakdown -----------------------------------------
// Track high score across scenes and display it in UI (5)
// Simultaneous two player mode (30)
// Create own mod: While shooting, a paddle is deployed. This paddle reflects any incoming rockets. If a rocket passes a player, points gets added  (10)
//  I have been told by a TA that this is similar to the new weapon mod. But it doesn't have new graphics so I would place it as half the points as that
// Display time remaining (in seconds) on the screen (10)
//  Counts down in top
// Create new title screen (10)
//  The placement, colors, and information are different
// Create new scrolling tile sprite for background (5)
//  I made new pixel art with different colors and more detail
// Implement parallax scrolling (10)
//  There are layers that move at different speeds
// Add your own (copyright-free) background music to the Play scene (5)
//  I made it short cause ive never made music before
// Create 4 new explosion SFX and randomize which one plays on impact (10)
//  Theres also a secret 5th explosion sound that has a 1/41 chance of activating


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