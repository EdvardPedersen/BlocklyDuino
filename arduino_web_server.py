#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# credit: http://sheep.art.pl/Wiki%20Engine%20in%20Python%20from%20Scratch


import http.server
import http.server
import itertools
import logging
import platform
import os
import re
import subprocess
import tempfile
import urllib.request, urllib.parse, urllib.error
from optparse import OptionParser


logging.basicConfig(level=logging.DEBUG)


arduino_cmd = None
def get_arduino_command():
    """Attempt to find or guess the path to the Arduino binary."""
    global arduino_cmd
    if not arduino_cmd:
        if platform.system() == "Darwin":
            arduino_cmd_guesses = ["/Applications/Arduino.app/Contents/MacOS/Arduino"]
        elif platform.system() == "Windows":
            arduino_cmd_guesses = [
                "c:\Program Files\Arduino\Arduino_debug.exe",
                "c:\Program Files\Arduino\Arduino.exe",
                "c:\Program Files (x86)\Arduino\Arduino_debug.exe",
                "c:\Program Files (x86)\Arduino\Arduino.exe"
            ]
        else:
            arduino_cmd_guesses = ["/snap/bin/arduino-mhall119.arduino"]

        for guess in arduino_cmd_guesses:
            if os.path.exists(guess):
                logging.info("Found Arduino command at %s", guess)
                arduino_cmd = guess
                break
        else:
            logging.info("Couldn't find Arduino command; hoping it's on the path!")
            arduino_cmd = "arduino"
    return arduino_cmd


def guess_port_name():
    """Attempt to guess a port name that we might find an Arduino on."""
    portname = "0"
    if platform.system() == "Windows":
        import winreg as winreg
        key = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, "HARDWARE\\DEVICEMAP\\SERIALCOMM")
        # We'll guess it's the last COM port.
        for i in itertools.count():
            try:
                portname = winreg.EnumValue(key, i)[1]
            except WindowsError:
                break
    else:
        # We'll guess it's the first non-bluetooth tty. or cu. prefixed device
        ttys = [filename for filename in os.listdir("/dev")
                if (filename.startswith("tty") or filename.startswith("cu."))
                and not "luetooth" in filename]
        ttys.sort(key=lambda k:(k.startswith("cu."), k))
        if ttys:
            portname = "/dev/" + ttys[0]
    logging.info("Guessing port name as %s", portname)
    return portname


parser = OptionParser()
parser.add_option("--port", dest="port", help="Upload to serial port named PORT", metavar="PORT")
parser.add_option("--board", dest="board", help="Board definition to use", metavar="BOARD")
parser.add_option("--command", dest="cmd", help="Arduino command name", metavar="CMD")


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_HEAD(self):
        """Send response headers"""
        if self.path != "/":
            return http.server.SimpleHTTPRequestHandler.do_HEAD(self)
        self.send_response(200)
        self.send_header("content-type", "text/html;charset=utf-8")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

    def do_GET(self):
        """Send page text"""
        if self.path == "/download_project":
            self.path = "../air-bit/refactored_code/refactor2/lib.zip"
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        elif self.path != "/":
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        else:
            self.send_response(302)
            self.send_header("Location", "/blockly/apps/blocklyduino/index.html")
            self.end_headers()

    def do_POST(self):
        """Save new page text and display it"""
        if self.path != "/":
            return http.server.SimpleHTTPRequestHandler.do_POST(self)

        options, args = parser.parse_args()

        length = int(self.headers.getheader('content-length'))
        if length:
            text = self.rfile.read(length)
                        
            print("sketch to upload: " + text)

            tempfile.tempdir = "/tmp/"

            dirname = tempfile.mkdtemp()
            sketchname = os.path.join(dirname, os.path.basename(dirname)) + ".ino"
            f = open(sketchname, "wb")
            f.write(text + "\n")
            f.close()

            print("created sketch at %s" % (sketchname))
        
            # invoke arduino to build/upload
            compile_args = [
                options.cmd or get_arduino_command(),
                "--verify",
                sketchname,
                "--pref",
                "build.path=" + dirname + "_build"
            ]
            if options.board:
                compile_args.extend([
                    "--board",
                    options.board
                ])
            print(compile_args)

            print("Uploading with %s" % (" ".join(compile_args)))
            rc = subprocess.call(compile_args)

            if not rc == 0:
                print("arduino returned " + repr(rc))
                self.send_response(400)
            else:
                self.send_response(200)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Content-type', 'application/octet-stream')
                self.send_header('Content-disposition', 'attachment; filename="program.hex"')
                self.end_headers()

                with open(dirname + "_build/" + os.path.basename(dirname) + ".ino.with_bootloader.hex", 'r') as f:
                  self.wfile.write(f.read())
                  f.seek(0)
                  print(("Sent: {}".format(f.read())))
        else:
            self.send_response(400)


if __name__ == '__main__':
    print("Blocklyduino can now be accessed at http://0.0.0.0:8080/")
    server = http.server.HTTPServer(("0.0.0.0", 8080), Handler)
    server.pages = {}
    server.serve_forever()
