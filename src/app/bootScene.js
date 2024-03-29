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
        this.load.audio("music", require("../assets/music/bgm_maoudamashii_ethnic11.mp3"));
        this.load.audio("music2", require("../assets/music/bgm_maoudamashii_neorock72.mp3"));
        this.load.audio("music_end", require("../assets/music/bgm_maoudamashii_acoustic49.mp3"));
        //bgm_maoudamashii_ethnic11
        this.load.audio("se_jump", require("../assets/music/se_maoudamashii_system10.mp3"));
        this.load.audio("se_coin", require("../assets/music/se_maoudamashii_se_sound13.mp3"));
        this.load.audio("se_destroy", require("../assets/music/se_maoudamashii_retro12.mp3"));
        this.load.audio("se_damage", require("../assets/music/se_maoudamashii_se_sound14.mp3"));
        this.load.spritesheet("item", require("../assets/sprites/pipo-gwspinitem009.png"), {
            frameWidth: 192,
            frameHeight: 192
        });
        this.load.spritesheet("meat", require("../assets/sprites/meat.png"), {
            frameWidth: 240,
            frameHeight: 240
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
        this.load.spritesheet("enemy_water", require("../assets/sprites/pipo-btleffect038.png"), {
            frameWidth: 120,
            frameHeight: 120
        });
        this.load.spritesheet("enemy_elec", require("../assets/sprites/pipo-btleffect027.png"), {
            frameWidth: 120,
            frameHeight: 120
        });
        this.load.spritesheet("enemy_wind", require("../assets/sprites/pipo-btleffect039.png"), {
            frameWidth: 120,
            frameHeight: 120
        });
        this.load.spritesheet("damaged-effect", require("../assets/sprites/pipo-btleffect003.png"), {
            frameWidth: 120,
            frameHeight: 120
        });
        this.load.spritesheet("enemy", require("../assets/sprites/dinosaur/enemy1.png"), {
            frameWidth: 340,
            frameHeight: 340
        });
        this.load.spritesheet("enemy1", require("../assets/sprites/dinosaur/enemy1.png"), {
            frameWidth: 340,
            frameHeight: 340
        });
        this.load.spritesheet("enemy2", require("../assets/sprites/dinosaur/enemy2.png"), {
            frameWidth: 340,
            frameHeight: 340
        });
        this.load.spritesheet("enemy3", require("../assets/sprites/dinosaur/enemy3.png"), {
            frameWidth: 340,
            frameHeight: 340
        });
        this.load.spritesheet("enemybig1", require("../assets/sprites/dinosaur/enemy4.png"), {
            frameWidth: 680,
            frameHeight: 680
        });
        this.load.spritesheet("enemybig1-angry", require("../assets/sprites/dinosaur/enemy4-angry.png"), {
            frameWidth: 680,
            frameHeight: 680
        });
        this.load.spritesheet("doux", require("../assets/sprites/dinosaur/player.png"), {
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
        this.anims.create({
            key: "death",
            frames: this.anims.generateFrameNumbers("doux", {
                start: 3,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "enemy_run",
            frames: this.anims.generateFrameNumbers("enemy", {
                start: 0,
                end: 2
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "enemy1_run",
            frames: this.anims.generateFrameNumbers("enemy1", {
                start: 0,
                end: 2
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "enemy2_run",
            frames: this.anims.generateFrameNumbers("enemy2", {
                start: 0,
                end: 2
            }),
            frameRate: 22,
            repeat: -1
        });
        this.anims.create({
            key: "enemy3_run",
            frames: this.anims.generateFrameNumbers("enemy3", {
                start: 0,
                end: 2
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "enemybig1_run",
            frames: this.anims.generateFrameNumbers("enemybig1", {
                start: 0,
                end: 2
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "enemybig1_angry",
            frames: this.anims.generateFrameNumbers("enemybig1_angry", {
                start: 0,
                end: 2
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "boom",
            frames: this.anims.generateFrameNumbers("bomb", {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "fire",
            frames: this.anims.generateFrameNumbers("fire", {
                start: 0,
                end: 10
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "enemy_fire",
            frames: this.anims.generateFrameNumbers("enemy_fire", {
                start: 0,
                end: 6
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "enemy_water",
            frames: this.anims.generateFrameNumbers("enemy_water", {
                start: 0,
                end: 7
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "enemy_elec",
            frames: this.anims.generateFrameNumbers("enemy_elec", {
                start: 0,
                end: 7
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "enemy_wind",
            frames: this.anims.generateFrameNumbers("enemy_wind", {
                start: 0,
                end: 7
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "coin",
            frames: this.anims.generateFrameNumbers("coin", {
                start: 0,
                end: 6
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "meat",
            frames: this.anims.generateFrameNumbers("meat", {
                start: 0,
                end: 0
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "item",
            frames: this.anims.generateFrameNumbers("item", {
                start: 0,
                end: 6
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "damaged-effect",
            frames: this.anims.generateFrameNumbers("damaged-effect", {
                start: 0,
                end: 5
            }),
            frameRate: 10,
            repeat: 1
        });
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