const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#000000',
    scene: [BootScene, Level1Scene, Level2Scene, GameOverScene, WinScene]
};

const game = new Phaser.Game(config);

class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    create() {
        this.scene.start('Level1');
    }
}

class Level1Scene extends Phaser.Scene {
    constructor() {
        super('Level1');
    }

    create() {
        this.add.rectangle(640, 360, 1280, 720, 0x1a1a1a);
        this.add.rectangle(640, 360, 1280, 720, 0x0d0d0d);
        this.add.rectangle(640, 360, 400, 500, 0x333333, 0);
        this.add.rectangle(640, 360, 400, 500, 0x555555, false, 5);

        this.add.text(640, 50, 'LEVEL 1', {
            fontSize: '48px',
            fill: '#ff0000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.timeLimit = 600000;
        this.elapsedTime = 0;
        this.isRunning = true;

        this.eyes = this.createEyes();

        this.timerText = this.add.text(50, 30, '', {
            fontSize: '32px',
            fill: '#ffffff',
            fontStyle: 'bold'
        });

        this.levelText = this.add.text(50, 80, 'LEVEL: 1', {
            fontSize: '24px',
            fill: '#ffffff'
        });

        this.time.addEvent({
            delay: 100,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: 3000,
            callback: this.blinkEyes,
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: 1000,
            callback: this.updateEyeIntensity,
            callbackScope: this,
            loop: true
        });
    }

    createEyes() {
        const eyesGroup = this.add.group();

        const leftEyeWhite = this.add.circle(500, 300, 60, 0xffffff);
        const leftEyePupil = this.add.circle(500, 300, 25, 0x000000);

        const rightEyeWhite = this.add.circle(780, 300, 60, 0xffffff);
        const rightEyePupil = this.add.circle(780, 300, 25, 0x000000);

        eyesGroup.add(leftEyeWhite);
        eyesGroup.add(leftEyePupil);
        eyesGroup.add(rightEyeWhite);
        eyesGroup.add(rightEyePupil);

        return eyesGroup;
    }

    blinkEyes() {
        const pupils = this.eyes.getChildren().filter((eye, i) => i % 2 === 1);
        pupils.forEach(pupil => pupil.setScale(1, 0.1));
        this.time.delayedCall(200, () => {
            pupils.forEach(pupil => pupil.setScale(1, 1));
        });
    }

    updateEyeIntensity() {
        const progress = this.elapsedTime / this.timeLimit;
        this.eyes.getChildren().forEach((child, i) => {
            if (i % 2 === 1) {
                child.setScale(1 + progress * 0.3);
            }
        });
    }

    updateTimer() {
        this.elapsedTime += 100;
        const remaining = Math.max(0, this.timeLimit - this.elapsedTime);
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        this.timerText.setText(`TIME: ${minutes}:${seconds.toString().padStart(2, '0')}`);

        if (remaining <= 0) {
            this.isRunning = false;
            this.scene.start('WinScene', { level: 1 });
        }
    }

    update() {
        const progress = this.elapsedTime / this.timeLimit;
        if (progress > 0.7) {
            this.cameras.main.shake(50, 0.002);
        }
    }
}

class Level2Scene extends Phaser.Scene {
    constructor() {
        super('Level2');
    }

    create() {
        this.add.rectangle(640, 360, 1280, 720, 0x1a1a1a);
        this.add.rectangle(640, 360, 1280, 720, 0x0d0d0d);
        this.add.rectangle(640, 360, 400, 500, 0x333333, 0);
        this.add.rectangle(640, 360, 400, 500, 0x555555, false, 5);

        this.add.text(640, 50, 'LEVEL 2', {
            fontSize: '48px',
            fill: '#ff0000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.timeLimit = 600000;
        this.elapsedTime = 0;
        this.isRunning = true;

        this.createShadow();
        this.eyes = this.createEyes();

        this.timerText = this.add.text(50, 30, '', {
            fontSize: '32px',
            fill: '#ffffff',
            fontStyle: 'bold'
        });

        this.levelText = this.add.text(50, 80, 'LEVEL: 2', {
            fontSize: '24px',
            fill: '#ffffff'
        });

        this.time.addEvent({
            delay: 100,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: 2500,
            callback: this.blinkEyes,
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: 1000,
            callback: this.updateIntensity,
            callbackScope: this,
            loop: true
        });
    }

    createShadow() {
        const shadowBody = this.add.rectangle(150, 360, 100, 300, 0x000000);
        const shadowHead = this.add.circle(150, 200, 40, 0x000000);
        this.shadowLeftEye = this.add.circle(140, 190, 8, 0xff0000);
        this.shadowRightEye = this.add.circle(160, 190, 8, 0xff0000);
        this.shadowGroup = this.add.group([shadowBody, shadowHead, this.shadowLeftEye, this.shadowRightEye]);
    }

    createEyes() {
        const eyesGroup = this.add.group();
        const leftEyeWhite = this.add.circle(500, 300, 60, 0xffffff);
        const leftEyePupil = this.add.circle(500, 300, 25, 0x000000);
        const rightEyeWhite = this.add.circle(780, 300, 60, 0xffffff);
        const rightEyePupil = this.add.circle(780, 300, 25, 0x000000);
        eyesGroup.add(leftEyeWhite);
        eyesGroup.add(leftEyePupil);
        eyesGroup.add(rightEyeWhite);
        eyesGroup.add(rightEyePupil);
        return eyesGroup;
    }

    blinkEyes() {
        const pupils = this.eyes.getChildren().filter((eye, i) => i % 2 === 1);
        pupils.forEach(pupil => pupil.setScale(1, 0.1));
        this.time.delayedCall(200, () => {
            pupils.forEach(pupil => pupil.setScale(1, 1));
        });
    }

    updateIntensity() {
        const progress = this.elapsedTime / this.timeLimit;
        this.eyes.getChildren().forEach((child, i) => {
            if (i % 2 === 1) {
                child.setScale(1 + progress * 0.4);
            }
        });
        this.shadowLeftEye.setScale(1 + progress * 0.5);
        this.shadowRightEye.setScale(1 + progress * 0.5);
    }

    updateTimer() {
        this.elapsedTime += 100;
        const remaining = Math.max(0, this.timeLimit - this.elapsedTime);
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        this.timerText.setText(`TIME: ${minutes}:${seconds.toString().padStart(2, '0')}`);

        if (remaining <= 0) {
            this.isRunning = false;
            this.scene.start('WinScene', { level: 2 });
        }
    }

    update() {
        const progress = this.elapsedTime / this.timeLimit;
        if (progress > 0.5) {
            this.cameras.main.shake(50, 0.003);
        }
    }
}

class WinScene extends Phaser.Scene {
    constructor() {
        super('WinScene');
    }

    init(data) {
        this.level = data.level || 1;
    }

    create() {
        this.add.rectangle(640, 360, 1280, 720, 0x1a1a1a);

        if (this.level === 1) {
            this.add.text(640, 250, 'SURVIVED LEVEL 1', {
                fontSize: '48px',
                fill: '#00ff00',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            this.add.text(640, 360, 'PROCEED TO LEVEL 2?', {
                fontSize: '36px',
                fill: '#ffffff'
            }).setOrigin(0.5);

            this.add.text(640, 500, 'PRESS SPACE TO CONTINUE', {
                fontSize: '24px',
                fill: '#ffff00'
            }).setOrigin(0.5);

            this.input.keyboard.on('keydown-SPACE', () => {
                this.scene.start('Level2');
            });
        } else {
            this.add.text(640, 250, 'YOU SURVIVED!', {
                fontSize: '48px',
                fill: '#00ff00',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            this.add.text(640, 360, 'GAME COMPLETE', {
                fontSize: '36px',
                fill: '#ffffff'
            }).setOrigin(0.5);

            this.add.text(640, 500, 'PRESS SPACE TO RESTART', {
                fontSize: '24px',
                fill: '#ffff00'
            }).setOrigin(0.5);

            this.input.keyboard.on('keydown-SPACE', () => {
                this.scene.start('Level1');
            });
        }
    }
}

class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    create() {
        this.add.rectangle(640, 360, 1280, 720, 0x1a1a1a);
        this.add.text(640, 300, 'GAME OVER', {
            fontSize: '56px',
            fill: '#ff0000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(640, 400, 'PRESS SPACE TO RESTART', {
            fontSize: '28px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('Level1');
        });
    }
}