#include <SoftwareSerial.h>
#include <SDS011.h>

#define PM_TX 2
#define PM_RX 3

SDS011 sds;

void setup() {
  sds.begin(PM_TX, PM_RX);
  Serial.begin(9600);
}

void loop() {
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
}
