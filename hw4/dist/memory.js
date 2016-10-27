/* The following are global variables to control the game */

// Array to save all the Card objects for a round of game.
var cards = [];
// Image resource are preloaded into this dictionary for lookup.
var images = {};

// Card back file names
var cardBacks = ["img/CardBack1.jpg",
				 "img/CardBack2.jpg",
				 "img/CardBack3.jpg",
				 "img/CardBack4.jpg"];

// Card layout for different difficulties
var layouts = {
	veryEasy : new Layout(2, 4, 160, 180, 85, 85, 40),
	easy : 	   new Layout(4, 4, 180,  80, 85, 85, 30),
	medium:    new Layout(4, 6, 60,  80, 85, 85, 30),
	hard:      new Layout(4, 8, 25,  120,  85, 85, 10),
	extreme:   new Layout(5, 8, 25,  60,  85, 85, 10)
}

// Card back
var cardBack = cardBacks[1];
// Current layout
var layout;
// Number of available card resources
var numCards = 44;
// Current status of the game, "startScreen", "game" and "finish"
var scene = "startScreen";
// Trick to prevent a mouse click will reveal a card accidently
// when clicking the menu button.
var started = false;

window.onload = function() {
	gameArea.init();
}

/* Main mouse event handler */
window.onclick = function(MouseEvent) {
	var x = MouseEvent.clientX;
	var y = MouseEvent.clientY;
	var canvas = document.querySelector("canvas");
	if (scene == "startScreen") {
		// Obtain all buttons form the start screen
		var btns = gameArea.startScreen.filter(function(el) {
			return el.type == "shape";
		})
		// Check each button to see if any is pressed.
		btns.forEach(function(btn) {
			if (clicked(x, y, btn)) {
				// Set up game layout according to difficulty
				layout = layouts[btn.text];
				// Change status to "game"
				scene = "game";
				gameArea.repaint();
				gameArea.gameStart();
			}
		});
	}
	// Since game and finish scene share the same UI, some
	// events can be checked together.
	if (scene == "game" || scene == "finish") {
		// Trick to prevent clicking in start screen lead to
		// clicking in the actual game.
		if (!started) {
			started = true;
		} else {
			if (scene == "game") {
				// If the game is on, check if any card is clicked.
				cards.forEach(function(card) {
					// If a card is clicked, the card is not revealed yet and 
					// it is not matched with other cards yet.
					if (clicked(x, y, card) && !card.matched && !card.turned) {
						card.turn();
						gameArea.update();
						gameArea.repaint();
					}
				});
			}
			// Obtain all UI buttons.
			var btns = gameArea.gameScreen.filter(function(el) {
				return el.type == "shape";
			})
			// Check if any button is pressed.
			btns.forEach(function(btn) {
				if (clicked(x, y, btn)) {
					// Return button will bring player to the main screen.
					if (btn.getText() == "return") {
						scene = "startScreen";
						started = false;
						gameArea.reset();
						gameArea.repaint();
					}
					// Restart will reset everything and start game again.
					if (btn.getText() == "restart") {
						gameArea.reset();
						gameArea.gameStart();
					}
				}
			})
		}
	}
}

/*
 * Parameters and functions for the whole game.
 * canvas: 				canvas for all the paintings.
 * selected: 			how many cards are currently selected.
 * scoreBanner: 		area to display score.
 * comboBanner: 		area to display combo.
 * attemptBanner: 		area to display attempts.
 * highestComboBanner: 	area to display highest combo.
 * CongratBanner: 		display result after finishing the game.
 * CongratBanner2: 		display result after finishing the game.
 * startScreen: 		all the UI elements in the main screen.
 * gameScreen: 			buttons and texts in the game screen.
 * score: 				score
 * combo: 				combo
 * highestCombo: 		longest consecutive successful matches.
 *
 * init: 				Prepare canvas, preload images.
 * gameStart: 			initialize the game.
 * clear: 				clear canvas.
 * update: 				update the status of the whole game.
 * reset: 				reset all metrics.
 * updateMetrics:  		update metric information.
 * showFinishMsg: 		display game result.
 * repaint: 			paint all the elements and update the canvas.
 */
