
from django.db import models

#======================================================================
# Class FirmwareRelease Declaration
#======================================================================
class FirmwareRelease (models.Model):

#======================================================================
# attribute declarations
#======================================================================
	version = FirmwareVersion
	releaseDate = models.DateField(null=True)
	releaseNotes = models.CharField(max_length=200, null=True)
	checksum = Checksum
	deviceModel = models.ForeignKey('DeviceModel', on_delete=models.CASCADE, null=True, blank=True, related_name='+')

#======================================================================
# function declarations
#======================================================================
	def toString(self):
		str = ""
		str = str + self.version
		str = str + self.releaseDate
		str = str + self.releaseNotes
		str = str + self.checksum
		return str;
    
	def __str__(self):
		return self.toString();

	def identity(self):
		return "FirmwareRelease";
    
	def objectType(self):
		return "FirmwareRelease";
