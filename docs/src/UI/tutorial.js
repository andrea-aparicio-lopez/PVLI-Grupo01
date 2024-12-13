import { GI, tileToScreenX, tileToScreenY } from '../graphics/graphicsInterface.js'

export default class Tutorial {
    constructor(scene){
        this.scene = scene;


        ///////////////////////////////////////////////////////////////////////////////////////
        // Create a Graphics object for the mask
        this.visibilityMask = this.scene.make.graphics();

        // Set fill style and draw a circle at the player's position
        this.visibilityMask.fillStyle(0xffffff, 0.5);
        this.radius = 50;
        this.visibilityMask.fillCircle(300, 300, this.radius); // Radius of visibility

        const mask = this.visibilityMask.createGeometryMask();
        this.scene.cameras.main.setMask(mask);

        this.spot = this.scene.add.circle(100, 100, this.radius, 0xffffff, 0)
        this.maskActive = false;

        ///////////////////////////////////////////////////////////////////////////////////////
        this.container = this.scene.add.container();

        // BACK
        // this.rectangle = this.scene.add.rectangle(500, 240, 1000, 480, 0xffffff, 0.3);
        this.rectangle = new Phaser.GameObjects.Rectangle(scene, 500, 240, 1000, 480, 0xffffff, 0.3);
        this.container.add(this.rectangle);




        this.delay = 700;

        // TEXTO
        // this.box = this.scene.add.rectangle(150, 280, 700, 180, '0x777777', 0).setOrigin(0);
        this.box = new Phaser.GameObjects.Rectangle(scene, 150, 280, 700, 180, '0x777777', 0).setOrigin(0);
        this.container.add(this.box);

        this.texts = [];
        this.text0 = "Ahoy! Hey, listen! Look up here!";
        this.text1 = "You are finally awake . . .";
        this.text2 = "You are EL TORO TONI, remember? You've just arrived in SPAIN!";
        this.text3 = "Go straight this way and you will get to HYRULE CASTL. . .";
        this.text4 = "Wait . . .";
        this.text5 = "Arrrr sorry, I took too much of that drink. . .";
        this.text6 = "Yo-ho-ho!";
        this.text7 = "You need to defeat the evil BULLFIGHTERS and RESCUE you friends. They are trapped in CAGES!";
        this.text8 = "To free them you need to smash them just like you'd do to your enemies.";
        this.text9 = "For this, click on the cards on your left to use them. Some cards only deal DAMAGE, others will also change your POSITION to the green square."
        this.text10 = "You can hover your pointer over the cards to see their DESCRIPTION and VISUALIZE their action before using them."
        this.text11 = "Everytime you free a friend you gain a card slot.";
        this.text12 = "You can check your LIFE at the right panel behind me.";
        this.text13 = "MOVE around using WASD. Once you've moved or used a card the enemy will make their move. To PAUSE the game press the ESCAPE key.";
        this.text14 = "This adventure goes on for 3 levels. Progressing means more challenge! Remember: toreros malos, toros amigos! Vale?";
        this.text15 = "Arrrr.";
        this.text16 = "I'll be lying down at the bottom left of the screen. I need some rest, teaching is so exhausting. Hasta luegooooooo"; 

        
        this.texts.push(
            this.text0, this.text1, this.text2, this.text3, this.text4, this.text5, 
            this.text6, this.text7, this.text8, this.text9, this.text10, this.text11, 
            this.text12, this.text13, this.text14, this.text15, this.text16
        );
        this.textIndex = 0;
        this.textCount = this.texts.length;

        this.typingSpeed = 95;

        this.textStyle = { fontSize: '32px', color: '#ffffff', wordWrap: {width: 700}};
        this.displayedText = new Phaser.GameObjects.Text(scene, 160, 300, "", this.textStyle);
        this.container.add(this.displayedText);

        // LORO
        this.parrot = new Phaser.GameObjects.Sprite(scene, 2000, -1000, 'loro').setOrigin(0);
        this.parrot.setScale(7).setRotation(Phaser.Math.PI2/2)
        this.container.add(this.parrot);



        this.animIndex = 0;
        this.animateMask();
    }

    typeText(content, speed) {
        let index = 0;

        this.scene.time.addEvent({
            delay: speed,
            callback: () => {
                this.displayedText.text += content[index];
                index++;
                this.scene.children.bringToTop(this.displayedText);

                if (content.length === index){
                    if (this.textIndex < this.textCount) {
                        if (this.textIndex == 9){
                            this.animateRectangle(0);
                        }
                        else if (this.textIndex == 12) {
                            this.animateRectangle(1);
                        }
                        else if (this.textIndex == this.texts.length - 1){
                            console.log("terminou")
                            this.endTutorial();
                        }
                        this.scene.time.addEvent({
                            delay: this.delay,
                            callback: () => {
                                this.animateText();
                            }
                        });
                    }
                }
            },
            repeat: content.length - 1
        });

    }


