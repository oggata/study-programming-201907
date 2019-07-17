import Phaser from "phaser";
import bootScene from "./bootScene";
import playScene from "./playScene";
import menuScene from "./menuScene";
import endScene from "./endScene";

/*
let config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  parent: 'canvas',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 1000
      },
      debug: false
    }
  },
  scene: [
    TitleScene,
    GameScene
  ]
}

*/

export default {
  type: Phaser.AUTO,
scale: {
        mode: Phaser.Scale.FIT,
        parent: 'canvas',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
  //width: 800,
  //height: 600,
  //parent: "canvas",
  pixelArt: true,
  title: "Phaser 3 with Parcel 📦",
  url: "https://github.com/samme/phaser-parcel",
  banner: {
    text: "white",
    background: ["#FD7400", "#FFE11A", "#BEDB39", "#1F8A70", "#004358"]
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 980
      },
      debug: false
    }
  },
  scene: [bootScene, menuScene, playScene, endScene]
};
