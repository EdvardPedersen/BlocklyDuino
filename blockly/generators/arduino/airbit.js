goog.provide('Blockly.Arduino.airbit');

goog.require('Blockly.Arduino');

Blockly.Arduino.airbit_declare_variable = function() {
  // Variable setter.
  var variable_type = this.getFieldValue('TYPE');
  
  var argument0 = Blockly.Arduino.valueToCode(this, 'VALUE',
      Blockly.Arduino.ORDER_ASSIGNMENT);
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('NAME'),
      Blockly.Variables.NAME_TYPE);
  
  if (variable_type.includes("AirBitDateTimeClass")) {
    Blockly.Arduino.definitions_['define_airbitdatetimeclass'] = '#include "AirBitDateTimeClass.h';
  }

  var isArray = false;
  if (variable_type.includes("[]")) {
    isArray = true;
    variable_type = variable_type.replace("[]", "");
  }
  Blockly.Arduino.setups_['setup_var' + varName] = variable_type;
  Blockly.Arduino.setups_['setup_var' + varName] += " " + varName;
  if(isArray) {
    Blockly.Arduino.setups_['setup_var' + varName] += "[]"
  }
  if(argument0.toString()){
    Blockly.Arduino.setups_['setup_var' + varName] += ' = ';
    Blockly.Arduino.setups_['setup_var' + varName] += argument0.toString();
  }
  Blockly.Arduino.setups_['setup_var' + varName] += ';\n'
  return '';
};