    animateMask() {
        console.log(this.animIndex)
        if (this.animIndex == 0) {
            this.scene.tweens.add({
                targets: this.spot,
                x: this.scene.player.toni.x + GI.tileMapConst.scaledSize/2,
                y: 240,
                alpha: 0.5,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    this.addShakeEffect(this.spot, 20, 1000, 3000);
                    this.scene.time.addEvent({
                        delay: this.delay,
                        // callback: () => {
                        //     console.log('Rectangle animation complete!');
                        //     this.maskActive = false;
                        // }
                    });
                },
                onStart: () => { this.maskActive = true; },
            });
        }
        else if (this.animIndex == 1){
            this.scene.tweens.add({
                targets: this.spot,
                x: tileToScreenX(3),
                y: tileToScreenY(3),
                alpha: 0.5,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    this.addShakeEffect(this.spot, 20, 1000, 3000);
                    this.scene.time.addEvent({
                        delay: this.delay,
                        // callback: () => {
                        //     console.log('Rectangle animation complete!');
                        //     this.maskActive = false;
                        // }
                    });
                },
                onStart: () => { this.maskActive = true; },
            });
        }
        else if (this.animIndex == 2) {
            this.scene.tweens.add({
                targets: this.spot,
                x: GI.gameWindowWidth/2,
                y: GI.gameWindowHeight/2,
                radius: 1000,
                duration: 2000,
                ease: 'Power2',
                onComplete: () => {
                    this.scene.time.addEvent({
                        delay: 100,
                        callback: () => {
                            this.animateRectangle(-1);
                            this.animateLoro();
                            this.box.setFillStyle('#777777', 0.5);
                            this.animateText();
                            this.maskActive = false;
                        }
                    });
                },
                onStart: () => { this.maskActive = true; },
            });
        }
        this.animIndex++;
    }

    addShakeEffect(target, amplitude, speed, totalDuration) {
        const timeline = this.scene.add.timeline();

        const shakeCount = totalDuration / speed;
        for (let i = 0; i < shakeCount; i++) {
            const offset = (i % 2 === 0 ? amplitude : -amplitude);
            timeline.add({
                tween: {
                    targets: target,
                    x: this.spot.x + offset,
                    duration: speed,
                    yoyo: true,
                    ease: 'Sine.easeInOut',
                }
            });
        }
        timeline.play();

        this.scene.time.addEvent({
            delay: 1500,
            callback: () => {
                this.animateMask();
            }
        });
    }

    updateMask() {
        if (this.maskActive) {
            this.visibilityMask.clear();
            this.visibilityMask.fillCircle(this.spot.x, this.spot.y, this.spot.radius);
            console.log("updating mask");
        }

    }


    animateText() {
        this.displayedText.text = "";
        this.typeText(this.texts[this.textIndex], this.typingSpeed);
        this.textIndex++;
    }

    animateRectangle(step) {
        if(step == -1){
            this.scene.tweens.add({
                targets: this.rectangle,
                alpha: 1,
                duration: 500,
                ease: 'Power2',
                onComplete: () => {
                    // this.scene.time.addEvent({
                    //     delay: this.delay,
                    //     callback: () => {
                    //         // step++;
                    //         // this.animateRectangle(step);
                    //     }
                    // });
                }
            });
        }
        else if (step == 0) {
            this.scene.tweens.add({
                targets: this.rectangle,
                x: GI.centralPanel.x + this.rectangle.x,
                y: 240,
                width: 860,
                height: 480,
                alpha: 0.7,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    this.scene.time.addEvent({
                        delay: this.delay,
                        callback: () => {
                            // step++;
                            // this.animateRectangle(step);
                        }
                    });
                },
                onStart: () => {
                    console.log("aqui");
                    this.rectangle.setFillStyle('#000000');
                },
            });
        }
        else if (step == 1){
            this.scene.tweens.add({
                targets: this.rectangle,
                x: this.rectangle.x - GI.centralPanel.x,
                y: 240,
                width: 860,
                height: 1000,
                alpha: 0.7,
                duration: 500,
                ease: 'Power2',
                // onComplete: () => {
                //     this.scene.time.addEvent({
                //         delay: this.delay,
                //         callback: () => {
                //             step++;
                //             this.animateRectangle(step);
                //         }
                //     });
                // },
                onStart: () => {
                    console.log("aqui");
                    this.rectangle.setFillStyle('#000000');
                },
            });
        }
        else if (step == 2){
            let rectLeft = this.rectangle;

            this.scene.tweens.add({
                targets: this.rectangle,
                x: this.rectangle.x - GI.centralPanel.x,
                y: 240,
                width: 860,
                height: 480,
                alpha: 0.5,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    // this.scene.time.addEvent({
                    //     delay: 3000,
                    //     callback: () => {
                    //         step++;
                    //         this.animateRectangle(step);
                    //     }
                    // });
                }
            });

        }
    }

    animateLoro() {
        this.scene.tweens.add({
            targets: this.parrot,
            x: 1000,
            y: 240,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
            }
        });
    }

    animateLoroEnd(){
        this.scene.tweens.add({
            targets: this.parrot,
            x: 100,
            y: -40,
            duration: 1000,
            rotation: Phaser.Math.PI2 - 0.1,
            ease: 'Power2',
            onComplete: () => {
                this.parrot.setVisible(false);
            },
            repeate: -1,
        });
    }

    endTutorial() {
        this.animateLoroEnd();
        this.scene.time.addEvent({
            delay: 500,
            callback: () => {
                this.container.setVisible(false);
                this.scene.onTutorial = false;
                this.scene.startPlayerTurn();
            }
        });
    }
}
