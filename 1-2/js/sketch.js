let keysCodes1 = [90,88,67,86,66,78,77]; //zxcvbnm
let keysCodes2 = [65,83,68,70,71,72,74]; //asdfghj
let keysCodes3 = [81,87,69,82,84,89,85]; //qwertyu

let notes = [0,2,3,5,7,8,10,12];
let note;
let ix;
let circles = [];

function setup() {
    colorMode(RGB, 255, 255, 255, 1);
    createCanvas(windowWidth,windowHeight);
}

function draw() {
    background(0);
    for (let i=0; i<circles.length; i++) {
        circles[i].show();
        circles[i].update();
    }
    
}


function keyPressed() {
    if(device) {
        context.resume();
        if(keyIsPressed === true) {

            let c = new Circle(random(0,windowWidth),random(0,windowHeight),random(10),255,255,255,alpha)
            circles.push(c);

            if(keysCodes1.includes(keyCode)) {
              ix = keysCodes1.indexOf(keyCode);
              note = notes[ix]+36;
              noteOn(device,context,note,random(50,100))

            }
            if(keysCodes2.includes(keyCode)) {
              ix = keysCodes2.indexOf(keyCode);
              note = notes[ix]+48;
              noteOn(device,context,note,random(50,100))
            }
            if(keysCodes3.includes(keyCode)) {
              ix = keysCodes3.indexOf(keyCode);
              note = notes[ix]+60;
              noteOn(device,context,note,random(50,100))
            }
        }

    }   
}

function keyReleased() {
    if(device) {
        noteOff(device,context,note);
    }
}

class Circle {
    constructor(x,y,d,r,g,b,a) {
        this.x = x;
        this.y = y;
        this.d = d;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = 1;
    }

    show() {

        fill(this.r,this.g,this.b,this.a);
        noStroke();
        circle(this.x,this.y,this.d,this.a);
        
    }

    update() {
        this.a-=0.005;
    }

}



