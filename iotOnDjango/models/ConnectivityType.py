from django.db import models
 #======================================================================
# 
# Encapsulates data for model ConnectivityType
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ConnectivityType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class ConnectivityType(Enum):   # A subclass of Enum
	WiFi = 'WiFi'
	Ethernet = 'Ethernet'
	LTE = 'LTE'
	FiveG = 'FiveG'
	NBIoT = 'NBIoT'
	LoRaWAN = 'LoRaWAN'
	Zigbee = 'Zigbee'
	BLE = 'BLE'
	Satellite = 'Satellite'
