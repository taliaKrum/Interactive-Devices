

//when the user clicks anywhere on the page
// https://web.dev/serial/ 
document.addEventListener('click', async () => {
    // Prompt user to select any serial port.
    var port = await navigator.serial.requestPort();
    // be sure to set the baudRate to match the ESP32 code
    await port.open({ baudRate: 115200, bufferSize: 2048 });
  
    let decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
    inputStream = decoder.readable;
  
    reader = inputStream.getReader();
    readLoop();
})

buttonPrev = 1;

function myParse(val) {
    var obj = JSON.parse(currentVal);
    
    // button and metamorphosis changes
    if (obj.butValues[0] == 0 && buttonPrev == 1) {
        buttonPrev = 0;
        imgClick();
    }
    buttonPrev = 1;

    //joystick and moving
    if (obj.joyValues[0] == 0 && obj.joyValues[1] == 0) {
            joyStick(1); //left
    }
    else if (obj.joyValues[2] == 4095 && obj.joyValues[3] >= 3.28){
            joyStick(2); //up
    }
    else if (obj.joyValues[0] == 4095 && obj.joyValues[1] >= 3.28){
            joyStick(3); //right
    }
    else if (obj.joyValues[2] == 0 && obj.joyValues[3] == 0){
        joyStick(4); //down
    }

    //potentiometer and sky
    if (obj.potValues[0] >= 0 && obj.potValues[0] <= 1364) {
        skyClick(1);
    }
    else if (obj.potValues[0] >= 1365 && obj.potValues[0] <= 2729) {
        skyClick(2);
    }
    else if (obj.potValues[0] >= 2730 && obj.potValues[0] <= 4095) {
        skyClick(3);
    }

}

began = false;
currentVal = ""

  async function readLoop() {
    counterVal = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        // Allow the serial port to be closed later.
        console.log("closing connection")
        reader.releaseLock();
        break;
      }
      if (value) {
          for (i in value) {
              let ch = value.charAt(i)
              if (!began) {
                  if (ch === "\n") {
                      began = true;
                  }
              }
              else {
                  if(ch === "\n") {
                    //console.log(currentVal) --> parse here 
                    // var obj = JSON.parse(currentVal);
                    // console.log(obj.joyValues);
                    myParse(currentVal);
                    currentVal = ""
                  }
                  else {
                      currentVal += ch
                  }
              }
          }
       }
    }
  };

  let count = 0;

  function imgClick() { //button
        //your code
    if (count == 0) { //eggs->tadpole 
        $('#egg').attr('src', '/static/tadpole.png');
        $('#egg').attr('id', 'tadpole');
        count = 1;
    }
    else if (count == 1) { //tadpole -> middle
        $('#tadpole').attr('src', '/static/middle.png');
        $('#tadpole').attr('id', 'middle');
        count = 2; 
    }
    else if (count == 2) { // middle -> frog 
        $('#middle').attr('src', '/static/frog1.png');
        $('#middle').attr('id', 'frog');
        count = 3;
    }
    else { //frog -> eggs
        $('#frog').attr('src', '/static/eggs.png');
        $('#frog').attr('id', 'egg');
        count = 0;
    }
  }

  function joyStick(mode){ //change arrow keys with joystick info
    switch (mode){
        case 1:    //left arrow key
            $(".move").finish().animate({
                left: "-=50"
            });
            break;
        case 2:    //up arrow key
            $(".move").finish().animate({
                top: "-=50"
            });
            break;
        case 3:    //right arrow key
            $(".move").finish().animate({
                left: "+=50"
            });
            break;
        case 4:    //bottom arrow key
            $(".move").finish().animate({
                top: "+=50"
            });
            break;
    }
 }   

  function skyClick(mode) { //potentiometer 0 = night, 1 = day, 2 = sunset
    switch (mode){
        case 1:    //->night
            $(".sky").attr('class', 'sky')
            break;
        case 2:    //->sunset
            $(".sky").attr('class', 'sky sunset') 
            $("#sun").attr('class', 'circle sunSets')
            break;
        case 3:    //->day
            $(".sky").attr('class', 'sky day')
            $("#sun").attr('class', 'circle sunRises')
            break;
    }
  }

  $(document).ready(function(){
      
  })

  
  

