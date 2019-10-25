#define LED_RED   A1
#define LED_GREEN A0

void setup() {
  pinMode(LED_RED, OUTPUT); // Enable red LED control
  pinMode(LED_GREEN, OUTPUT); // Enable green LED control
}

void loop() {
  digitalWrite(LED_RED, HIGH);
  delay(1000);
  digitalWrite(LED_RED, LOW);
  digitalWrite(LED_GREEN, HIGH);
  delay(1000);
  digitalWrite(LED_GREEN, LOW);
}
