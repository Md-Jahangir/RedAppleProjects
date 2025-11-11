
//Dummy JSON responses
let data = [

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [2, 5, 2, 1]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 8,
                "symbolIDs": [5, 5, 5, 1]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [0, 3, 1, 4]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [5, 4, 1, 1]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 2,
                "symbolIDs": [1, 1, 5, 3]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 4,
                "symbolIDs": [2, 2, 2, 3]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 4,
                "symbolIDs": [5, 5, 2, 2]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 3,
                "symbolIDs": [2, 2, 3, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [4, 5, 3, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 8,
                "symbolIDs": [5, 5, 5, 3]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 9,
                "symbolIDs": [3, 3, 3, 3]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 6,
                "symbolIDs": [4, 4, 4, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 1,
                "symbolIDs": [0, 0, 3, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 5,
                "symbolIDs": [1, 1, 1, 2]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [2, 5, 2, 2]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 5,
                "symbolIDs": [2, 2, 2, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [4, 3, 0, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 6,
                "symbolIDs": [3, 3, 3, 0]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 8,
                "symbolIDs": [2, 2, 2, 2]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [0, 1, 5, 4]
            }
        }
    },

]

// simple application configuration
let config = { width: 1920, height: 1080 }
let app;
let balance = 100;
let stake = 2;
const SYMBOL_SIZE = 155;
let reels = [];
let spinning = false;
let tweens = [];
let spinButton;
let balanceText;
let stakeText;
let stakeIncreaseButton;
let stakeDecreaseButton;

const symbolImage = [
    { name: 'symbol_0', url: 'assets/symbols/symbol_00.json', staticAnimationName: 'static', winAnimationName: 'win' },
    { name: 'symbol_1', url: 'assets/symbols/symbol_01.json', staticAnimationName: 'static', winAnimationName: 'win' },
    { name: 'symbol_2', url: 'assets/symbols/symbol_02.json', staticAnimationName: 'static', winAnimationName: 'win' },
    { name: 'symbol_3', url: 'assets/symbols/symbol_03.json', staticAnimationName: 'static', winAnimationName: 'win' },
    { name: 'symbol_4', url: 'assets/symbols/symbol_04.json', staticAnimationName: 'static', winAnimationName: 'win' },
    { name: 'symbol_5', url: 'assets/symbols/symbol_05.json', staticAnimationName: 'static', winAnimationName: 'win' },
];


// wait for DOM before creating application
window.addEventListener('load', function () {
    //Create a Pixi Application
    app = new PIXI.Application(config);
    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);

    const loader = new PIXI.Loader();
    symbolImage.forEach(symbol => {
        loader.add(symbol.name, symbol.url);
    });
    loader.load(setup);
    //========================================================

    function setup(loader, resources) {
        let margin = (app.screen.height - SYMBOL_SIZE * 3.5) / 2;
        let reelContainer = new PIXI.Container();
        reelContainer.x = app.screen.width / 2 - SYMBOL_SIZE * 1.5;
        reelContainer.y = margin;
        app.stage.addChild(reelContainer);

        for (let i = 0; i < 4; i++) {
            let rc = new PIXI.Container();
            rc.x = i * SYMBOL_SIZE;
            reelContainer.addChild(rc);

            let reel = {
                container: rc,
                symbols: [],
                position: 0,
                previousPosition: 0,
                blur: new PIXI.filters.BlurFilter()
            };
            reel.blur.blurX = 0;
            reel.blur.blurY = 0;
            rc.filters = [reel.blur];

            for (let j = 0; j < 4; j++) {
                let randIndex = Math.floor(Math.random() * symbolImage.length);
                let symbol = new PIXI.spine.Spine(resources[symbolImage[randIndex].name].spineData);
                symbol.state.setAnimation(0, symbolImage[randIndex].staticAnimationName, true);
                symbol.y = j * SYMBOL_SIZE;
                symbol.scale.set(SYMBOL_SIZE / symbol.width);  // Adjust scale to fit the SYMBOL_SIZE
                symbol.symbolIndex = randIndex;
                reel.symbols.push(symbol);
                rc.addChild(symbol);
            }
            reels.push(reel);
        }

        // Create the "SPIN" button
        spinButton = new PIXI.Text("SPIN", { fontFamily: "Arial", fontSize: 36, fill: "white" });
        spinButton.interactive = true;
        spinButton.buttonMode = true;
        spinButton.anchor.set(0.5);
        spinButton.x = app.screen.width / 2;
        spinButton.y = app.screen.height - margin;
        spinButton.on("pointerdown", startSpinning);
        app.stage.addChild(spinButton);

        // Create the "Balance" Text
        balanceText = new PIXI.Text('Balance: ' + balance, { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff });
        balanceText.anchor.set(1, 0.5);
        balanceText.x = spinButton.x - 100;
        balanceText.y = spinButton.y;
        app.stage.addChild(balanceText);

        // Create the "Stake" text
        stakeText = new PIXI.Text('Stake: ' + stake, { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff });
        stakeText.anchor.set(0, 0.5);
        stakeText.x = spinButton.x + 100;
        stakeText.y = spinButton.y;
        app.stage.addChild(stakeText);

        // Create the "Stake Increase(+)" button
        stakeIncreaseButton = new PIXI.Text('+', { fontFamily: 'Arial', fontSize: 24, fill: 0x00ff00 });
        stakeIncreaseButton.interactive = true;
        stakeIncreaseButton.buttonMode = true;
        stakeIncreaseButton.anchor.set(0.5);
        stakeIncreaseButton.x = stakeText.x + 120;
        stakeIncreaseButton.y = stakeText.y;
        app.stage.addChild(stakeIncreaseButton);
        stakeIncreaseButton.on('pointerdown', () => {
            if (stake < balance) {
                stake += 2;
                stakeText.text = `Stake: ${stake}`;
            }
        });

        // Create the "Stake Decrease(-)" button
        stakeDecreaseButton = new PIXI.Text('-', { fontFamily: 'Arial', fontSize: 24, fill: 0xff0000 });
        stakeDecreaseButton.interactive = true;
        stakeDecreaseButton.buttonMode = true;
        stakeDecreaseButton.anchor.set(0.5);
        stakeDecreaseButton.x = stakeText.x - 20;
        stakeDecreaseButton.y = stakeText.y;
        app.stage.addChild(stakeDecreaseButton);
        stakeDecreaseButton.on('pointerdown', () => {
            if (stake > 2) {
                stake -= 2;
                stakeText.text = `Stake: ${stake}`;
            }
        });


        app.ticker.add(delta => update(delta));
    };

    function getRandomResponse() {
        return data[Math.floor(Math.random() * data.length)].response.results;
    };
    function updateBalanceAndStakeText() {
        balanceText.text = `Balance: ${balance}`;
        stakeText.text = `Stake: ${stake}`;
    }
    function startSpinning() {
        spinButton.interactive = false;
        stakeIncreaseButton.interactive = false;
        stakeDecreaseButton.interactive = false;
        if (spinning) return;
        spinning = true;
        balance -= stake;
        updateBalanceAndStakeText();
        let currentData = getRandomResponse();
        for (let i = 0; i < reels.length; i++) {
            let reel = reels[i];
            let extra = Math.floor(Math.random() * 3);
            let targetPosition = reel.position + 10 + i * 5 + extra;
            tweenTo(
                reel, "position", targetPosition, 2500 + i * 600, backout(0.5), null,
                i === reels.length - 1 ? () => reelsComplete(currentData) : null
            );
        }
    };

    function reelsComplete(responseData) {
        updateReelSymbols(responseData.symbolIDs, responseData.win);
        spinning = false;
        spinButton.interactive = true;
        stakeIncreaseButton.interactive = true;
        stakeDecreaseButton.interactive = true;
        updateBalanceAndStakeText();
    };

    function updateReelSymbols(symbolIDs, winAmount) {
        for (let i = 0; i < reels.length; i++) {
            let reel = reels[i];
            for (let j = 0; j < reel.symbols.length; j++) {
                let symbol = reel.symbols[j];
                if (winAmount > 0 && symbolIDs.includes(symbol.symbolIndex)) {
                    symbol.state.setAnimation(0, symbolImage[symbol.symbolIndex].winAnimationName, true);
                } else {
                    symbol.state.setAnimation(0, symbolImage[symbol.symbolIndex].staticAnimationName, true);
                }
            }
        }
    };

    function update(delta) {
        for (let i = 0; i < reels.length; i++) {
            let reel = reels[i];
            for (let j = 0; j < reel.symbols.length; j++) {
                let symbol = reel.symbols[j];
                let prevY = symbol.y;
                symbol.y = ((reel.position + j) % reel.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
                if (symbol.y < 0 && prevY > SYMBOL_SIZE) {
                    let randIndex = Math.floor(Math.random() * symbolImage.length);
                    symbol.state.setAnimation(0, 'static', true);
                    symbol.symbolIndex = randIndex;
                }
            }
            reel.blur.blurY = (reel.position - reel.previousPosition) * 8;
            reel.previousPosition = reel.position;
        }

        tweens.forEach(tween => tween.update(delta));
        tweens = tweens.filter(tween => !tween.isComplete);
    };


    function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
        let start = object[property];
        let change = target - start;
        let startTime = Date.now();
        let duration = time;

        const tween = {
            update(delta) {
                let timeElapsed = Date.now() - startTime;
                let t = timeElapsed / duration;
                if (t > 1) t = 1;

                object[property] = start + change * easing(t);

                if (onchange) onchange();

                if (t >= 1) {
                    if (oncomplete) oncomplete();
                    this.isComplete = true;
                }
            },
            isComplete: false
        };

        tweens.push(tween);
    }

    function backout(amount) {
        return t => (--t * t * ((amount + 1) * t + amount) + 1);
    }



})