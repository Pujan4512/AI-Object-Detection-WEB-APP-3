status = "";
objects = [];

function setup(){
    canvas = createCanvas(420, 380);
    canvas.position(420,250);

    video = createCapture(VIDEO);
    video.size(420, 380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    value_of_input = document.getElementById("input_id").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function draw(){
    image(video, 0, 0, 420, 380);

    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            console.log(objects.length);
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(object_name == value_of_input){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("object_found").innerHTML = objects[i].label + " Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(objects[i].label + " Found");
                synth.speak(utterThis);
            }else{
                document.getElementById("object_found").innerHTML = objects[i].label + " Not Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(objects[i].label + " Not Found");
                synth.speak(utterThis);
            }
        }
    }
}

function gotResults(results){
    console.log(results);
    objects = results;
}