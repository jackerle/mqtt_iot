#include <ESP8266WiFi.h>
#include <Adafruit_NeoPixel.h>
#include <PubSubClient.h>




#define PIN    2




const char* ssid = "Jack";
const char* password = "0803580797";




#define mqtt_server "postman.cloudmqtt.com"
#define mqtt_port 18396
#define mqtt_user "jackerle"
#define mqtt_password "19114198"
Adafruit_NeoPixel strip(16, PIN, NEO_GRB + NEO_KHZ800);





WiFiClient espClient;
PubSubClient client(espClient);









void setup() {
  strip.begin();
  strip.show(); // Initialize all pixels to 'off'
  Serial.begin(115200);
  delay(10);

  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}



void loop(){

  if (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("ESP8266Client", mqtt_user, mqtt_password)) {
      Serial.println("connected");
      client.subscribe("/ESP/LED");
      client.publish("/ESP/LED","I'm from device");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
      return;
    }
  }
  client.loop();

}






void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  String msg = "";
  int i=0;
  while (i<length) msg += (char)payload[i++];
  if (msg == "GET") {
    client.publish("/ESP/LED","Ok! I get!");
    Serial.println("Send !");
    return;
  }
  else if(msg == "RED"){
    client.publish("/ESP/LED","Now,change to red...");
     theaterChase(strip.Color(255, 0, 50), 50);
  }
  else if(msg == "BLUE"){
    client.publish("/ESP/LED","Now,I'll change to blue..");
     theaterChase(strip.Color(0, 0, 127), 50);
  }
  else if(msg == "GREEN"){
    client.publish("/ESP/LED","I'll weed like the green");
     theaterChase(strip.Color(0, 255, 127), 50);
  }
  else if(msg =="OFF"){
    client.publish("/ESP/LED","See you next time...");
    theaterChase(strip.Color(0, 0, 0), 50);
  }
  Serial.println(msg);
}






























void theaterChase(uint32_t c, uint8_t wait) {
  for (int j=0; j<10; j++) {  //do 10 cycles of chasing
    for (int q=0; q < 3; q++) {
      for (uint16_t i=0; i < strip.numPixels(); i=i+3) {
        strip.setPixelColor(i+q, c);    //turn every third pixel on
      }
      strip.show();

      delay(wait);

      for (uint16_t i=0; i < strip.numPixels(); i=i+3) {
        strip.setPixelColor(i+q, 0);        //turn every third pixel off
      }
    }
  }
}