var gameArea = {
    canvas : document.createElement("canvas"),
    selected : 0,
    scoreBanner : new Component("30px", "Helvetica", "black", 600, 40, "text", ""),
    comboBanner : new Component("30px", "Helvetica", "black", 350, 560, "text", ""),
    attemptBanner : new Component("30px", "Helvetica", "black", 400, 40, "text", ""),
    highestComboBanner: new Component("30px", "Helvetica", "black", 232, 593, "text", ""),
    CongratBanner: new Component("30px", "Helvetica", "black", 10, 260, "text", ""),
    CongratBanner2: new Component("30px", "Helvetica", "black", 10, 320, "text", ""),
    startScreen : [new Component("60px", "Helvetica", "black", 295, 120, "text", "Memory"),
    			   new Component(400, 40, "steelblue", 200, 200, "shape", "veryEasy"),
    			   new Component(400, 40, "steelblue", 200, 280, "shape", "easy"),
    			   new Component(400, 40, "steelblue", 200, 360, "shape", "medium"),
    			   new Component(400, 40, "steelblue", 200, 440, "shape", "hard"),
    			   new Component(400, 40, "steelblue", 200, 520, "shape", "extreme"),
    			   new Component("28px", "Helvetica", "white", 330, 226, "text", "Very easy"),
    			   new Component("28px", "Helvetica", "white", 357, 308, "text", "Easy"),
    			   new Component("28px", "Helvetica", "white", 338, 387, "text", "Medium"),
    			   new Component("28px", "Helvetica", "white", 357, 470, "text", "Hard"),
    			   new Component("28px", "Helvetica", "white", 340, 550, "text", "Extreme")],
    gameScreen : [new Component(85, 35, "steelblue", 40, 20, "shape", "return"),
    			  new Component(85, 35, "steelblue", 140, 20, "shape", "restart"),
    			  new Component("24px", "Helvetica", "white", 44, 43, "text", "Return"),
    			  new Component("24px", "Helvetica", "white", 144, 43, "text", "Restart")],
    score : 0,
	combo : 0,
	attempt : 0,
	highestCombo: 0,
    init : function() {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        loadImages();
        this.repaint();
    },
    gameStart : function() {
    	loadCards(layout.rows * layout.colums, layout, numCards);
    	// Set up card back
    	var cb = Math.floor(Math.random() * cardBacks.length);
    	cb = (cb == cardBacks.length) ? (cardBacks.length - 1) : cb;
    	cardBack = cardBacks[cb];
        cards.forEach(function(card) {
			card.draw();
		})
		scene = "game";
		this.updateMetrics();
		this.repaint();
    },
    clear : function() {
    	this.context.clearRect(0, 0, 800, 600);
    },
    update : function() {
    	this.selected += 1;
    	// If two cards are selected.
    	if (this.selected == 2) {
    		this.attempt += 1;
    		// Check which two cards are selected.
    		var pair = cards.filter(function(card) {
    			return card.turned && !card.matched;
    		});
    		if (pair[0].img == pair[1].img) {
    			pair.forEach(function(card) {
    				card.matched = true;
    			})
    			this.combo += 1;
    			this.highestCombo = (this.combo > this.highestCombo) ? 
    								this.combo : this.highestCombo;
    			this.score += 100 * this.combo;
    			this.updateMetrics();
    			// Check if the game is finished by checking if every card
    			// is matched.
    			var flag = true;
    			cards.forEach(function(card) {
    				if (!card.matched) {
    					flag = false;
    				}
    			})
    			if (flag) {
    				setTimeout(function() {
    					scene = "finish";
    					gameArea.showFinishMsg();
    					gameArea.repaint();
    				}, 500);
    			}

    		} else {
    			this.combo = 0;
    			this.updateMetrics();
    			// Make the wrong pair of cards turn back after 500ms.
    			setTimeout(function() {
    				pair.forEach(function(card) {
    					card.turn();
    				})
    				gameArea.repaint();
    			}, 500);
    		}
    		this.selected = 0;
    	}
    },
    reset : function() {
    	layout.reset();
    	this.score = 0;
    	this.combo = 0;
    	this.highestCombo = 0;
    	this.attempt = 0;
    },
    updateMetrics : function() {
    	this.scoreBanner.setText("Score: " + this.score);
		this.comboBanner.setText(this.combo + " Combo");
		this.attemptBanner.setText(this.attempt + " attempts");
		this.highestComboBanner.setText("Highest: " + 
			this.highestCombo + " Combo");
    },
    showFinishMsg : function() {
    	this.CongratBanner.setText("Congratulations! You finish the game in " +
    	 this.attempt + " attempts.");
    	this.CongratBanner2.setText("Your score is " + this.score + 
    		", highest combo is " + this.highestCombo + ".");
    },
    repaint : function() {
    	this.clear();
    	if (scene == "startScreen") {
    		this.startScreen.forEach(function(el) {
    			el.draw();
    		})
    	}
    	if (scene == "game") {
    		cards.forEach(function(card) {
				card.draw();
			})
			this.scoreBanner.draw();
			this.comboBanner.draw();
			this.attemptBanner.draw();
			this.highestComboBanner.draw();
			this.gameScreen.forEach(function(el) {
				el.draw();
			})
    	}
    	if (scene == "finish") {
    		this.gameScreen.forEach(function(el) {
				el.draw();
			})
			this.CongratBanner.draw();
			this.CongratBanner2.draw();
    	}
    }
}
/* 
 * The followings are the class to describe specofoc objects in the game.
 * For example, the cards in the game, components such as buttons, texts
 * and display effects. The layout of the cards.
 */
