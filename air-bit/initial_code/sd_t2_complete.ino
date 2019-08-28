#include <SD.h>

#define SD_CS_PIN 10

File file;
int counter;

void setup () {
  // Activate CS-Pin control
  pinMode(SD_CS_PIN, OUTPUT);

  // Startup SD-card reader
  SD.begin(SD_CS_PIN);

  // Define filename
  char filename[] = "testfile.txt";

  if (SD.exists(filename)) {
    // Open existing file for writing and append
    file = SD.open(filename, O_WRITE | O_APPEND);
    file.println("--------------------");
    file.println("Filen ble åpnet på nytt.");
  } else {
    file = SD.open(filename, O_CREAT | O_WRITE);
    file.println("Dette er den første linjen i filen.");
  }
  file.flush(); // Force saving data to SD-card

  // Start counter at 0
  counter = 0;
}

void loop() {
  counter += 1;

  file.print("Dette er linje nr.:");
  file.print(" ");
  file.print(counter);
  file.println();

  file.flush();

  delay(1000); // Wait a second.
}
