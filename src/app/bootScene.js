import Phaser from "phaser";

export default {
  key: "boot",

  preload: function() {

    this.load.image("background1", require("../assets/background/back1.png"));
    this.load.image("background2", require("../assets/background/back2.png"));
    this.load.image("background3", require("../assets/background/back3.png"));
    this.load.image("background4", require("../assets/background/back4.png"));
    this.load.image("background5", require("../assets/background/back5.png"));
    this.load.image("white", require("../assets/background/white.png"));
    this.load.image("title", require("../assets/background/title.png"));

    var rect = new Phaser.Geom.Rectangle(200, 285, 400, 30);
    var gfx = this.add.graphics();
    this.load.on("progress", function(progress) {
      gfx
        .clear()
        .fillStyle(0x666666)
        .fillRectShape(rect)
        .fillStyle(0xffffff)
        .fillRect(rect.x, rect.y, progress * rect.width, rect.height);
    });
  },

  create: function() {
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.start("menu");
    //this.scene.start("play");
    // this.scene.remove();
  }
};
