//graphics
let backgroundGraphic, teemo, deadteemo, emptyhole, mallet, downmallet, ready;
let whack, jingle;
let startX, startY;

let moles = [];
let cursor;
let score = 0;

//Game mode: 0 = start, 1 = play, 2 = end
let mode = 0;
let timer = 30;
let musicPlaying = false;


function preload() {

	//722 x 500
	backgroundGraphic = loadImage("images/background.png");
	teemo = loadImage("images/teemo.png");
	deadteemo = loadImage("images/teemo2.png");
	mallet = loadImage("images/mallet.png");
	downmallet = loadImage("images/mallet2.png");
	emptyhole = loadImage("images/empty.png");
	ready = loadImage("images/ready.png");

	whack = loadSound("sounds/whack.mp3");
	jingle = loadSound("sounds/jingle.mp3");
	cursor = mallet;
}

function setup(){

	noCursor();
	myCanvas = createCanvas(722, 500);
	myCanvas.parent("#container");
	mole1 = new Mole(100, 50);
	mole2 = new Mole(300, 50);
	mole3 = new Mole(500, 50);

	mole4 = new Mole(100, 200);
	mole5 = new Mole(300, 200);
	mole6 = new Mole(500, 200);

	mole7 = new Mole(100, 350);
	mole8 = new Mole(300, 350);
	mole9 = new Mole(500, 350);

	moles = [mole1, mole2, mole3,
			mole4, mole5, mole6, 
			mole7, mole8, mole9];
}

function draw(){
	let tier;

	image(backgroundGraphic, 0, 0);

	fill(0);
	stroke(10);
	textAlign(LEFT);
	textFont("Trebuchet MS", 35);
	text("WHACK-A-TEEMO", 20, 35);
	text("SCORE: " + score, 530, 35);
	
	textSize(60);
	fill(230, 0, 0);
	text(timer, 20, 480);

	
	if(mode==0){
		textFont("Arial", 20);
		fill(0);
		text("Are you ready to whack some teemos?", 150, 200);
		text("Whack as many as you can in 30 seconds.", 150, 240);
		image(ready, 270, 260);

	}

	else if(mode==1){
		jingle.stop();
		musicPlaying = false;
		play();
	}
	
	else if(mode==2){

		if(!musicPlaying){
			jingle.play();
			musicPlaying = true;
		}

		tier = "BRONZE";
		if(score>=15 && score<25){
			tier = "SILVER";
		}
		else if(score>=25 && score<35){
			tier = "GOLD";
		}
		else if(score>=35 && score<45){
			tier = "PLATINUM";
		}
		else if(score>=45 && score<55){
			tier = "DIAMOND";
		}
		else if(score>=55){
			tier = "CHALLENGER";
		}
		fill(0);

		text("GAME OVER", 200, 220);

		textAlign(CENTER);
		textFont("Arial", 25);
		text("You are..." + tier + ".", 350, 280);
		textAlign(LEFT);
		text("Press SPACEBAR to play again.", 180, 380);
	}

	image(cursor, mouseX, mouseY);

}

function play(){

	moles.forEach(function(mole){
		mole.display();
		mole.update();
	});

	if(timer==0){
		mode = 2;
	}
}

function Mole(startX, startY){
	this.x = startX;
	this.y = startY;
	this.click = false;

	//0 is down, 1 is up
	this.state = 0;
	this.timer = 0;
	this.timerMax = int(random(80, 500));

	this.display = function(){

		if(this.click==true){ 
			image(deadteemo, this.x, this.y);
			return;
		}
		if(this.state==0){
			image(emptyhole, this.x, this.y);
		}
		else{
			image(teemo, this.x, this.y);
		}

	}

	this.update = function(){

		if(this.timer>this.timerMax/3){
			if(this.state==1){ this.state = 0; }
		}

		if(this.timer>this.timerMax){
			this.state = 1;
			this.timer = 0;
		}
		this.timer += 1;
	}
}

function touchStarted(){

	if(mode==0){
		if(mouseX>=239 && mouseX<=355 && mouseY>=177 && mouseY<=219){
			mode = 1;
		}
	}

	whack.play();
	cursor = downmallet;

	if(mode!=1) { return; };

	//row 1
	if(mouseX>=77 && mouseX<=158 && mouseY>=-4 && mouseY<=62){
		if(mole1.state==1 && mole1.click==false){
			score += 1;
			mole1.click = true;
		}
	}
	else if(mouseX>=279 && mouseX<=360 && mouseY>=-4 && mouseY<=62){
		if(mole2.state==1 && mole2.click==false){
			score += 1;
			mole2.click = true;
		}
	}
	else if(mouseX>=479 && mouseX<=560 && mouseY>=-4 && mouseY<=62){
		if(mole3.state==1 && mole3.click==false){
			score += 1;
			mole3.click = true;
		}
	}

	//row 2
	if(mouseX>=77 && mouseX<=158 && mouseY>=119 && mouseY<=212){
		if(mole4.state==1 && mole4.click==false){
			score += 1;
			mole4.click = true;
		}
	}
	else if(mouseX>=279 && mouseX<=360 && mouseY>=119 && mouseY<=212){
		if(mole5.state==1 && mole5.click==false){
			score += 1;
			mole5.click = true;
		}
	}
	else if(mouseX>=479 && mouseX<=560 && mouseY>=-119 && mouseY<=212){
		if(mole6.state==1 && mole6.click==false){
			score += 1;
			mole6.click = true;
		}
	}

	//row 3
	if(mouseX>=77 && mouseX<=158 && mouseY>=270 && mouseY<=363){
		if(mole7.state==1 && mole7.click==false){
			score += 1;
			mole7.click = true;
		}
	}
	else if(mouseX>=279 && mouseX<=360 && mouseY>=270 && mouseY<=363){
		if(mole8.state==1 && mole8.click==false){
			score += 1;
			mole8.click = true;
		}
	}
	else if(mouseX>=479 && mouseX<=560 && mouseY>=-270 && mouseY<=363){
		if(mole9.state==1 && mole9.click==false){
			score += 1;
			mole9.click = true;
		}
	}
}

function reset(){
	cursor = mallet;
}

let resetCursorLoop = setInterval(reset, 100);

function resetMoles(){
	moles.forEach(function(mole){
		mole.click = false;
	});
	if(timer>0 && mode==1){ timer -= 1; }
}

let resetMolesLoop = setInterval(resetMoles, 1000);

function keyPressed(){

	//when spacebar pressed, reset game
	if(keyCode == 32 && mode==2){
		score = 0;
		timer = 30;
		mode = 1;
	}

}
