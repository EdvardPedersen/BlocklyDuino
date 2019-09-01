goog.provide('Blockly.Arduino.airbit');

goog.require('Blockly.Arduino');


Blockly.Arduino.airbit_blink_led = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '500';
  Blockly.Arduino.setups_['setup_led_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+', HIGH);\n'
  code += 'delay('+delay_time+');\n';
  code += 'digitalWrite('+dropdown_pin+', LOW);\n'
  return code;
};

Blockly.Arduino.airbit_logical_and = function() {
  var a = Blockly.Arduino.valueToCode(this, 'VariableA', Blockly.Arduino.ORDER_ATOMIC);
  var b = Blockly.Arduino.valueToCode(this, 'VariableA', Blockly.Arduino.ORDER_ATOMIC);

  var code = a +' && '+ b;+'\n';
  
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.airbit_continue = function() {
  var code = 'continue\n;'
  
  return code;
};

Blockly.Arduino.airbit_get_datetime = function() {
  var gps = Blockly.Arduino.valueToCode(this, 'GPS', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_airbitdatetimeclass'] = '#include "AirBitDateTimeClass.h"';
  Blockly.Arduino.definitions_['define_airbitutilsclass'] = '#include "AirBitUtilsClass.h"';
  Blockly.Arduino.definitions_['define_airbitdatetime'] = 'AirBitDateTimeClass airbitDateTime';
  Blockly.Arduino.definitions_['define_airbitutils'] = 'AirBitUtilsClass airbitUtils';
  var code = 'airbitDateTime = airbitUtils.GetDateTime('+gps+');\n'
  return code;
};

Blockly.Arduino.airbit_get_gps = function() {
  Blockly.Arduino.definitions_['define_tinygps++'] = '#include <TinyGPS++.h>\n';
  Blockly.Arduino.definitions_['define_softwareserial'] = '#include <SoftwareSerial.h>\n';

  var gps_rx = this.getFieldValue('PIN_RX');
  var gps_tx = this.getFieldValue('PIN_TX');

  Blockly.Arduino.definitions_['define_gpsrx'] = '#define GPS_RX '+gps_rx+'\n';
  Blockly.Arduino.definitions_['define_gpstx'] = '#define GPS_TX '+gps_tx+'\n'; 

  Blockly.Arduino.definitions_['var_gpscom'] = 'SoftwareSerial gpsCom(GPS_RX, GPS_TX);';
  Blockly.Arduino.definitions_['var_gps'] = 'TinyGPSPlus gps;';
  
  Blockly.Arduino.setups_["setup_gpscom"] = "gpsCom.begin(9600); // Initialize serial communication to GPS antenna\n";

  var code = "gps";

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.airbit_gps_location_is_valid = function() {
  var gps = Blockly.Arduino.valueToCode(this, 'GPS', Blockly.Arduino.ORDER_ATOMIC);

  var code = gps + '.location.isValid()';

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.airbit_gps_location_is_updated = function() {
  var gps = Blockly.Arduino.valueToCode(this, 'GPS', Blockly.Arduino.ORDER_ATOMIC);
  var code = gps + '.location.isUpdated();\n'
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.airbit_gps_location_latitude = function() {
  var gps = Blockly.Arduino.valueToCode(this, 'GPS', Blockly.Arduino.ORDER_ATOMIC);
  var code = gps + '.location.lat()'
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.airbit_gps_location_longitude = function() {
  var gps = Blockly.Arduino.valueToCode(this, 'GPS', Blockly.Arduino.ORDER_ATOMIC);
  var code = gps + '.location.lng()'
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.airbit_dht_temperature = function(){
  Blockly.Arduino.definitions_['define_dht'] = '#include <DHT.h>\n';
  Blockly.Arduino.definitions_['define_dhtpin'] = '#define DHTPIN 9\n';

  Blockly.Arduino.definitions_['var_dht'] = 'DHT dht22(DHTPIN, DHT22)';
  
  var code = 'dht22.readTemperature()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.airbit_dht_humidity = function(){
  Blockly.Arduino.definitions_['define_dht'] = '#include <DHT.h>\n';
  Blockly.Arduino.definitions_['define_dhtpin'] = '#define DHTPIN 9\n';

  Blockly.Arduino.definitions_['var_dht'] = 'DHT dht22(DHTPIN, DHT22)';
  
  var code = 'dht22.readHumidity()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

