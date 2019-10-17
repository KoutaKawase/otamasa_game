"use strict";
//ヒット時に加算されるボーナスポイント
const SCORE_POINT = 3000000;

class mainScene {
	preload() {
		this.load.image('player', 'assets/rightMasaki.png');
		this.load.image('coin', 'assets/otasaku.png');
	}

	create() {
		this.player = this.physics.add.sprite(100, 100, 'player');
		this.coin = this.physics.add.sprite(300, 300, 'coin');
		this.score = 0;
		let style = { font: '20px Arial', fill: '#fff' };
		this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
		this.arrow = this.input.keyboard.createCursorKeys();
	}

	update() {
		// Handle horizontal movements
		if (this.arrow.right.isDown) {
			// If the right arrow is pressed, move to the right
			this.player.x += 3;
		} else if (this.arrow.left.isDown) {
			// If the left arrow is pressed, move to the left
			this.player.x -= 3;
		}

		// Do the same for vertical movements
		if (this.arrow.down.isDown) {
			this.player.y += 3;
		} else if (this.arrow.up.isDown) {
			this.player.y -= 3;
		}

		//衝突処理
		if (this.physics.overlap(this.player, this.coin)) {
			this.hit();
		}
	}

	hit() {

		this.coin.x = Phaser.Math.Between(80, 500);
		this.coin.y = Phaser.Math.Between(100, 300);

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