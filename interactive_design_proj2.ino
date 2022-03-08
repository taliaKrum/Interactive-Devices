
#include <ArduinoJson.h>

float floatMap(float x, float in_min, float in_max, float out_min, float out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial.println();
}

void loop() {

  //ALT WAY IF THIS DOESNT WORK: https://techtutorialsx.com/2017/04/27/esp32-creating-json-message/
  
  // put your main code here, to run repeatedly:
  //BUTTON
  pinMode(22, INPUT_PULLUP);
  int dig = digitalRead(22);

  //POTENTIOMETER
  int analogValue = analogRead(15);
  // Rescale to potentiometer's voltage (from 0V to 3.3V):
  float voltage = floatMap(analogValue, 0, 4095, 0, 3.3);

  //JOYSTICK
  int a = analogRead(12);
  int a2 = analogRead(13);
  float v = floatMap(a, 0, 4095, 0, 3.3);
  float v2 = floatMap(a2, 0, 4095, 0, 3.3);

  const size_t CAPACITY = JSON_OBJECT_SIZE(256);
  StaticJsonDocument<CAPACITY> doc;
  JsonObject JSONencoder = doc.to<JsonObject>();
  //BUTTON
  JsonArray butVals = JSONencoder.createNestedArray("butValues");
  butVals.add(dig);

  //POTENTIOMETER
  JsonArray potVals = JSONencoder.createNestedArray("potValues");
  potVals.add(analogValue);
  potVals.add(voltage);

  //JOYSTICK
  JsonArray joyVals = JSONencoder.createNestedArray("joyValues");
  joyVals.add(a);
  joyVals.add(v);
  joyVals.add(a2);
  joyVals.add(v2);

//  Serial.println("Less overhead JSON message: ");
  serializeJson(JSONencoder, Serial);
  Serial.println();
 
//  Serial.println("\nPretty JSON message: ");
//  serializeJsonPretty(doc, Serial);
//  Serial.println();

  delay(500);

}
