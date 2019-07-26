import Phaser from "phaser";
export default {
    key: "boot",
    preload: function () {
        this.load.image("background1", require("../assets/background/back1.png"));
        this.load.image("background2", require("../assets/background/back2.png"));
        this.load.image("background3", require("../assets/background/back3.png"));
        this.load.image("background4", require("../assets/background/back4.png"));
        this.load.image("background5", require("../assets/background/back5.png"));
        this.load.image("title", require("../assets/background/title.png"));
        this.load.image("platform", require("../assets/background/platform.png"));
        this.load.image("gameover", require("../assets/background/gameover.png"));
        this.load.image("bone1", require("../assets/sprites/bone/bone1.png"));
        this.load.image("bone2", require("../assets/sprites/bone/bone2.png"));
        this.load.image("bone3", require("../assets/sprites/bone/bone3.png"));
        this.load.image("bone4", require("../assets/sprites/bone/bone4.png"));
        this.load.image("bone5", require("../assets/sprites/bone/bone5.png"));
        this.load.audio("music", require("../assets/bgm_maoudamashii_ethnic11.mp3"));
        this.load.audio("music2", require("../assets/bgm_maoudamashii_neorock72.mp3"));
        this.load.audio("music_end", require("../assets/bgm_maoudamashii_acoustic49.mp3"));
        //bgm_maoudamashii_ethnic11
        this.load.audio("se_jump", require("../assets/se_maoudamashii_system10.mp3"));
        this.load.audio("se_coin", require("../assets/se_maoudamashii_se_sound13.mp3"));
        this.load.audio("se_destroy", require("../assets/se_maoudamashii_retro12.mp3"));
        this.load.audio("se_damage", require("../assets/se_maoudamashii_se_sound14.mp3"));

        this.load.spritesheet("item", require("../assets/sprites/pipo-gwspinitem009.png"), {
            frameWidth: 192,
            frameHeight: 192
        });

        this.load.spritesheet("coin", require("../assets/sprites/pipo-gwspinitem002.png"), {
            frameWidth: 192,
            frameHeight: 192
        });
        this.load.spritesheet("fire", require("../assets/sprites/pipo-btleffect022.png"), {
            frameWidth: 120,
            frameHeight: 120
        });
        this.load.spritesheet("enemy_fire", require("../assets/sprites/pipo-btleffect024.png"), {
            frameWidth: 120,
            frameHeight: 120
        });
        this.load.spritesheet("damaged-effect", require("../assets/sprites/pipo-btleffect003.png"), {
            frameWidth: 120,
            frameHeight: 120
        });
        this.load.spritesheet("enemy", require("../assets/sprites/kyo11.png"), {
            frameWidth: 340,
            frameHeight: 340
        });


        this.load.spritesheet("enemy1", require("../assets/sprites/kyo11.png"), {
            frameWidth: 340,
            frameHeight: 340
        });
        this.load.spritesheet("enemy2", require("../assets/sprites/kyo12.png"), {
            frameWidth: 340,
            frameHeight: 340
        });
        this.load.spritesheet("enemy3", require("../assets/sprites/kyo13.png"), {
            frameWidth: 340,
            frameHeight: 340
        });

        this.load.spritesheet("enemybig1", require("../assets/sprites/kyo20.png"), {
            frameWidth: 680,
            frameHeight: 680
        });


        this.load.spritesheet("doux", require("../assets/sprites/kyo10.png"), {
            frameWidth: 340,
            frameHeight: 340
        });
        var rect = new Phaser.Geom.Rectangle(200, 285, 400, 30);
        var gfx = this.add.graphics();
        this.load.on("progress", function (progress) {
            gfx.clear().fillStyle(0x666666).fillRectShape(rect).fillStyle(0xffffff).fillRect(rect.x, rect.y, progress * rect.width, rect.height);
        });
    },
    create: function () {
        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "turn",
            frames: [{
                key: "dude",
                frame: 4
            }],
            frameRate: 20
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.start("menu");
        //this.scene.start("play");
        // this.scene.remove();
    }
};