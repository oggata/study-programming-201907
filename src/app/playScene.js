import Phaser from "phaser";
export default {
    key: "play",
    preload() {
        this.gameTime = 0;
        this.player = "";
        this.isGameOver = false;
        this.enemies = [];
        this.meats = [];
        this.bombs = [];
        this.characterScale = 1;
        this.meatScale = 4;
        this.bombScale = 4;
        this.isPointerDown = false;
        this.touchingTime = 0;
        this.score = 0;
        this.scoreText = "";
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
        this.load.spritesheet("fire", require("../assets/sprites/pipo-btleffect036.png"), {
            frameWidth: 120,
            frameHeight: 120
        });
        this.load.spritesheet("enemy_fire", require("../assets/sprites/pipo-btleffect037.png"), {
            frameWidth: 120,
            frameHeight: 120
        });
        this.load.spritesheet("enemy", require("../assets/sprites/enemy.png"), {
            frameWidth: 340,
            frameHeight: 340
        });
        this.load.spritesheet("doux", require("../assets/sprites/kyo5.png"), {
            frameWidth: 340,
            frameHeight: 340
        });
        this.load.audio("music", require("../assets/bgm_maoudamashii_ethnic11.mp3"));
        this.load.audio("jump", require("../assets/se_maoudamashii_system10.mp3"));
        //this.load.audio("death", "assets/death.mp3");
        //this.load.audio("pickup", "assets/pickup.wav");
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
        this.player.setScale(1);
        this.player.setSize(100, 180, true);
        this.player.setOffset(130, 140);
        this.meats = this.physics.add.group();
        this.bombs = this.physics.add.group();
        this.enemies = this.physics.add.group();
        this.fires = this.physics.add.group();
        this.enemyFires = this.physics.add.group();
        this.playerJumpCnt = 0;
        /*
            this.timedEvent1 = this.time.addEvent({
              delay: 1000,
              callback: onEventFire,
              callbackScope: this,
              loop: true
            });
        */
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
                delay: 2500,
                callback: onEventEnemy,
                callbackScope: this,
                loop: true
            });
            let enemy = this.enemies.create(1000, Phaser.Math.Between(120, 500), "enemy");
            enemy.setScale(0.7);
            enemy.body.setAllowGravity(false)
            enemy.anims.play("enemy_run", true);
            enemy.setSize(120, 120, true);
            enemy.setOffset(100, 140);
            this.enemies.setVelocityX(Phaser.Math.Between(-200, -500));
        }

        function onEventFire() {
            this.timedEvent1.reset({
                delay: Phaser.Math.Between(1000, 4000),
                callback: onEventFire,
                callbackScope: this,
                loop: true
            });
            let fire = this.fires.create(this.player.x + 120, this.player.y + 50, "fire");
            fire.setScale(0.8);
            fire.setCircle(5);
            fire.anims.play("fire", true);
            fire.setSize(70, 70, 0, 0);
            //fire.setBounceY(1.2);
            this.fires.setVelocityX(500);
            this.fires.setVelocityY(-500);
        }

        function onEventEnemyFire() {
            this.timedEvent3.reset({
                delay: Phaser.Math.Between(1000, 1001),
                callback: onEventEnemyFire,
                callbackScope: this,
                loop: true
            });
            for (var i = 0; i < this.enemies.children.entries.length; i++) {
                //console.log(this.enemies.children.entries[i].y);
                if (this.enemies.children.entries[i].x >= 0) {
                    let enemyFire = this.enemyFires.create(this.enemies.children.entries[i].x, this.enemies.children.entries[i].y, "enemy_fire");
                    enemyFire.setScale(0.8);
                    enemyFire.setCircle(5);
                    enemyFire.anims.play("enemy_fire", true);
                    enemyFire.setSize(70, 70, 0, 0);
                    this.enemyFires.setVelocityX(-200);
                }
            }
        }
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
                end: 6
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

        function hitEnemy(enemy, fire) {
            enemy.destroy();
            fire.destroy();
            this.score += 100;
            this.scoreText.setText("SCORE: " + this.score);
        }

        function hitPlayer2(player, enemyFire) {
            music.stop();
            this.isGameOver = true;
            //this.timedEvent1.paused = true;
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
            });
            restart.on("pointerover", () => restart.setTint(0xcccccc));
            restart.on("pointerout", () => restart.setTint(0xffffff));
        }

        function hitPlayer(player, enemy) {
            enemy.destroy();
            music.stop();
            //let death = this.sound.add("death");
            //death.play();
            //this.physics.pause();
            this.isGameOver = true;
            //this.timedEvent1.paused = true;
            this.timedEvent2.paused = true;
            this.timedEvent3.paused = true;
            //this.player.setTint(0xff0000);
            this.player.anims.play("death");
            this.backgroundSpeed = 0;
            this.ground.tilePositionX += 1;
            let restart = this.add.image(400, 300, "gameover");
            restart.setInteractive();
            restart.on("pointerdown", () => {
                //document.getElementById("topusers").innerHTML = "";
                this.scene.start("play");
                this.isGameOver = false;
                this.score = 0;
            });
            restart.on("pointerover", () => restart.setTint(0xcccccc));
            restart.on("pointerout", () => restart.setTint(0xffffff));
            //this.gameover = this.add.image(400, 300, "gameover");
        }
        this.scoreText = this.add.text(16, 16, "SCORE: 0", {
            fontSize: "32px",
            fill: "#FFFFFF"
        });
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.enemies, this.ground);
        this.physics.add.collider(this.bombs, this.ground);
        this.physics.add.collider(this.fires, this.ground);
        //this.physics.add.collider(this.enemyFires, this.ground);
        this.physics.add.collider(this.player, this.enemies, hitPlayer, null, this);
        this.physics.add.collider(this.enemies, this.fires, hitEnemy, null, this);
        this.physics.add.collider(this.player, this.enemyFires, hitPlayer2, null, this);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        this.cameras.main.setBounds(0, 0, 800, 600);
    },
    update() {
        this.playerJumpCnt += 1;
        for (var i = 0; i < this.enemies.children.entries.length; i++) {}
        if (this.isGameOver === false) {
            this.score += 1;
            this.scoreText.setText("SCORE: " + this.score);
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
                let jumpSE = this.sound.add("jump");
                jumpSE.play();
                this.player.setVelocityY(-500);
            } else if (this.isPointerDown && this.player.body.touching.down && this.playerJumpCnt <= 30) {
                //this.playerJumpCnt = 1;
                this.isPointerDown = false;
                let jumpSE = this.sound.add("jump");
                jumpSE.play();
                this.player.setVelocityY(-1000);
            }
            this.player.anims.play("run", true);
            /*
                        let cursors = this.input.keyboard.createCursorKeys();
                        this.player.anims.play("run", true);
                        if (cursors.right.isDown) {
                            this.player.setVelocityX(200);
                            this.player.flipX = false;
                        } else if (cursors.left.isDown) {
                            this.player.setVelocityX(-260);
                        } else {
                            this.player.setVelocityX(0);
                        }
                        if (cursors.up.isDown && this.playerJumpCnt >= 30) {
                            this.playerJumpCnt = 1;
                        let jumpSE = this.sound.add("jump");
                        jumpSE.play();
                            this.player.setVelocityY(-500);
                        } else if (cursors.up.isDown && this.player.body.touching.down && this.playerJumpCnt <= 30) {
                            //this.playerJumpCnt = 1;
                        let jumpSE = this.sound.add("jump");
                        jumpSE.play();

                            this.player.setVelocityY(-1000);
                        }
            */
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