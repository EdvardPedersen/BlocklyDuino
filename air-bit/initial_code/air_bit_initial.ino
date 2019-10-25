#include <DHT.h>
#include <SD.h>
#include <SDS011.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>

// Temperature PIN
#define DHTPIN 9

// GPS Pins
#define GPS_RX 7
#define GPS_TX 6

// LED Pins
#define LED_RED A1
#define LED_GREEN A0

// Dust Pins
#define PM_TX 2
#define PM_RX 3

// SD Pin
#define SD_CS_PIN 10

// Temperature and Humidity
DHT dht22(DHTPIN, DHT22);

// SD
File file;

// Dust
SDS011 sds;

// GPS
SoftwareSerial gpsCom(GPS_RX, GPS_TX);
TinyGPSPlus gps;

void setup() {
  // Activate control over LEDs
  pinMode(LED_RED, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);

  // Activate CS-Pin control
  pinMode(SD_CS_PIN, OUTPUT);

  // Initialize Dust sensor communication
  sds.begin(PM_TX, PM_RX);

  // Initialize serial communication
  Serial.begin(9600); // to Computer (USB)
  gpsCom.begin(9600); // to GPS antenna

  // Startup SD-card reader
  SD.begin(SD_CS_PIN);

  // Define filename
  char filename[] = "testfile.txt";

  if (SD.exists(filename)) {
    // Open existing file for writing and append
    file = SD.open(filename, O_WRITE | O_APPEND);
    Serial.println("--------------------");
    Serial.println("Filen ble åpnet på nytt.");
  } else {
    file = SD.open(filename, O_CREAT | O_WRITE);
    Serial.println("Dette er den første linjen i filen.");
  }

}

void loop() {
  // Temperature

  // Declare variables for sensor readings
  float temperature = 0;
  float humidity = 0;
  // Take readings from sensor
  temperature = dht22.readTemperature();
  humidity = dht22.readHumidity();

  // Print out readings
  Serial.print(temperature);
  Serial.print("°C");
  Serial.print("\t");
  Serial.print(humidity);
  Serial.print("%");
  Serial.println();

  // Wait 2.5 seconds until next reading.
  delay(2500);

  // Dust
  float pm25, pm10;
  int error;
  do {
    error = sds.read(&pm25, &pm10);
  } while (error != 0);

  Serial.print(pm25);
  Serial.print("\t");
  Serial.print(pm10);
  Serial.println();

  delay(1000);

  // GPS
  gpsCom.listen();
  bool gpsEncodeComplete = false;
  do {
    if (!gpsCom.available()) {
      // No new data available.
      // Immediately jump to next iteration
      continue;
    }
    gpsEncodeComplete = gps.encode(gpsCom.read());
    if (!gpsEncodeComplete) {
      // Data is incomplete, 
      // Jump to next iteration and try again
      continue;
    }
  } while (!gpsEncodeComplete); // Loop until gps data was successfully read and encoded from GPS module

  bool gpsValid = gps.location.isValid();
  bool gpsUpdated = gps.location.isUpdated();
  bool isUseful = gpsValid && gpsUpdated;
  if (!isUseful) {
    // No valid position.
    // I.e. no GPS fix.
    Serial.println("No valid GPS position");
    digitalWrite(LED_RED, HIGH);
    delay(500);
    digitalWrite(LED_RED, LOW);
    return;
  }

  digitalWrite(LED_GREEN, HIGH);
  delay(500);
  digitalWrite(LED_GREEN, LOW);

  Serial.print("Time: ");
  Serial.print(gps.date.day());
  Serial.print(".");
  Serial.print(gps.date.month());
  Serial.print(".");
  Serial.print(gps.date.year());
  Serial.print(" ");
  Serial.print(gps.time.hour());
  Serial.print(":");
  Serial.print(gps.time.minute());
  Serial.print(":");
  Serial.print(gps.time.second());
  Serial.print(".");
  Serial.print(gps.time.centisecond());

  Serial.print("\t");

  Serial.print("Latitude: ");
  Serial.print(gps.location.lat(), 6); // Latitude in degrees
  Serial.print("\t");
  Serial.print("Longitude: ");
  Serial.print(gps.location.lng(), 6); // Longitude in degrees

  Serial.println();

  // Print information to the SD
  /*
  * Dataformat: Time, Latitude, Longitude, PM10, PM25, Humidity, Temperature
  * Ex.: 2017-12-13T13:34:35.000Z,69.680770,18.974775,2.50,1.40,23.60,20.20
  */

  // Print: Time,
  // Set time variables
  int day = gps.date.day();
  int month = gps.date.month();
  int year = gps.date.year();
  int hour = gps.time.hour();
  int minute = gps.time.minute();
  int second = gps.time.second();

  // YEAR
  if (year < 10) {
    file.print("000");
  } else if (year < 100) {
    file.print("00");
  } else if (year < 1000) {
    file.print("0");
  }
  file.print(year);
  // SEPARATOR
  file.print("-");
  // MONTH
  if (month < 10) {
    file.print("0");
  }
  file.print(month);
  // SEPARATOR
  file.print("-");
  // DAY
  if (day < 10) {
    file.print("0");
  }
  file.print(day);
  // SEPARATOR
  file.print("T");
  // HOUR
  if (hour < 10) {
    file.print("0");
  }
  file.print(hour);
  // SEPARATOR
  file.print(":");
  // MINUTE
  if (minute < 10) {
    file.print("0");
  }
  file.print(minute);
  // SEPARATOR
  file.print(":");
  // SECOND
  if (second < 10) {
    file.print("0");
  }
  file.print(second, 3); // three decimals of precision -> 1ms precision
  // TIMEZONE
  file.print("Z");

  file.print(",")
  file.flush(); // Force saving data to SD-card

  // Print: Latitude,
  file.print(gps.location.lat(), 6); // Latitude in degrees
  
  file.print(",")
  file.flush(); // Force saving data to SD-card

  // Print: Longitude,
  file.print(gps.location.lng(), 6); // Longitude in degrees

  file.print(",")
  file.flush(); // Force saving data to SD-card

  // Print: PM10,
  file.print(pm10);
  
  file.print(",")
  file.flush(); // Force saving data to SD-card

  // Print: PM25,
  file.print(pm25);

  file.print(",")
  file.flush(); // Force saving data to SD-card

  // Print: Humidity,
  file.print(humidity);

  file.print(",")
  file.flush(); // Force saving data to SD-card

  // Print: Temperature\n
  file.print(temperature);

  file.println()
  file.flush(); // Force saving data to SD-card

  delay(1000); // Wait a second.
}

