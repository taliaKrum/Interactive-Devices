# Interactive-Devices
Creative Embedded Systems Project 2
Website: https://taliakrum.github.io/Interactive-Devices/ 

Project Hardware:
* ESP32 TTGO T-display
* a button
* a joystick
* a potentiometer

Project Specs: 
The goal is to create an interactive device with the provided hardware. The devices will run off a battery and send data back to your laptop for visualization, sonfication, or whatever media generation process you prefer.

From a hardware perspective, you will need to connect the specified components to the ESP32 and create an enclosure for the device. From a software perspective, you will write an ESP32 program that collects sensor data and sends it over either a serial or wifi connection to a laptop. You will also write a media generation program on your laptop to handle this data and create something interesting with it.

My Project: 
* Hardware:
    - ESP32, button, joystick and a potentiometer all connected via breadboard, and is powered by my computer 
    - I placed the wires ESP32 and breadboard inside a small cardboard box and cut out holes at the top so there is access to each of the sensors, there is also a hole for the USB cable

![IMG_3557](https://user-images.githubusercontent.com/69936719/157546511-8fac6a3b-3e3b-472d-9e29-d8c468d890cb.jpeg)
![IMG_3556](https://user-images.githubusercontent.com/69936719/157545331-c4e7af46-fb31-4c75-93da-cb6e0be32eaa.jpeg)


* Software:
    - I wrote an arduino (.ino) program to get initial data from the sensors and package it all in a JSON object
    - I made a web application using flask, which got the JSON objects from the serial connection and handle the data
    - My website starts off with a scene of a pond with some frog eggs, grass and a nice sky
    - With each button press, the eggs will go through the stages of becoming a frog
    - The joystick allows the user to move the frog around the page
    - The potentiometer changes the time of day

<img width="851" alt="Screen Shot 2022-03-09 at 4 53 55 PM" src="https://user-images.githubusercontent.com/69936719/157545265-57fd2267-daa3-44b9-bf7b-4fbba5524d9a.png">

How to run it? --> Once you have all the hardware set up and connected to your computer, make sure you have the .ino program uploaded to your ESP32. Then all you have to do is run the server.py file on your computer (python3 server.py) to get the flask application working. Click on the screen and connect the port, now your sensors should be working.

Some Helpful Links:
* https://www.w3schools.com/css/tryit.asp?filename=trycss3_animation3
* https://codepen.io/Catagen/pen/PqYdXR/
* https://codepen.io/mghayour/pen/AxWBYW
* https://techtutorialsx.com/2017/04/27/esp32-creating-json-message/
* https://arduinojson.org/v6/doc/upgrade/



