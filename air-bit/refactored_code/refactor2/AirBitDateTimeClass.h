#ifndef AIRBITDATETIME
#define AIRBITDATETIME

#include <SD.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>


using namespace airbit;

class AirBitDateTimeClass {       // The class
    public:             // Access specifier
        int day;
        int month;
        int year;
        int hour;
        int minute;
        int second;

        void SetTime(TinyGPSPlus gps);
        void PrintDebug();
        void PrintFormated(File file);
};
#endif AIRBITDATETIME