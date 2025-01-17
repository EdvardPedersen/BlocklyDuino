/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Variable blocks for Arduino.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

//goog.provide('Blockly.Arduino.variables');

goog.require('Blockly.Arduino');

Blockly.Arduino.variableTypeDB_ = {};

Blockly.Arduino.variables_get = function() {
  // Variable getter.
  var code = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  if (!(code in Blockly.Arduino.variableTypeDB_))
  {
    Blockly.Arduino.variableTypeDB_[code] = "int";
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.variables_set = function() {
  // Variable setter.
  var argument0 = Blockly.Arduino.valueToCode(this, 'VALUE',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  if (!(varName in Blockly.Arduino.variableTypeDB_))
  {
    Blockly.Arduino.variableTypeDB_[varName] = "int";
  }
  return varName + ' = ' + argument0 + ';\n';
};

Blockly.Arduino.variables_declare = function() {
  // Variable setter.
  var variable_type = this.getFieldValue('TYPE');
  
  var argument0 = Blockly.Arduino.valueToCode(this, 'VALUE',
      Blockly.Arduino.ORDER_ASSIGNMENT);
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  
  if (variable_type.includes("AirBitDateTimeClass")) {
    Blockly.Arduino.definitions_['define_airbitdatetimeclass'] = '#include "AirBitDateTimeClass.h';
  }

  Blockly.Arduino.variableTypeDB_[varName] = variable_type;

  var code = varName;
  if(argument0.toString()){
    code += ' = ';
    code += argument0.toString();
  }
  code += ';\n'
  return code;
};