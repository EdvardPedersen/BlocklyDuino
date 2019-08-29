#include <SD.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>


class AirBitUtilsClass {       // The class
  public:             // Access specifier
    void PrintDebug(AirBitDateTimeClass airTime, double lat, double lng,
        float pm10, float pm25, float humidity, float temperature ) {

    }
    
    void PrintReadingsToSd(File file, AirBitDateTimeClass airTime, double lat, double lng,
        float pm10, float pm25, float humidity, float temperature ) {
      
      // Print: Time,
      airTime.PrintFormat(file);

      file.print(",")
      file.flush(); // Force saving data to SD-card

      // Print: Latitude,
      file.print(lat, 6); // Latitude in degrees

      file.print(",")
      file.flush(); // Force saving data to SD-card

      // Print: Longitude,
      file.print(lng, 6); // Longitude in degrees

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
    }

    void PrintDebugReadings(float humidity, float temperature, float pm10, float pm25, double lat, double lng) {
      PrintDebugHumidityTemperature(humidity, temperature);
      PrintDebugDust(pm10, pm25);
      print_debug_gps(lat, lng);
    }

  private:
    void PrintDebugHumidityTemperature(float humidity, float temperature) {
      Serial.print("Humidity: ");
      Serial.print(humidity);
      Serial.print("%");
      Serial.print("\t");
      Serial.print("Temperature: ");
      Serial.print(temperature);
      Serial.print("°C");
      Serial.println();
    }

    void PrintDebugDust(float pm10, float pm25) {
      Serial.print("PM10: ");
      Serial.print(pm10);
      Serial.print("\t");
      Serial.print("PM25: ");
      Serial.print(pm25);
      Serial.println();
    }

    void PrintDebugGps(double lat, double lng) {
      Serial.print("Time: ");
      airTime.PrintDebug();

      Serial.print("\t");

      Serial.print("Latitude: ");
      Serial.print(lat, 6); // Latitude in degrees
      Serial.print("\t");
      Serial.print("Longitude: ");
      Serial.print(lng, 6); // Longitude in degrees

      Serial.println();
    }

};