"use strict";
//ヒット時に加算されるボーナスポイント
const SCORE_POINT = 3000000;

const whenGetSounds = ['getSound1.mp3', 'getSound2.mp3', 'getSound3.mp3'];

class mainScene {
	preload() {
		this.load.image('rightPlayer', 'assets/rightMasaki.png');
		this.load.image('leftPlayer', 'assets/leftMasaki.png');
		this.load.image('upPlayer', 'assets/upMasaki.png');
		this.load.image('downPlayer', 'assets/downMasaki.png');
		this.load.image('coin', 'assets/otasaku.png');
		this.load.audio('bgm', 'assets/audio/bgm.mp3');

		whenGetSounds.map((value, index) => {
			this.load.audio('getSound' + (index + 1), 'assets/audio/' + value);
		});
		//alert("ゲームを開始します");
	}

	create() {
		this.player = this.physics.add.sprite(100, 100, 'rightPlayer');
		this.coin = this.physics.add.sprite(300, 300, 'coin');
		this.score = 0;
		let style = { font: '20px Arial', fill: '#fff' };
		this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
		this.arrow = this.input.keyboard.createCursorKeys();

		this.bgm = this.sound.add('bgm');
		this.bgm.setLoop(true);
		this.bgm.volume = 0.03;
		this.bgm.play();
	}

	update() {
		// Handle horizontal movements
		if (this.arrow.right.isDown) {
			//矢印に合わせて画像を回転
			this.player.setTexture('rightPlayer');
			// If the right arrow is pressed, move to the r
			this.player.x += 5;
		} else if (this.arrow.left.isDown) {
			//矢印に合わせて画像を回転
			this.player.setTexture('leftPlayer');
			// If the left arrow is pressed, move to the left
			this.player.x -= 5;
		}

		// Do the same for vertical movements
		if (this.arrow.down.isDown) {
			this.player.setTexture('downPlayer');
			this.player.y += 5;
		} else if (this.arrow.up.isDown) {
			this.player.setTexture('upPlayer');
			this.player.y -= 5;
		}

		//衝突処理
		if (this.physics.overlap(this.player, this.coin)) {
			const randomNum = Math.floor(Math.random() * (3 - 1)) + 1;
			const getSound = this.sound.add('getSound' + randomNum.toString());
			getSound.play({
				volume: 0.3,
			});
			this.hit();
		}
	}

	hit() {

		this.coin.x = Phaser.Math.Between(80, 700);
		this.coin.y = Phaser.Math.Between(20, 400);

		this.score += SCORE_POINT;

		this.scoreText.setText('score: ' + this.score);

		this.tweens.add({
			targets: this.player,
			duration: 200,
			scaleX: 1.2,
			scaleY: 1.2,
			yoyo: true,
		});
	}
}

new Phaser.Game({
	width: 700,
	height: 400,
	backgroundColor: "#3498db",
	scene: mainScene,
	physics: { default: 'arcade' },
	parent: 'game',
});

//TODO EDにまさきの歌を流す