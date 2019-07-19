import Phaser from "phaser";
export default {
    key: "play",
    preload() {
        this.backgroundSpeed = 1;
        this.player = "";
        this.isGameOver = false;
        this.enemies = [];
        this.playerJumpCnt = 0;
        this.isPointerDown = false;
        this.touchingTime = 0;
        this.score = 0;

        this.load.image("background1", require("../assets/background/back1.png"));
        this.load.image("background2", require("../assets/background/back2.png"));
        this.load.image("background3", require("../assets/background/back3.png"));
        this.load.image("background4", require("../assets/background/back4.png"));
        this.load.image("background5", require("../assets/background/back5.png"));
        this.load.image("platform", require("../assets/background/platform-red.png"));

        this.load.spritesheet("enemy", require("../assets/sprites/enemy.png"), {
            frameWidth: 340,
            frameHeight: 340
        });
        this.load.spritesheet("doux", require("../assets/sprites/kyo5.png"), {
            frameWidth: 340,
            frameHeight: 340
        });

    },
    create() {
        this.background5 = this.add.tileSprite(400, 300, 667, 250, "background5");
        this.background4 = this.add.tileSprite(400, 300, 667, 250, "background4");
        this.background3 = this.add.tileSprite(400, 300, 667, 250, "background3");
        this.background2 = this.add.tileSprite(400, 300, 667, 250, "background2");
        this.ground = this.add.tileSprite(400, 600, 800, 100, "platform");
        this.background1 = this.add.tileSprite(400, 300, 1600, 600, "background1");
        this.background5.setScale(2);
        this.background4.setScale(2);
        this.background3.setScale(2);
        this.background2.setScale(2);
        this.background5.setVisible(false);
        this.background4.setVisible(false);
        this.background3.setVisible(false);
        this.background2.setVisible(false);
        this.background1.setVisible(false);
        this.physics.add.existing(this.ground);
        this.ground.body.immovable = true;
        this.ground.body.moves = false;

        this.player = this.physics.add.sprite(230, 100, "doux");
        this.player.getBounds();
        this.player.setBounce(0.7);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(1);
        this.player.setSize(100, 180, true);
        this.player.setOffset(130, 140);
        this.playerJumpCnt = 0;
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        this.cameras.main.setBounds(0, 0, 800, 600);

        this.enemies = this.physics.add.group();
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.enemies, this.ground);
        this.physics.add.collider(this.enemies, this.player);
    },
    update() {
        this.playerJumpCnt += 1;
        for (var i = 0; i < this.enemies.children.entries.length; i++) {}
        if (this.isGameOver === false) {
            this.score += 1;
            //this.scoreText.setText("SCORE: " + this.score);
            if (this.score >= 50) {
                var pointer = this.input.activePointer;
                if (pointer.isDown) {
                    var touchX = pointer.x;
                    var touchY = pointer.y;
                    this.touchingTime += 1;
                }
                this.input.on('pointerup', function (pointer) {
                    //短いとジャンプ扱い
                    if (0 < this.touchingTime && this.touchingTime <= 10) {
                        this.isPointerDown = true;
                    }
                    this.touchingTime = 0;
                }, this);
                if (10 <= this.touchingTime) {
                    this.player.x += 5;
                } else if (this.touchingTime == 0) {
                    this.player.x -= 3;
                }
                if (this.player.x <= 230) {
                    this.player.x = 230;
                }
            }
            if (this.isPointerDown && this.playerJumpCnt >= 30) {
                this.isPointerDown = false;
                this.playerJumpCnt = 1;
                this.player.setVelocityY(-500);
            } else if (this.isPointerDown && this.player.body.touching.down && this.playerJumpCnt <= 30) {
                this.isPointerDown = false;
                this.player.setVelocityY(-1000);
            }
        }


        this.background1.tilePositionX += this.backgroundSpeed * 2;
        this.background2.tilePositionX += this.backgroundSpeed;
        this.background3.tilePositionX += this.backgroundSpeed / 2;
        this.background4.tilePositionX += this.backgroundSpeed / 5;
        this.background5.tilePositionX += this.backgroundSpeed / 5;
        this.ground.tilePositionX += this.backgroundSpeed;



    }
};
//export default GameScene;