/* 
 * Class that represents a card in the game. 
 * @param x x coordinate to start draw a card.
 * @param y y coordinate to start draw a card.
 * @param width width of a card.
 * @param height height of a card.
 * @param img image source of a card.
 */
function Card(x, y, width, height, img) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.img = img;
	this.turned = false;
	this.matched = false;
	this.draw = function() {
		ctx = gameArea.context;
        this.image = this.matched ? images[this.img] :
        				this.turned ? images[this.img] : images[cardBack];
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}
	this.turn = function() {
		this.turned = !this.turned;
	}
}

/*
 * Basic component to be drawn on canvas.
 * @param width width of component, for text it is the font size
 * @param height height of component, for text it is the font
 * @param x start x coordinate
 * @param y start y coordinate
 * @param color color or image
 * @param type type of component(shape, text)
 * @param content info stored inside the Component
 */
function Component(width, height, color, x, y, type, content) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	this.type = type;
	this.text = content;
	this.draw = function() {
		ctx = gameArea.context;
		if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
        if (this.type == "shape") {
        	ctx.fillStyle = color;
    		ctx.fillRect(this.x, this.y, this.width, this.height);
        }
	}
	this.setText = function(text) {
		this.text = text;
	}
	this.getText = function(text) {
		return this.text;
	}
}

/*
 * Class that represents a layout of cards.
 * @param rows number of rows
 * @param colums number of colums
 * @param x start x coordinate of the first card
 * @param y start y coordinate of the first card
 * @param width width of a card
 * @param height height of a card
 * @param interval interval between cards
 */
function Layout(rows, colums, x, y, width, height, interval) {
	this.rows = rows;
	this.colums = colums;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.interval = interval;
	this.curRow = 1;
	this.curCol = 1;
	// Obtain the layout info for the next card.
	this.nextCard = function() {
		// If this is not the lest card
		if (this.curRow <= this.rows) {
			if (this.curCol <= this.colums) {
				var card = {x : (this.x + (this.curCol - 1) * 
								(this.width + this.interval)),
							y : (this.y + (this.curRow - 1) * 
							 	(this.height + this.interval)),
							width: this.width,
							height: this.height}
				this.curCol += 1;
				if (this.curCol > this.colums) {
					if (this.curRow <= this.rows) {
						this.curRow += 1;
						this.curCol = 1;
					}
				}
				return card;
			}
		}
	},
	// Reset the current row and column for a layout.
	this.reset = function() {
		this.curRow = 1;
		this.curCol = 1; 
	}
}

