#ifndef AIRBITUTILS
#define AIRBITUTILS

#include <SD.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>

#include "AirBitDateTimeClass"

using namespace airbit;

class AirBitUtilsClass {       // The class
  public:             // Access specifier
    void PrintReadingsToSd(File file, AirBitDateTimeClass airTime, double lat, double lng,
      float pm10, float pm25, float humidity, float temperature );

    void PrintDebugReadings(float humidity, float temperature, float pm10, float pm25, double lat, double lng);

    AirBitDateTimeClass GetDateTime(TinyGPSPlus gps);
    void BlinkLed(int lightPin, int delayTime = 500);
  private:
    void PrintDebugHumidityTemperature(float humidity, float temperature);
    void PrintDebugDust(float pm10, float pm25);
    void PrintDebugGps(double lat, double lng);

};
#endif AIRBITDATETIME