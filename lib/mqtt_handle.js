var mqtt = require('mqtt');
var options = {
	port: 18396,
	host: 'mqtt://postman.cloudmqtt.com',
	clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
	username: 'jackerle',
	password: '19114198',
	keepalive: 60,
	reconnectPeriod: 1000,
	protocolId: 'MQIsdp',
	protocolVersion: 3,
	clean: true,
	encoding: 'utf8'
};



var mqtt_green = ()=>{
	var client = mqtt.connect('mqtt://postman.cloudmqtt.com', options)
	client.on('connect', function () { 
			client.publish('/ESP/LED', 'GREEN', function () {
				console.log("Message is published");
				client.end()
			})
	})
}



var mqtt_off = ()=>{
	var client = mqtt.connect('mqtt://postman.cloudmqtt.com', options)
	client.on('connect', function () { 
			client.publish('/ESP/LED', 'OFF', function () {
				console.log("Message is published");
				client.end()
			})
	})
}


var mqtt_red = ()=>{
	var client = mqtt.connect('mqtt://postman.cloudmqtt.com', options)
	client.on('connect', function () { 
			client.publish('/ESP/LED', 'RED', function () {
				console.log("Message is published");
				client.end()
			})
	})
}


var mqtt_blue = ()=>{
	var client = mqtt.connect('mqtt://postman.cloudmqtt.com', options)
	client.on('connect', function () { 
			client.publish('/ESP/LED', 'BLUE', function () {
				console.log("Message is published");
				client.end()
			})
	})
}







module.exports = {
	mqtt_green,
	mqtt_off,
	mqtt_red,
	mqtt_blue
}