/* The following functions are all utility helper functions. */

// Preload all images.
function loadImages() {
	var imgs = ["img/Card1.jpg", "img/Card2.jpg", "img/Card3.jpg", 
			"img/Card4.jpg", "img/Card5.jpg", "img/Card6.jpg", 
			"img/Card7.jpg", "img/Card8.jpg", "img/Card9.jpg", 
			"img/Card10.jpg", "img/Card11.jpg", "img/Card12.jpg", 
			"img/Card13.jpg", "img/Card14.jpg", "img/Card15.jpg", 
			"img/Card16.jpg", "img/Card17.jpg", "img/Card18.jpg", 
			"img/Card19.jpg", "img/Card20.jpg", "img/Card21.jpg", 
			"img/Card22.jpg", "img/Card23.jpg", "img/Card24.jpg", 
			"img/Card25.jpg", "img/Card26.jpg", "img/Card27.jpg", 
			"img/Card28.jpg", "img/Card29.jpg", "img/Card30.jpg", 
			"img/Card31.jpg", "img/Card32.jpg", "img/Card33.jpg", 
			"img/Card34.jpg", "img/Card35.jpg", "img/Card36.jpg", 
			"img/Card37.jpg", "img/Card38.jpg", "img/Card39.jpg", 
			"img/Card40.jpg", "img/Card41.jpg", "img/Card42.jpg", 
			"img/Card43.jpg", "img/Card44.jpg", 
			"img/CardBack1.jpg", "img/CardBack2.jpg", "img/CardBack3.jpg",
			"img/CardBack4.jpg"];
	imgs.forEach(function(url) {
  		var img = new Image(200, 200);
  		img.src = url;
  		images[url] = img;
	})
}

// Load cards onto the canvas according to the layout.
function loadCards(num, layout, numCards) {
	// Clear cards
	cards = [];
	// Get random pictures indices
	var candidates = getCandidates(num / 2, numCards);
	// Make a copy since we need a pair of same images and
	// shuffle it.
	var imgList = shuffle(shuffle(candidates.concat(candidates)));
	// Create cards
	imgList.forEach(function(img) {
		var c = layout.nextCard();
		var card = new Card(c.x, c.y, c.width, c.height, getImg(img));
		cards.push(card);
	})
}

// Input the index of type of image, return the image file name.
function getImg(index) {
	return "img/Card" + index + ".jpg";
}

/* Input the number of pair of cards we need, 
 * return a set of types of cards.
 * @param numCan number of candidates
 * @param numCards number of cards required for a layout.
 * @return an array of card image indices for use in the next game.
 */
function getCandidates(numCan, numCards) {
	var arr = []
    while(arr.length < numCan){
    	var randomnumber = Math.ceil(1 + Math.random() * (numCards - 1))
      	var found = false;
      	arr.forEach(function(val) {
        	if (val == randomnumber) {
          		found = true;
        	}
      	})
      	if (!found) arr[arr.length] = randomnumber;
    }
    return arr;
}

/* 
 * Shuffle an array 
 * @param arr array to get shuffled.
 * @return a shuffled array.
 */
function shuffle(arr) {
    arr.forEach(function(val, index) {
    	var i = arr.length - index;
    	var j = Math.floor(Math.random() * i);
        var x = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = x;	
    })
    return arr;
}

/* 
 * Check if the mouse click into a certain object.
 * @param x x coordinate of the mouse
 * @param y y coordinate of the mouse
 * @param o an object, Card or Component
 * @return true if a mouse click is inside a specified card.
 */
function clicked(x, y, o) {
	return ((x >= o.x) && (x <= (o.x + o.width)) && 
			(y >= o.y) && (y <= (o.y + o.height))) ? true : false
}