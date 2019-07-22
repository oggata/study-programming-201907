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
        this.scoreLifeAmount = 1;

        this.load.image("background1", require("../assets/background/back1.png"));
        this.load.image("background2", require("../assets/background/back2.png"));
        this.load.image("background3", require("../assets/background/back3.png"));
        this.load.image("background4", require("../assets/background/back4.png"));
        this.load.image("background5", require("../assets/background/back5.png"));
        this.load.image("platform", require("../assets/background/platform-red.png"));
        this.load.image("gameover", require("../assets/background/gameover.png"));


this.bones = [];
this.load.image("bone1", require("../assets/sprites/bone/bone1.png"));
this.load.image("bone2", require("../assets/sprites/bone/bone2.png"));
this.load.image("bone3", require("../assets/sprites/bone/bone3.png"));
this.load.image("bone4", require("../assets/sprites/bone/bone4.png"));
this.load.image("bone5", require("../assets/sprites/bone/bone5.png"));


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

        this.physics.add.existing(this.ground);
        this.ground.body.immovable = true;
        this.ground.body.moves = false;

        this.player = this.physics.add.sprite(230, 100, "doux");
        this.player.getBounds();
        this.player.setBounce(0.7);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.75);
        this.player.setSize(100, 180, true);
        this.player.setOffset(130, 140);
        this.playerJumpCnt = 0;
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        this.cameras.main.setBounds(0, 0, 800, 600);

        this.enemies = this.physics.add.group();
this.bones = this.physics.add.group();
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.enemies, this.ground);
this.physics.add.collider(this.bones, this.ground);
        this.physics.add.collider(this.player, this.enemies, damagePlayerByEnemy, null, this);
this.physics.add.collider(this.bones, this.bones);

        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("doux", {
                start: 0,
                end: 5
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "enemy_run",
            frames: this.anims.generateFrameNumbers("enemy", {
                start: 0,
                end: 6
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "death",
            frames: this.anims.generateFrameNumbers("doux", {
                start: 6,
                end: 6
            }),
            frameRate: 10,
            repeat: -1
        });

        this.timedEvent2 = this.time.addEvent({
            delay: 1000,
            callback: onEventEnemy,
            callbackScope: this,
            loop: true
        });

        function onEventEnemy() {
            this.timedEvent2.reset({
                delay: 2500,
                callback: onEventEnemy,
                callbackScope: this,
                loop: true
            });
            let enemy = this.enemies.create(1000, Phaser.Math.Between(120, 500), "enemy");
            enemy.setScale(0.42);
            enemy.body.setAllowGravity(false)
            //enemy.anims.play("enemy_run", true);
            enemy.setSize(120, 120, true);
            enemy.setOffset(100, 140);
            this.enemies.setVelocityX(Phaser.Math.Between(-200, -500));
        }

        function damagePlayerByEnemy(player, enemy) {
            enemy.destroy();


/*
for(var i=1;i<=5;i++){
    var boneNum =Phaser.Math.Between(1, 5);
    var boneId = "bone" + i;
    let bone = this.bones.create(this.player.x+Phaser.Math.Between(0, 100)-50, this.player.y + Phaser.Math.Between(0, 100)-50,boneId);
    bone.getBounds();
    bone.setBounce(0.7);
    bone.setCollideWorldBounds(true);
    bone.setOffset(0, 0);
}
this.player.anims.play("death");
*/

                this.isGameOver = true;
                this.timedEvent2.paused = true;
                //this.timedEvent3.paused = true;

                this.backgroundSpeed = 0;
                this.ground.tilePositionX += 1;
                let restart = this.add.image(400, 300, "gameover");
                restart.setInteractive();
                restart.on("pointerdown", () => {
                    this.scene.start("play");
                    this.isGameOver = false;
                    this.score = 0;
                    this.scoreLifeAmount = 3;
                    this.gameTime = 0;
                });
                restart.on("pointerover", () => restart.setTint(0xcccccc));
                restart.on("pointerout", () => restart.setTint(0xffffff));
        }
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
                    //console.log("aa");
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
                this.player.setVelocityY(-1400);
            }
            this.player.anims.play("run", true);
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