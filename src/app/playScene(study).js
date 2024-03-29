import Phaser from "phaser";
export default {
    key: "play",
    preload() {

        /****************************************************************/
        //2
        this.PLAYER_ANIMATION_MAX_SPRITE_NUM = 0;//2
        //10~30
        this.PLAYER_ANIMATION_FRAME_RATE = 10;//10~30

        this.EVENT_ENEMY_TIME = 1500;

        this.TARGET_ENEMY_NUMBER = 0;//null 1,4,6,99:boss

        this.IS_SET_ENEMY_FIRE_ATTACK = false;
        this.ENEMY001_SET_SCALE = 2;//0.42
        this.ENEMY001_SPEED = -400;//-400

        this.ENEMY002_SET_SCALE = 2;//0.8
        this.ENEMY002_SPEED = -50;//-700
        
        this.ENEMY003_SET_SCALE = 0.4;//0.4
        this.ENEMY003_SPEED = -100;//-100

        this.IS_SET_PLAYER_ATTACK = false;
        this.IS_SET_PLAYER_DEAD_STATUS = false;
        this.IS_SET_PLAYER_AND_ENEMY_COLLISION = false;

        this.IS_SET_BOSS = false;
        this.IS_SET_BOSS_ANGRY_MODE = false;
        this.IS_SET_BOSS_WEAK_POINT = false;
        this.IS_SEAT_BOSS_DIFENCE = false;

        this.IS_SET_ITEM = false;

        this.IS_SET_BGM = false;
        this.IS_BACKGROUND_VISIBLE = false;

        /****************************************************************/

        this.gameTime = 0;
        this.player = "";
        this.isGameOver = false;
        this.enemies = [];
        this.items = [];
        this.coins = [];
        this.effects = [];
        this.enemyDefences = [];
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
        this.damageTime = 0;
        this.bones = [];
        
        this.invincibleTime = 0;
        this.bgm = null;
        this.bossCount = 0;
        this.bossAppearCount = 0;
        this.bossTime = 0;
        this.bossMode = "normal";
        this.bossFireTime = 0;
        /****************************************************************/
        this.itemTime = 0;
        this.itemMaxTime = 999999999;
        if(this.IS_SET_ITEM==true){
            this.itemTime = 60*14;
            this.itemMaxTime = 60*17;
        }
        /****************************************************************/
    },
    create() {
        this.bgm = this.sound.add('music');
        this.bgm.setLoop(true);
        if(this.IS_SET_BGM){
            this.bgm.play();
        }
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
        /****************************************************************/
        if(this.IS_BACKGROUND_VISIBLE==false){
        this.background5.setVisible(false);
        this.background4.setVisible(false);
        this.background3.setVisible(false);
        this.background2.setVisible(false);
        this.background1.setVisible(false);
        }
        /****************************************************************/
        this.physics.add.existing(this.ground);
        this.ground.body.immovable = true;
        this.ground.body.moves = false;
        this.player = this.physics.add.sprite(230, 250, "doux");
        this.player.getBounds();
        this.player.setBounce(0.2);
        /****************************************************************/
        this.player.setCollideWorldBounds(true);
        /****************************************************************/
        this.player.setScale(0.7);
        this.player.setSize(100, 180, true);
        this.player.setOffset(130, 140);
        this.enemies = this.physics.add.group();
        this.enemyDefences = this.physics.add.group();
        this.effects = this.physics.add.group();
        this.coins = this.physics.add.group();
        this.items = this.physics.add.group();
        this.fires = this.physics.add.group();
        this.enemyFires = this.physics.add.group();
        this.bones = this.physics.add.group();
        this.playerJumpCnt = 0;
        //create time event
        this.timedEvent1 = this.time.addEvent({
            delay: 200,
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
        /****************************************************************/
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("doux", {
                start: 0,
                end: this.PLAYER_ANIMATION_MAX_SPRITE_NUM
            }),
            frameRate: this.PLAYER_ANIMATION_FRAME_RATE,
            repeat: -1
        });
        /****************************************************************/
        function getRandNumberFromRange(min, max) {
            var rand = min + Math.floor(Math.random() * (max - min));
            return rand;
        };

        function onEventEnemy() {
            this.timedEvent2.reset({
                delay: this.EVENT_ENEMY_TIME,
                callback: onEventEnemy,
                callbackScope: this,
                loop: true
            });
            /****************************************************************/
            var _rand = getRandNumberFromRange(1, 8);
            if(this.TARGET_ENEMY_NUMBER!=null){
                _rand = this.TARGET_ENEMY_NUMBER;
            }
            /****************************************************************/
            if(Math.floor(this.score/50) > this.bossAppearCount && this.invincibleTime == 0){
                this.addBoss();
            }
            this.bossCount = 0;
            for (var i = 0; i < this.enemies.children.entries.length; i++) {
                if (this.enemies.children.entries[i].type == 4) {
                    this.bossCount++;
                }
            }
            //飛行
            if (1 <= _rand && _rand <= 3 && this.bossCount == 0) {
                let enemy = this.enemies.create(800, Phaser.Math.Between(100, 250), "enemy");
                enemy.life = 3;
                enemy.type = 1;
                enemy.setScale(this.ENEMY001_SET_SCALE);
                enemy.body.setAllowGravity(false);
                enemy.anims.play("enemy_run", true);
                enemy.setSize(120, 120, true);
                enemy.setOffset(100, 140);
                enemy.setVelocityX(this.ENEMY001_SPEED);
            }
            //突進
            if (4 <= _rand && _rand <= 5 && this.bossCount == 0) {
                let enemy = this.enemies.create(800, 450, "enemy2");
                enemy.life = 5;
                enemy.type = 2;
                enemy.setScale(this.ENEMY002_SET_SCALE);
                enemy.anims.play("enemy2_run", true);
                enemy.setSize(120, 120, true);
                enemy.setOffset(100, 140);
                enemy.setVelocityX(this.ENEMY002_SPEED);
            }
            //ジャンプ
            if (6 <= _rand && _rand <= 7 && this.bossCount == 0) {
                let enemy = this.enemies.create(800, 350, "enemy3");
                enemy.life = 6;
                enemy.type = 3;
                enemy.setScale(this.ENEMY003_SET_SCALE);
                enemy.getBounds();
                enemy.setBounce(1.2);
                enemy.anims.play("enemy3_run", true);
                enemy.setSize(120, 120, true);
                enemy.setOffset(100, 140);
                enemy.setVelocityX(this.ENEMY003_SPEED);
            }
            //ボス
            if (99 <= _rand && _rand <= 99 && this.bossCount == 0) {
                this.addBoss();
            }
        }

        this.addBoss = function(){
            if(this.IS_SET_BOSS == false){
                return true;
            }
            this.bossAppearCount+=1;
            let enemy = this.enemies.create(800, 300, "enemybig1");
            enemy.enemyId = getRandNumberFromRange(1, 999999);
            enemy.damageTime = 0;
            enemy.life = 15;
            enemy.type = 4;
            enemy.setScale(0.8);
            enemy.body.setAllowGravity(false);
            enemy.anims.play("enemybig1_run", true);

            if(this.IS_SET_BOSS_WEAK_POINT==true){
                enemy.setSize(120, 120, true);
                enemy.setOffset(100, 140);
            }

            enemy.setVelocityX(-30);

if(this.IS_SEAT_BOSS_DIFENCE==true){
            let enemyDefence = this.enemyDefences.create(0, 400, "enemybig1");
            enemyDefence.enemyId = enemy.enemyId;
            enemyDefence.setSize(200, 300, true);
            enemyDefence.setOffset(300, 180);
            enemyDefence.body.setAllowGravity(false);
            enemyDefence.setAlpha(0);
            this.physics.add.existing(enemyDefence);
            enemyDefence.body.immovable = true;
            enemyDefence.body.moves = true;
}
        }

        function onEventFire() {
            if(this.IS_SET_PLAYER_ATTACK==false){
                return true;
            }
            if(this.invincibleTime > 0){
                return true;
            }
            this.timedEvent1.reset({
                delay: Phaser.Math.Between(200, 300),
                callback: onEventFire,
                callbackScope: this,
                loop: true
            });
            let fire = this.fires.create(this.player.x + 80, this.player.y + 20, "fire");
            fire.anims.play("fire", true);
            fire.setSize(40, 40, 0, 0);
            fire.setOffset(50, 50);
            fire.setScale(0.6);
            fire.getBounds();
            fire.setBounce(1);
            fire.setVelocityX(300);
            fire.setVelocityY(-300);
        }

        function onEventEnemyFire() {
            if(this.IS_SET_ENEMY_FIRE_ATTACK==false){
                return true;
            }
            this.timedEvent3.reset({
                delay: Phaser.Math.Between(500, 1200),
                callback: onEventEnemyFire,
                callbackScope: this,
                loop: true
            });
            for (var i = 0; i < this.enemies.children.entries.length; i++) {
                //console.log(this.enemies.children.entries[i].type);
                if (this.enemies.children.entries[i].x >= 0 && this.enemies.children.entries[i].type == 1) {
                    let enemyFire = this.enemyFires.create(this.enemies.children.entries[i].x, this.enemies.children.entries[i].y, "enemy_elec");
                    enemyFire.setCircle(5);
                    enemyFire.anims.play("enemy_elec", true);
                    enemyFire.setSize(30, 30, 0, 0);
                    this.enemyFires.setVelocityX(-200);
                    enemyFire.setOffset(50, 50);
                }
            }
        }

        function hitPlayerToCoin(player, coin) {
            if (this.isGameOver) return;
            let coinSE = this.sound.add("se_coin");
            coinSE.play();
            coin.destroy();
            this.score += 5;
            this.scoreText.setText("SCORE: " + this.score);
        }

        function hitPlayerToItem(player, item) {
            if (this.isGameOver) return;
            let coinSE = this.sound.add("se_coin");
            coinSE.play();
            item.destroy();
            this.invincibleTime = 30 * 10;

            this.player.y = 50;

            this.bgm.stop();
            this.bgm = this.sound.add('music2')
            this.bgm.setLoop(true)
            if(this.IS_SET_BGM){
                this.bgm.play();
            }
        }
        this.setEnemyEffect = function (enemy) {
            if (enemy.life <= 0) {
                let destroySE = this.sound.add("se_destroy");
                destroySE.play();
                /****************************************************************/
                for (var i = 0; i < 3; i++) {
                    let coin = this.coins.create(enemy.x + Phaser.Math.Between(0, 100) - 50, enemy.y + Phaser.Math.Between(0, 100) - 50, "coin");
                    coin.setScale(0.2);
                    coin.setCircle(5);
                    coin.anims.play("coin", true);
                    coin.setSize(70, 70, 0, 0);
                    coin.setVelocityX(-200);
                    coin.getBounds();
                    coin.setBounce(1);
                }
                let damagedEffect = this.effects.create(enemy.x, enemy.y, "damaged-effect");
                damagedEffect.body.setAllowGravity(false);
                damagedEffect.anims.play("damaged-effect", true);
                damagedEffect.setScale(2);
                /****************************************************************/
                for (var j = 0; j < this.enemyDefences.children.entries.length; j++) {
                    if (this.enemyDefences.children.entries[j].enemyId == enemy.enemyId) {
                        this.enemyDefences.children.entries[j].destroy();
                    }
                }
                enemy.destroy();
            }
        }

        function damageEnemyByPlayer(enemy, fire) {
            if (enemy.x >= 750) return;
            fire.destroy();
            enemy.life -= 1;
            enemy.damageTime = 15;
        }
        this.deadPlayer = function () {
            if(this.IS_SET_PLAYER_DEAD_STATUS==false){
                return true;
            }
            if (this.isGameOver) return;
            this.bgm.stop();
            this.bgm = this.sound.add('music_end')
            this.bgm.setLoop(true)
            if(this.IS_SET_BGM){
                this.bgm.play();
            }
            this.isGameOver = true;
            this.timedEvent1.paused = true;
            this.timedEvent2.paused = true;
            this.timedEvent3.paused = true;
            this.player.anims.play("death");
            for (var i = 1; i <= 5; i++) {
                var boneNum = Phaser.Math.Between(1, 5);
                var boneId = "bone" + i;
                let bone = this.bones.create(this.player.x + Phaser.Math.Between(0, 100) - 50, this.player.y + Phaser.Math.Between(0, 100) - 50, boneId);
                bone.getBounds();
                bone.setBounce(0.7);
                bone.setCollideWorldBounds(true);
                bone.setOffset(0, 0);
            }
            this.backgroundSpeed = 0;
            this.ground.tilePositionX += 1;
            let restart = this.add.image(400, 300, "gameover");
            restart.setInteractive();
            restart.on("pointerdown", () => {
                this.bgm.stop();
                this.scene.start("play");
                this.isGameOver = false;
                this.score = 0;
                this.scoreLifeAmount = 3;
                this.gameTime = 0;
            });
            restart.on("pointerover", () => restart.setTint(0xcccccc));
            restart.on("pointerout", () => restart.setTint(0xffffff));
        }

        function damagePlayerByFire(player, enemyFire) {
            if (this.invincibleTime >= 1) return;
            if (this.damageTime == 0) {
                this.damageTime = 15;
                this.scoreLifeAmount -= 1;
            }
            let destroySE = this.sound.add("se_damage");
            destroySE.play();
            enemyFire.destroy();
            if (this.scoreLifeAmount <= 0) {
                this.deadPlayer();
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
            let destroySE = this.sound.add("se_damage");
            destroySE.play();
            enemy.life -= 1;
            enemy.damageTime = 15;
            if (this.invincibleTime >= 1) return;
            if (this.damageTime == 0) {
                this.damageTime = 15;
                this.scoreLifeAmount -= 1;
            }
            if (this.scoreLifeAmount <= 0) {
                this.deadPlayer();
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
        //地面と衝突する
        /****************************************************************/
        this.physics.add.collider(this.player, this.ground);
        /****************************************************************/
        this.physics.add.collider(this.enemies, this.ground);
        this.physics.add.collider(this.fires, this.ground);
        this.physics.add.collider(this.coins, this.ground);
        this.physics.add.collider(this.items, this.ground);
        this.physics.add.collider(this.bones, this.ground);
        this.physics.add.collider(this.bones, this.bones);
        this.physics.add.collider(this.fires, this.enemyDefences);
        //this.physics.add.collider(this.enemyDefences, this.fires);
        //オブジェクトが重なった時に発動する
        if(this.IS_SET_PLAYER_AND_ENEMY_COLLISION==true){
            this.physics.add.overlap(this.player, this.enemies, damagePlayerByEnemy, null, this);
            this.physics.add.overlap(this.player, this.enemyDefences, damagePlayerByEnemy, null, this);
            this.physics.add.overlap(this.player, this.enemyFires, damagePlayerByFire, null, this);
            this.physics.add.overlap(this.enemies, this.fires, damageEnemyByPlayer, null, this);
            this.physics.add.overlap(this.player, this.coins, hitPlayerToCoin, null, this);
            this.physics.add.overlap(this.player, this.items, hitPlayerToItem, null, this);
        }

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
        if (this.invincibleTime >= 1) {
            this.player.setScale(2);
            this.backgroundSpeed = 5;
        } else if (this.isGameOver == true) {
            this.player.setScale(0.7);
            this.backgroundSpeed = 0;
        } else {
            this.player.setScale(0.7);
            this.backgroundSpeed = 1;
        }

        for (var i = 0; i < this.enemies.children.entries.length; i++) {
                //ボスの動作
                if (this.enemies.children.entries[i].x >= 0 && this.enemies.children.entries[i].type == 4) {
                    if(this.IS_SET_BOSS_ANGRY_MODE){
                        this.bossTime++;
                    }
                    if(this.bossTime>=60*4){
                        this.bossTime=0;
                        if(this.bossMode=="normal"){
                            this.bossMode="angry";
                            //this.enemies.children.entries[i].anims.play("enemybig1_angry", true);
                        }else{
                            this.bossMode="normal";
                            //this.enemies.children.entries[i].anims.play("enemybig1_run", true);
                        }
                    }
                    if(this.bossMode=="angry"){
                        this.bossFireTime++;
                        if(this.bossFireTime>=10){
                            this.bossFireTime=0;
                            let enemyFire = this.enemyFires.create(this.enemies.children.entries[i].x - 240, this.enemies.children.entries[i].y - 130, "enemy_water");
                            enemyFire.anims.play("enemy_water", true);
                            enemyFire.setSize(30, 30, 0, 0);
                            enemyFire.setVelocityX(Phaser.Math.Between(-500, -100));
                            enemyFire.setVelocityY(Phaser.Math.Between(-500, -100));
                            enemyFire.setOffset(50, 50);
                        }
                    }
                    if (this.enemies.children.entries[i].x <= 420) {
                        this.enemies.children.entries[i].setVelocityX(30);
                    }
                    if (this.enemies.children.entries[i].x >= 570) {
                        this.enemies.children.entries[i].setVelocityX(-30);
                    }
                }
        }


        for (var i = 0; i < this.enemies.children.entries.length; i++) {
            for (var j = 0; j < this.enemyDefences.children.entries.length; j++) {
                if (this.enemyDefences.children.entries[j].enemyId == this.enemies.children.entries[i].enemyId) {
                    this.enemyDefences.children.entries[j].x = this.enemies.children.entries[i].x;
                }
            }
        }
        //console.log(this.effects.children.entries);
        for (var i = 0; i < this.effects.children.entries.length; i++) {
            this.effects.children.entries[i].alpha -= 0.01;
            if (this.effects.children.entries[i].alpha <= 0) {
                this.effects.children.entries[i].destroy();
            }
        }
        for (var j = 0; j < this.enemies.children.entries.length; j++) {
            this.enemies.children.entries[j].damageTime -= 1;
            if (this.enemies.children.entries[j].damageTime <= 0) {
                this.enemies.children.entries[j].damageTime = 0;
            }
            if (this.enemies.children.entries[j].damageTime >= 1) {
                this.enemies.children.entries[j].setTint(0xff0000);
            } else {
                this.enemies.children.entries[j].setTint(0xffffff);
            }
            this.setEnemyEffect(this.enemies.children.entries[j]);
        }
        this.damageTime -= 1;
        if (this.damageTime <= 0) {
            this.damageTime = 0;
        }
        if (this.damageTime > 0) {
            this.player.setTint(0xff0000);
        } else {
            this.player.setTint(0xffffff);
        }
        this.invincibleTime -= 1;
        if (this.invincibleTime == 1) {
            this.bgm.stop();
            this.bgm = this.sound.add('music')
            this.bgm.setLoop(true)
            if(this.IS_SET_BGM){
                this.bgm.play();
            }
        }
        if (this.invincibleTime <= 1) {
            this.invincibleTime = 0;
        }
        this.playerJumpCnt += 1;
        for (var i = 0; i < this.enemies.children.entries.length; i++) {}
        if (this.isGameOver === false) {
            this.itemTime += 1;
            if (this.itemTime % this.itemMaxTime == 0 && this.bossCount == 0) {
                this.itemTime = 0;
                let item = this.items.create(800, 120, "meat");
                item.setScale(0.35);
                item.getBounds();
                item.setBounce(1);
                item.anims.play("meat", true);
                item.setVelocityX(-200);
            }
            this.gameTime += 1;
            //ゲームスタート直後は反応しない
            if (this.gameTime >= 50) {
                var pointer = this.input.activePointer;
                if (pointer.isDown) {
                    //タッチ時間を計測
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
                //進む
                if (10 <= this.touchingTime) {
                    this.player.x += 5;
                    //戻る
                } else if (this.touchingTime == 0) {
                    this.player.x -= 5;
                }
                //後方限界
                if (this.player.x <= 180) {
                    this.player.x = 180;
                }
            }
            if (this.isPointerDown && this.playerJumpCnt >= 30) {
                this.isPointerDown = false;
                this.playerJumpCnt = 1;
                let jumpSE = this.sound.add("se_jump");
                jumpSE.play();
                this.player.setVelocityY(-500);
            } else if (this.isPointerDown && this.player.body.touching.down && this.playerJumpCnt <= 30) {
                this.isPointerDown = false;
                let jumpSE = this.sound.add("se_jump");
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
    },
};
//export default GameScene;