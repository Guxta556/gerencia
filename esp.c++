#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>


const char* ssid = "123";
const char* password = "12345678";

LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Conectando ao WiFi...");
    }

    Serial.println("Conectado ao WiFi!");
    
    lcd.init();
    lcd.backlight();
}

void loop() {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin("http://localhost:3000/produto/1"); // id
        int httpResponseCode = http.GET();

        if (httpResponseCode > 0) {
            String payload = http.getString();
            Serial.println(payload);

            lcd.clear();
            lcd.setCursor(0, 0);
            lcd.print("Nome: Produto 1");
            lcd.setCursor(0, 1);
            lcd.print("Qtd: 10");
        }

        http.end();
    }

    delay(10000); 
}
