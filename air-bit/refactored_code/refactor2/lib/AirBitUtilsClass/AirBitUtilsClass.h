/*
  AirBitUtilsClass.h - Library for easy interaction with an Air:Bit unit.
  Created by Håkon Wallann, Oktober 27, 2019.
  For use in the UiT Air:Bit project.
*/
#ifndef AirBitUtilsClass_h
#define AirBitUtilsClass_h

#include "Arduino.h"

#include <SD.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>

#include <AirBitDateTimeClass.h>

class AirBitUtilsClass
{       // The class
  public:             // Access specifier
    AirBitUtilsClass();
    void PrintReadingsToSd(File file, AirBitDateTimeClass airTime, double lat, double lng,
      float pm10, float pm25, float humidity, float temperature );

    void PrintDebugReadings(AirBitDateTimeClass airTime, float humidity, float temperature, float pm10, float pm25, double lat, double lng);

    AirBitDateTimeClass GetDateTime(TinyGPSPlus gps);
    void BlinkLed(int lightPin, int delayTime = 500);
    void WaitOnGpsEncoding(TinyGPSPlus gps, SoftwareSerial gpsCom);
  private:
    void PrintDebugHumidityTemperature(float humidity, float temperature);
    void PrintDebugDust(float pm10, float pm25);
    void PrintDebugGps(AirBitDateTimeClass airTime, double lat, double lng);

};
#endif
