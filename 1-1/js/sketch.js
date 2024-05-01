let device;
let context;

let note = 0;
let radius = 20;
let mouseDownX = 0;
let mouseDownY = 0;
let lastX,lastY = 0;
let h;
let onCanvas = false;




async function loadRNBO() {
    [device, context] = await createRNBODevice("export/synth1.export.json");
    console.log("device loaded");
}

loadRNBO();


function setup() {
    background(100,100,100);
    colorMode(HSB,255);                  //RGB, HSL, HSB
    createCanvas(400,400); //size
}

function mousePressed() {

    noCursor();
    if (mouseX >= radius && mouseX <= width - radius 
        && mouseY >= radius && mouseY <= height - radius) 
        {
            onCanvas = true;
       
        } else {
            onCanvas = false;
        }

    if (device) {
        context.resume();
        note = random(20,50);
        if(onCanvas)
        noteOn(device,context,note,100);
    }


    mouseDownX = mouseX;
    mouseDownY = mouseY;
}

function mouseReleased() {
    if(device) {
    noteOff(device,context,note);
    }
    cursor();
    lastX = mouseX;
    lastY = mouseY;
    background(h,lastX,lastY);

}


function draw() {

    background(100,100,200);
    let h = map(note, 20, 50, 0, 255);


    /// cursor limit


    if(mouseIsPressed) {
        if(onCanvas) 
        {

            if(mouseX - radius <= radius/2)
             mouseX = radius;
            else if(mouseX + radius >= width - radius/2) {
            mouseX = width - radius;
            }
            else if(mouseY - radius <= radius/2) {
             mouseY = radius;
            }
            else if(mouseY + radius >= height - radius/2) {
            mouseY = height - radius;
        }   
        background(h,mouseX-50,mouseY-50);
        let deltaX = Math.abs(mouseX - mouseDownX);
        let deltaXNormalized = map(deltaX,0,width,0,0.3); //scale  
        let cutoff = device.parametersById.get("cutoff"); 
        cutoff.normalizedValue = deltaXNormalized;

        let deltaY = Math.abs(mouseY - mouseDownY);
        let deltaYNormalized = map(deltaY,0,height,0,1); //scale
        let ring = device.parametersById.get("ring");
        ring.normalizedValue = deltaYNormalized;
        
        noStroke();
        fill(100,50,50+mouseY);                         //change color
        ellipse(mouseX,mouseY,radius+10,radius+10);

        } 



    } else if (!mouseIsPressed) {
        background(h,lastX-50,lastY-50)           //change color
        ellipse(lastX,lastY,radius,radius);
        noFill();
        stroke(100,50,50+lastY);                  //change color
        
    }
}
