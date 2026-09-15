from django.db import models
 #======================================================================
# 
# Encapsulates data for model SensorType
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class SensorType Declaration (enumerated type)
#======================================================================
from enum import Enum 
class SensorType(Enum):   # A subclass of Enum
	Temperature = 'Temperature'
	Humidity = 'Humidity'
	Pressure = 'Pressure'
	Accelerometer = 'Accelerometer'
	Gyroscope = 'Gyroscope'
	GPS = 'GPS'
	Light = 'Light'
	CO2 = 'CO2'
	VOC = 'VOC'
	Current = 'Current'
	Voltage = 'Voltage'
