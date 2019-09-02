goog.provide('Blockly.Blocks.airbit');

goog.require('Blockly.Blocks');

Blockly.Blocks.airbit.HUE = 250;
Blockly.Blocks.airbit.HELPURL = 'http://airbit.uit.no/';

Blockly.Blocks['airbit_blink_led'] = {
  helpUrl: Blockly.Blocks.airbit.HELPURL,
  init: function() {
    this.setColour(Blockly.Blocks.airbit.HUE);
    this.appendDummyInput()
      .appendField("LED")
      .appendField(new Blockly.FieldImage("https://www.clipartwiki.com/clipimg/detail/70-701978_lights-clipart-led-diodes-led.png", 64, 64))
      .appendField("PIN#")
      .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
    this.appendValueInput("DELAY_TIME", 'Number')
      .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Delay");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Green LED. "HIGH" turns the light on. "LOW" turns it off');
  }
};

Blockly.Blocks['airbit_logical_and'] = {
  helpUrl: Blockly.Blocks.airbit.HELPURL,
  init: function() {
    this.setColour(Blockly.Blocks.airbit.HUE);
    this.appendDummyInput()
      .appendField("Logical AND (&&)")
    this.appendValueInput("VariableA")
      .setCheck('Bool')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Variable A");
    this.appendValueInput("VariableB")
      .setCheck('Bool')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Variable B");
    this.setOutput(true, 'Bool');
    this.setTooltip('Returns \'true\' if \'A\' and \'B\' is logically \'true\'');
  }
};

Blockly.Blocks['airbit_continue'] = {
  helpUrl: Blockly.Blocks.airbit.HELPURL,
  init: function() {
    this.setColour(Blockly.Blocks.airbit.HUE);
    this.appendDummyInput()
      .appendField("Restart Loop");
    this.setPreviousStatement(true, null);
    this.setTooltip('Goes to the start of the parent loop. Work already done will not be reset.');
  }
};

Blockly.Blocks['airbit_get_datetime'] = {
  helpUrl: Blockly.Blocks.airbit.HELPURL,
  init: function() {
    this.setColour(Blockly.Blocks.airbit.HUE);
    this.appendDummyInput()
      .appendField("Get DateTime")
      .appendField(new Blockly.FieldImage("https://image.flaticon.com/icons/svg/2097/2097131.svg", 64, 64))
    this.appendValueInput("GPS")
      .setCheck('TinyGPSPlus')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("GPS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Returns an object containing the current DateTime.');
  }
};


Blockly.Blocks['airbit_get_gps'] = {
  helpUrl: Blockly.Blocks.airbit.HELPURL,
  init: function() {
    this.setColour(Blockly.Blocks.airbit.HUE);
    this.appendDummyInput()
      .appendField("GPS module")
      .appendField(new Blockly.FieldImage("https://www.jaycar.co.nz/medias/sys_master/images/9292330008606/XC3712-arduino-compatible-gps-receiver-moduleImageMain-515.jpg", 64, 64))
      .appendField("PIN_RX")
      .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN_RX")
      .appendField("PIN_TX")
      .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN_TX");
    this.setOutput(true, 'TinyGPSPlus');
    this.setTooltip('Non-contact distance measurement module');
  }
};

Blockly.Blocks['airbit_gps_location_is_valid'] = {
  helpUrl: Blockly.Blocks.airbit.HELPURL,
  init: function() {
    this.setColour(Blockly.Blocks.airbit.HUE);
    this.appendDummyInput()
      .appendField("Is GPS Valid")
      .appendField(new Blockly.FieldImage("https://www.jaycar.co.nz/medias/sys_master/images/9292330008606/XC3712-arduino-compatible-gps-receiver-moduleImageMain-515.jpg", 64, 64))
    this.appendValueInput("GPS")
      .appendField('GPS')
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setOutput(true, 'Bool');
    this.setTooltip('Returns \'true\' if the location from the GPS is valid.');
  }
};

Blockly.Blocks['airbit_gps_location_is_updated'] = {
  helpUrl: Blockly.Blocks.airbit.HELPURL,
  init: function() {
    this.setColour(Blockly.Blocks.airbit.HUE);
    this.appendDummyInput()
      .appendField("Is GPS Updated")
      .appendField(new Blockly.FieldImage("https://www.jaycar.co.nz/medias/sys_master/images/9292330008606/XC3712-arduino-compatible-gps-receiver-moduleImageMain-515.jpg", 64, 64))
    this.appendValueInput("GPS")
      .setCheck('TinyGPSPlus')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("GPS");
    this.setOutput(true, 'Bool');
    this.setTooltip('Returns \'true\' if the location from the GPS is updated.');
  }
};

Blockly.Blocks['airbit_gps_location_latitude'] = {
  helpUrl: Blockly.Blocks.airbit.HELPURL,
  init: function() {
    this.setColour(Blockly.Blocks.airbit.HUE);
    this.appendDummyInput()
      .appendField("GPS Latitude")
      .appendField(new Blockly.FieldImage("https://www.jaycar.co.nz/medias/sys_master/images/9292330008606/XC3712-arduino-compatible-gps-receiver-moduleImageMain-515.jpg", 64, 64))
    this.appendValueInput("GPS")
      .setCheck('TinyGPSPlus')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("GPS");
    this.setOutput(true, 'Double');
    this.setTooltip('Returns latitude of the GPS location. Return value is a double');
  }
};

Blockly.Blocks['airbit_gps_location_longitude'] = {
  helpUrl: Blockly.Blocks.airbit.HELPURL,
  init: function() {
    this.setColour(Blockly.Blocks.airbit.HUE);
    this.appendDummyInput()
      .appendField("GPS Longitude")
      .appendField(new Blockly.FieldImage("https://www.jaycar.co.nz/medias/sys_master/images/9292330008606/XC3712-arduino-compatible-gps-receiver-moduleImageMain-515.jpg", 64, 64))
    this.appendValueInput("GPS")
      .setCheck('TinyGPSPlus')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("GPS");
    this.setOutput(true, 'Double');
    this.setTooltip('Returns longitude of the GPS location. Return value is a double');
  }
};

Blockly.Blocks['airbit_dht_temperature'] = {
  helpUrl: Blockly.Blocks.airbit.HELPURL,
  init: function() {
    this.setColour(Blockly.Blocks.airbit.HUE);
    this.appendDummyInput()
      .appendField("Get DHT22 Temperature")
      .appendField(new Blockly.FieldImage("https://img.dxcdn.com/productimages/sku_435776_1.jpg", 64, 64))
    this.setOutput(true, 'Float');
    this.setTooltip('Returns the temperature reading from the DHT sensor. Return value is a float.');
  }
};

Blockly.Blocks['airbit_dht_humidity'] = {
  helpUrl: Blockly.Blocks.airbit.HELPURL,
  init: function() {
    this.setColour(Blockly.Blocks.airbit.HUE);
    this.appendDummyInput()
      .appendField("Get DHT22 Humidity")
      .appendField(new Blockly.FieldImage("https://img.dxcdn.com/productimages/sku_435776_1.jpg", 64, 64))
    this.setOutput(true, 'Float');
    this.setTooltip('Returns the humidity reading from the DHT sensor. Return value is a float.');
  }
};
