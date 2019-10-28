/*
  AirBitDateTimeClass.h - Library for easy interaction with an Air:Bit unit.
  Created by Håkon Wallann, Oktober 27, 2019.
  For use in the UiT Air:Bit project.
*/

#ifndef AirBitDateTimeClass_h
#define AirBitDateTimeClass_h

#include "Arduino.h"

#include <SD.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>

class AirBitDateTimeClass
{       // The class
    public:             // Access specifier
        AirBitDateTimeClass();
        int day;
        int month;
        int year;
        int hour;
        int minute;
        int second;

        void PrintSerial();
        void PrintFile(File file);
};
#endif
