#include "AirBitDateTimeClass.h"
#include <SD.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>

class AirBitDateTimeClass {       // The class
  public:             // Access specifier
    int day;
    int month;
    int year;
    int hour;
    int minute;
    int second;

    void SetTime(TinyGPSPlus gps) {
      day = gps.date.day();
      month = gps.date.month();
      year = gps.date.year();
      hour = gps.time.hour();
      minute = gps.time.minute();
      second = gps.time.second();
    }

    void PrintDebug() {
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
    }

    void PrintFormated(File file)  {
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
    }
};