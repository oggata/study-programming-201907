import Phaser from "phaser";
import bootScene from "./bootScene";
import playScene from "./playScene";
import menuScene from "./menuScene";
import endScene from "./endScene";

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
  title: "study-programming-201907",
  url: "https://github.com/oggata/study-programming-201907",
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
      debug:true
    }
  },
  scene: [bootScene, menuScene, playScene, endScene]
};
