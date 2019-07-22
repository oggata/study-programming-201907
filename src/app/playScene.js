import Phaser from "phaser";
export default {
    key: "play",
    preload() {
        this.player = "";
        this.isGameOver = false;
        this.enemies = [];

        this.isPointerDown = false;
        this.touchingTime = 0;

        this.load.image("background5", require("../assets/background/back5.png"));
        this.load.image("platform", require("../assets/background/platform.png"));

        this.load.spritesheet("enemy", require("../assets/sprites/enemy.png"), {
            frameWidth: 340,
            frameHeight: 340
        });
        this.load.spritesheet("doux", require("../assets/sprites/kyo7.png"), {
            frameWidth: 340,
            frameHeight: 340
        });

    },
    create() {
        this.ground = this.add.tileSprite(400, 600, 800, 100, "platform");
        this.physics.add.existing(this.ground);

        this.ground.body.immovable = true;
        this.ground.body.moves = false;
/*
        this.player = this.physics.add.sprite(230, 100, "doux");
        //this.player.getBounds();
        //this.player.setBounce(0.7);
        //this.player.setCollideWorldBounds(true);
        this.player.setScale(0.7);
        this.player.setSize(100, 180, true);
        this.player.setOffset(130, 140);
        this.playerJumpCnt = 0;
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        this.cameras.main.setBounds(0, 0, 800, 600);
*/

/*
        this.enemies = this.physics.add.group();
        for(var i=0;i<=5;i++){
            var enemy = this.enemies.create(Phaser.Math.Between(100, 800), Phaser.Math.Between(50, 120), "enemy");
            enemy.getBounds();
            enemy.setBounce(1);
            enemy.setCollideWorldBounds(true);
            //enemy.body.setAllowGravity(false);
            this.enemies.setVelocityX(Phaser.Math.Between(-200, -500));
            enemy.setScale(0.42);
            enemy.setSize(120, 120, true);
            enemy.setOffset(100, 140);
        }
*/

/*
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.enemies, this.ground);
        this.physics.add.collider(this.enemies, this.player);
*/
    },
    update() {
/*
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
*/
    }
};
//export default GameScene;