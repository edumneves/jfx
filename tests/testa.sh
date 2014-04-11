#!/bin/bash   
echo $0
casperjs test '$0' --url:http://localhost/jfx/ --includes:utils/inc.js
