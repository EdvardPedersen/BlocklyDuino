/*
  AirBitDateTimeClass.cpp - Library for easy interaction with an Air:Bit unit.
  Created by Håkon Wallann, Oktober 27, 2019.
  For use in the UiT Air:Bit project.
*/
#include "Arduino.h"
#include "AirBitDateTimeClass.h"
#include <SD.h>
#include <SoftwareSerial.h>

AirBitDateTimeClass::AirBitDateTimeClass()
{
    int day;
    int month;
    int year;
    int hour;
    int minute;
    int second;
}
void AirBitDateTimeClass::PrintSerial() {
  Serial.print(day);
  Serial.print(".");
  Serial.print(month);
  Serial.print(".");
  Serial.print(year);
  Serial.print(" ");
  Serial.print(hour);
  Serial.print(":");
  Serial.print(minute);
  Serial.print(":");
  Serial.print(second);
}

void AirBitDateTimeClass::PrintFile(File file)  {
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