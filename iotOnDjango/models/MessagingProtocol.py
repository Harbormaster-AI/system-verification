from django.db import models
 #======================================================================
# 
# Encapsulates data for model MessagingProtocol
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class MessagingProtocol Declaration (enumerated type)
#======================================================================
from enum import Enum 
class MessagingProtocol(Enum):   # A subclass of Enum
	MQTT = 'MQTT'
	AMQP = 'AMQP'
	HTTP = 'HTTP'
	CoAP = 'CoAP'
	WebSocket = 'WebSocket'
