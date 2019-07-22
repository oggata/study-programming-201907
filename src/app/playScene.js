import Phaser from "phaser";
export default {
    key: "play",
    preload() {
        this.gameTime = 0;
        this.player = "";
        this.isGameOver = false;
        this.enemies = [];
        this.coins = [];
        this.characterScale = 1;
        this.isPointerDown = false;
        this.touchingTime = 0;
        this.score = 0;
        this.scoreText = "";
        this.lifeAmountText = "";
        this.scoreLifeAmount = 3;
        this.gameOverText = "";
        this.timedEvent = null;
        this.timedEvent2 = null;
        this.timedEvent3 = null;
        this.timedEvent4 = null;
        this.backgroundSpeed = 1;
        this.load.image("background1", require("../assets/background/back1.png"));
        this.load.image("background2", require("../assets/background/back2.png"));
        this.load.image("background3", require("../assets/background/back3.png"));
        this.load.image("background4", require("../assets/background/back4.png"));
        this.load.image("background5", require("../assets/background/back5.png"));
        this.load.image("platform", require("../assets/background/platform.png"));
        this.load.image("gameover", require("../assets/background/gameover.png"));
        this.damageTime = 0;
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
        this.load.spritesheet("enemy", require("../assets/sprites/enemy.png"), {
            frameWidth: 340,
            frameHeight: 340
        });
        this.load.spritesheet("doux", require("../assets/sprites/kyo7.png"), {
            frameWidth: 340,
            frameHeight: 340
        });
        this.load.audio("music", require("../assets/bgm_maoudamashii_ethnic11.mp3"));
        this.load.audio("jump", require("../assets/se_maoudamashii_system10.mp3"));
        this.hogeTime = 0;
    },
    create() {
        let music = this.sound.add('music')
        music.setLoop(true)
        music.play();
        //this.background5 = this.add.tileSprite(400, 300, 1000, 600, "background5");
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
        this.background5.setVisible(true);
        this.background4.setVisible(true);
        this.background3.setVisible(true);
        this.background2.setVisible(true);
        this.background1.setVisible(true);
        this.physics.add.existing(this.ground);
        this.ground.body.immovable = true;
        this.ground.body.moves = false;
        this.player = this.physics.add.sprite(230, 250, "doux");
        this.player.getBounds();
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.7);
        this.player.setSize(100, 180, true);
        this.player.setOffset(130, 140);
        this.enemies = this.physics.add.group();
        this.coins = this.physics.add.group();
        this.fires = this.physics.add.group();
        this.enemyFires = this.physics.add.group();
        this.playerJumpCnt = 0;
        this.timedEvent1 = this.time.addEvent({
            delay: 1000,
            callback: onEventFire,
            callbackScope: this,
            loop: true
        });
        this.timedEvent2 = this.time.addEvent({
            delay: 1000,
            callback: onEventEnemy,
            callbackScope: this,
            loop: true
        });
        this.timedEvent3 = this.time.addEvent({
            delay: 1000,
            callback: onEventEnemyFire,
            callbackScope: this,
            loop: true
        });

        function onEventEnemy() {
            this.timedEvent2.reset({
                delay: Phaser.Math.Between(1200, 1700),
                callback: onEventEnemy,
                callbackScope: this,
                loop: true
            });
            let enemy = this.enemies.create(1000, Phaser.Math.Between(120, 500), "enemy");
            enemy.setScale(0.42);
            enemy.body.setAllowGravity(false)
            enemy.anims.play("enemy_run", true);
            enemy.setSize(120, 120, true);
            enemy.setOffset(100, 140);
            this.enemies.setVelocityX(Phaser.Math.Between(-200, -500));
        }

        function onEventFire() {
            this.timedEvent1.reset({
                delay: Phaser.Math.Between(500, 1000),
                callback: onEventFire,
                callbackScope: this,
                loop: true
            });
            let fire = this.fires.create(this.player.x + 80, this.player.y + 20, "fire");
            fire.setScale(1);
            //fire.setCircle(5);
            fire.anims.play("fire", true);
            fire.setSize(40, 40, 0, 0);
            //fire.setBounceY(1.2);
            fire.setOffset(50, 50);
            this.fires.setVelocityX(800);
            this.fires.setVelocityY(-500);
        }

        function onEventEnemyFire() {
            this.timedEvent3.reset({
                delay: Phaser.Math.Between(300, 1001),
                callback: onEventEnemyFire,
                callbackScope: this,
                loop: true
            });
            for (var i = 0; i < this.enemies.children.entries.length; i++) {
                //console.log(this.enemies.children.entries[i].y);
                if (this.enemies.children.entries[i].x >= 0) {
                    let enemyFire = this.enemyFires.create(this.enemies.children.entries[i].x, this.enemies.children.entries[i].y, "enemy_fire");
                    //enemyFire.setScale(0.8);
                    enemyFire.setCircle(5);
                    enemyFire.anims.play("enemy_fire", true);
                    enemyFire.setSize(30, 30, 0, 0);
                    this.enemyFires.setVelocityX(-200);
                    enemyFire.setOffset(50, 50);
                }
            }
        }
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("doux", {
                start: 0,
                end: 5
            }),
            frameRate: 14,
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
            key: "coin",
            frames: this.anims.generateFrameNumbers("coin", {
                start: 0,
                end: 6
            }),
            frameRate: 10,
            repeat: -1
        });

        function hitPlayerToCoin(player, coin) {
            coin.destroy();
            this.score += 5;
            this.scoreText.setText("SCORE: " + this.score);
        }

        function damageEnemyByPlayer(enemy, fire) {
            for (var i = 0; i < 5; i++) {
                let coin = this.coins.create(enemy.x + Phaser.Math.Between(0, 100) - 50, enemy.y + Phaser.Math.Between(0, 100) - 50, "coin");
                coin.setScale(0.2);
                coin.setCircle(5);
                coin.anims.play("coin", true);
                coin.setSize(70, 70, 0, 0);
                coin.setVelocityX(-200);
                coin.getBounds();
                //var bounceRate = Phaser.Math.Between(1, 10) / 10
                coin.setBounce(1);
                coin.setCollideWorldBounds(true);
            }
            enemy.destroy();
            fire.destroy();
        }

        function damagePlayerByFire(player, enemyFire) {
            if (this.damageTime == 0) {
                this.damageTime = 60;
                this.scoreLifeAmount -= 1;
            }
            enemyFire.destroy();
            if (this.scoreLifeAmount <= 0) {
                music.stop();
                this.isGameOver = true;
                this.timedEvent2.paused = true;
                this.timedEvent3.paused = true;
                this.player.anims.play("death");
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
            if (this.scoreLifeAmount == 0) {
                this.lifeAmountText.setText("LIFE:");
            }
            if (this.scoreLifeAmount == 1) {
                this.lifeAmountText.setText("LIFE:★");
            }
            if (this.scoreLifeAmount == 2) {
                this.lifeAmountText.setText("LIFE:★★");
            }
            if (this.scoreLifeAmount == 3) {
                this.lifeAmountText.setText("LIFE:★★★");
            }
        }

        function damagePlayerByEnemy(player, enemy) {
            if (this.damageTime == 0) {
                this.damageTime = 60;
                this.scoreLifeAmount -= 1;
            }
            enemy.destroy();
            if (this.scoreLifeAmount <= 0) {
                music.stop();
                this.isGameOver = true;
                this.timedEvent2.paused = true;
                this.timedEvent3.paused = true;
                this.player.anims.play("death");
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
            if (this.scoreLifeAmount == 0) {
                this.lifeAmountText.setText("LIFE:");
            }
            if (this.scoreLifeAmount == 1) {
                this.lifeAmountText.setText("LIFE:★");
            }
            if (this.scoreLifeAmount == 2) {
                this.lifeAmountText.setText("LIFE:★★");
            }
            if (this.scoreLifeAmount == 3) {
                this.lifeAmountText.setText("LIFE:★★★");
            }
        }
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.enemies, this.ground);
        this.physics.add.collider(this.fires, this.ground);
        this.physics.add.collider(this.coins, this.ground);
        this.physics.add.collider(this.enemies, this.fires, damageEnemyByPlayer, null, this);
        this.physics.add.collider(this.player, this.enemies, damagePlayerByEnemy, null, this);
        this.physics.add.collider(this.player, this.enemyFires, damagePlayerByFire, null, this);
        this.physics.add.collider(this.player, this.coins, hitPlayerToCoin, null, this);
        this.scoreText = this.add.text(16, 16, "SCORE: 0", {
            fontSize: "32px",
            fill: "#FFFFFF"
        });
        this.lifeAmountText = this.add.text(300, 16, "★★★", {
            fontSize: "32px",
            fill: "#FFFFFF"
        });
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        this.cameras.main.setBounds(0, 0, 800, 600);
    },
    update() {
        console.log(this.damageTime);
        this.damageTime -= 1;
        if (this.damageTime <= 0) {
            this.damageTime = 0;
        }
        if (this.damageTime > 0) {
            this.player.alpha = 0.2;
        } else {
            this.player.alpha = 1;
        }
        this.playerJumpCnt += 1;
        for (var i = 0; i < this.enemies.children.entries.length; i++) {}
        if (this.isGameOver === false) {
            //this.score += 1;
            //this.scoreText.setText("SCORE: " + this.score);
            this.gameTime += 1;
            if (this.gameTime >= 50) {
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
                let jumpSE = this.sound.add("jump");
                jumpSE.play();
                this.player.setVelocityY(-500);
            } else if (this.isPointerDown && this.player.body.touching.down && this.playerJumpCnt <= 30) {
                this.isPointerDown = false;
                let jumpSE = this.sound.add("jump");
                jumpSE.play();
                this.player.setVelocityY(-1000);
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