Blockly.Arduino.airbit_true_false = function() {
  var isTrue = this.getFieldValue('BOOL');

  var code = isTrue.toString();
  
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.airbit_logical_and = function() {
  var a = Blockly.Arduino.valueToCode(this, 'VariableA', Blockly.Arduino.ORDER_ATOMIC);
  var b = Blockly.Arduino.valueToCode(this, 'VariableA', Blockly.Arduino.ORDER_ATOMIC);

  var code = '( ' + a +' && '+ b +' )';
  
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.airbit_continue = function() {
  var code = 'continue\n;'
  
  return code;
};

Blockly.Arduino.airbit_blink_led = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '500';

  Blockly.Arduino.definitions_['define_led_red'] = '#define LED_RED A1';
  Blockly.Arduino.definitions_['define_led_green'] = '#define LED_GREEN A0\n';

  Blockly.Arduino.setups_['setup_led_'+dropdown_pin.toString().toLowerCase()] 
    = 'pinMode('+dropdown_pin+', OUTPUT);\n';

  var code = 'digitalWrite('+dropdown_pin+', HIGH);\n'
  code += 'delay('+delay_time+');\n';
  code += 'digitalWrite('+dropdown_pin+', LOW);\n'
  return code;
};

Blockly.Arduino.airbit_get_datetime = function() {
  Blockly.Arduino.definitions_['define_tinygps++'] = '#include <TinyGPS++.h>';
  Blockly.Arduino.definitions_['define_softwareserial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_airbitdatetimeclass'] = '#include "AirBitDateTimeClass.h';
  Blockly.Arduino.definitions_['define_airbitutilsclass'] = '#include "AirBitUtilsClass.h\n';
  
  var gps_rx = this.getFieldValue('PIN_RX');
  var gps_tx = this.getFieldValue('PIN_TX');

  Blockly.Arduino.definitions_['define_gpsrx'] = '#define GPS_RX '+gps_rx+'\n';
  Blockly.Arduino.definitions_['define_gpstx'] = '#define GPS_TX '+gps_tx+'\n'; 

  Blockly.Arduino.definitions_['var_gpscom'] = 'SoftwareSerial gpsCom(GPS_RX, GPS_TX);';
  Blockly.Arduino.definitions_['var_gps'] = 'TinyGPSPlus gps;\n';
  Blockly.Arduino.definitions_['var_airbitutils'] = 'AirBitUtilsClass airbitUtils\n';
  
  Blockly.Arduino.setups_["setup_gpscom"] = "gpsCom.begin(9600); // Initialize serial communication to GPS antenna\n";

  var code = 'airbitUtils.GetDateTime(gps)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.airbit_gps_update_data = function() {
  Blockly.Arduino.definitions_['define_tinygps++'] = '#include <TinyGPS++.h>';
  Blockly.Arduino.definitions_['define_softwareserial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_airbitutilsclass'] = '#include "AirBitUtilsClass.h\n';
  
  var gps_rx = this.getFieldValue('PIN_RX');
  var gps_tx = this.getFieldValue('PIN_TX');

  Blockly.Arduino.definitions_['define_gpsrx'] = '#define GPS_RX '+gps_rx+'\n';
  Blockly.Arduino.definitions_['define_gpstx'] = '#define GPS_TX '+gps_tx+'\n'; 

  Blockly.Arduino.definitions_['var_gpscom'] = 'SoftwareSerial gpsCom(GPS_RX, GPS_TX);';
  Blockly.Arduino.definitions_['var_gps'] = 'TinyGPSPlus gps;\n';
  Blockly.Arduino.definitions_['var_airbitutils'] = 'AirBitUtilsClass airbitUtils\n';
  
  Blockly.Arduino.setups_["setup_gpscom"] = "gpsCom.begin(9600); // Initialize serial communication to GPS antenna\n";

  var code = "gpsCom.listen();\n";
  code += "airUtils.WaitOnGpsEncoding(gps, gpsCom);\n";

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.airbit_gps_location_is_valid = function() {
  Blockly.Arduino.definitions_['define_tinygps++'] = '#include <TinyGPS++.h>';
  Blockly.Arduino.definitions_['define_softwareserial'] = '#include <SoftwareSerial.h>\n';

  var gps_rx = this.getFieldValue('PIN_RX');
  var gps_tx = this.getFieldValue('PIN_TX');

  Blockly.Arduino.definitions_['define_gpsrx'] = '#define GPS_RX '+gps_rx+'\n';
  Blockly.Arduino.definitions_['define_gpstx'] = '#define GPS_TX '+gps_tx+'\n'; 

  Blockly.Arduino.definitions_['var_gpscom'] = 'SoftwareSerial gpsCom(GPS_RX, GPS_TX);';
  Blockly.Arduino.definitions_['var_gps'] = 'TinyGPSPlus gps;\n';
  
  Blockly.Arduino.setups_["setup_gpscom"] = "gpsCom.begin(9600); // Initialize serial communication to GPS antenna\n";

  var code = 'gps.location.isValid()';

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.airbit_gps_location_is_updated = function() {
  Blockly.Arduino.definitions_['define_tinygps++'] = '#include <TinyGPS++.h>';
  Blockly.Arduino.definitions_['define_softwareserial'] = '#include <SoftwareSerial.h>\n';

  var gps_rx = this.getFieldValue('PIN_RX');
  var gps_tx = this.getFieldValue('PIN_TX');

  Blockly.Arduino.definitions_['define_gpsrx'] = '#define GPS_RX '+gps_rx+'\n';
  Blockly.Arduino.definitions_['define_gpstx'] = '#define GPS_TX '+gps_tx+'\n'; 

  Blockly.Arduino.definitions_['var_gpscom'] = 'SoftwareSerial gpsCom(GPS_RX, GPS_TX);';
  Blockly.Arduino.definitions_['var_gps'] = 'TinyGPSPlus gps;\n';
  
  Blockly.Arduino.setups_["setup_gpscom"] = "gpsCom.begin(9600); // Initialize serial communication to GPS antenna\n";

  var code = 'gps.location.isUpdated()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.airbit_gps_location_latitude = function() {
  Blockly.Arduino.definitions_['define_tinygps++'] = '#include <TinyGPS++.h>';
  Blockly.Arduino.definitions_['define_softwareserial'] = '#include <SoftwareSerial.h>\n';

  var gps_rx = this.getFieldValue('PIN_RX');
  var gps_tx = this.getFieldValue('PIN_TX');

  Blockly.Arduino.definitions_['define_gpsrx'] = '#define GPS_RX '+gps_rx+'\n';
  Blockly.Arduino.definitions_['define_gpstx'] = '#define GPS_TX '+gps_tx+'\n'; 

  Blockly.Arduino.definitions_['var_gpscom'] = 'SoftwareSerial gpsCom(GPS_RX, GPS_TX);';
  Blockly.Arduino.definitions_['var_gps'] = 'TinyGPSPlus gps;\n';
  
  Blockly.Arduino.setups_["setup_gpscom"] = "gpsCom.begin(9600); // Initialize serial communication to GPS antenna\n";

  var code = 'gps.location.lat()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.airbit_gps_location_longitude = function() {
  Blockly.Arduino.definitions_['define_tinygps++'] = '#include <TinyGPS++.h>';
  Blockly.Arduino.definitions_['define_softwareserial'] = '#include <SoftwareSerial.h>\n';

  var gps_rx = this.getFieldValue('PIN_RX');
  var gps_tx = this.getFieldValue('PIN_TX');

  Blockly.Arduino.definitions_['define_gpsrx'] = '#define GPS_RX '+gps_rx+'\n';
  Blockly.Arduino.definitions_['define_gpstx'] = '#define GPS_TX '+gps_tx+'\n'; 

  Blockly.Arduino.definitions_['var_gpscom'] = 'SoftwareSerial gpsCom(GPS_RX, GPS_TX);';
  Blockly.Arduino.definitions_['var_gps'] = 'TinyGPSPlus gps;\n';
  
  Blockly.Arduino.setups_["setup_gpscom"] = "gpsCom.begin(9600); // Initialize serial communication to GPS antenna\n";

  var code = 'gps.location.lng()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.airbit_dht_temperature = function(){
  Blockly.Arduino.definitions_['define_dht'] = '#include <DHT.h>';
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


Blockly.Arduino.airbit_sds_pm_readings = function(){
  Blockly.Arduino.definitions_['define_sds011'] = '#include <SDS011.h>\n';

  var tx = Blockly.Arduino.valueToCode(this, 'PM_TX', Blockly.Arduino.ORDER_ATOMIC);
  var rx = Blockly.Arduino.valueToCode(this, 'PM_RX', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.definitions_['define_pmtx'] = '#define PM_TX '+tx;
  Blockly.Arduino.definitions_['define_pmrx'] = '#define PM_RX '+rx+'\n';

  Blockly.Arduino.definitions_['var_sds011'] = 'SDS011 sds;';
  
  Blockly.Arduino.setups_['setup_sds011'] = 'sds.begin(PM_TX, PM_RX);\n';

  var pm25 = Blockly.Arduino.valueToCode(this, 'PM25', Blockly.Arduino.ORDER_ATOMIC);
  var pm10 = Blockly.Arduino.valueToCode(this, 'PM10', Blockly.Arduino.ORDER_ATOMIC);
  
  var code = "sds.read(&"+pm25.toString().split('"').join('');
  code += ", &"+pm10.toString().split('"').join('')+")";
  
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.airbit_sd_store_readings = function(){
  Blockly.Arduino.definitions_['define_sd'] = '#include <SD.h>\n';
  Blockly.Arduino.definitions_['define_airbitutilsclass'] = '#include "AirBitUtilsClass.h\n';

  var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.definitions_['define_sdpin'] = '#define SD_CS_PIN '+pin+'\n';

  Blockly.Arduino.definitions_['var_file'] = 'File file;';

  Blockly.Arduino.definitions_['var_airbitutils'] = 'AirBitUtilsClass airbitUtils;';

  var filename = Blockly.Arduino.valueToCode(this, 'FILENAME', Blockly.Arduino.ORDER_ATOMIC) || '"testfile.txt"';
  
  var setup = "// Activate CS-Pin control\n";
  setup += "  pinMode(SD_CS_PIN, OUTPUT);\n\n";
  setup += "  // Startup SD-card reader\n";
  setup += "  SD.begin(SD_CS_PIN);\n\n";
  setup += "  // Define filename\n";
  setup += "  char filename[] = "+filename+";\n\n";

  setup += "  if (SD.exists(filename)) {\n";
  setup += "    // Open existing file for writing and append\n";
  setup += "    file = SD.open(filename, O_WRITE | O_APPEND);\n";
  setup += "    file.println(\"--------------------\");\n";
  setup += "    file.println(\"Filen ble åpnet på nytt.\");\n";
  setup += "  } else {\n";
  setup += "    file = SD.open(filename, O_CREAT | O_WRITE);\n";
  setup += "    file.println(\"Dette er den første linjen i filen.\");\n";
  setup += "  }\n";
  setup += "  file.flush(); // Force saving data to SD-card\n";


  Blockly.Arduino.setups_['setup_sd'] = setup;

  var airbitDateTime = Blockly.Arduino.valueToCode(this, 'AIRBITDATETIME', Blockly.Arduino.ORDER_ATOMIC);
  var lat = Blockly.Arduino.valueToCode(this, 'LATITUDE', Blockly.Arduino.ORDER_ATOMIC);
  var lng = Blockly.Arduino.valueToCode(this, 'LONGITUDE', Blockly.Arduino.ORDER_ATOMIC);
  var pm10 = Blockly.Arduino.valueToCode(this, 'PM10', Blockly.Arduino.ORDER_ATOMIC);
  var pm25 = Blockly.Arduino.valueToCode(this, 'PM25', Blockly.Arduino.ORDER_ATOMIC);
  var humidity = Blockly.Arduino.valueToCode(this, 'HUMIDITY', Blockly.Arduino.ORDER_ATOMIC);
  var temperature = Blockly.Arduino.valueToCode(this, 'TEMPERATURE', Blockly.Arduino.ORDER_ATOMIC);

  var code = "airbitUtils.PrintReadingsToSd(file, ";
  code += airbitDateTime.toString().split('"').join('')+", ";
  code += lat.toString().split('"').join('')+", ";
  code += lng.toString().split('"').join('')+",\n  ";
  code += pm10.toString().split('"').join('')+", ";
  code += pm25.toString().split('"').join('')+", ";
  code += humidity.toString().split('"').join('')+", ";
  code += temperature.toString().split('"').join('')+");\n";
  
  return code;
};
