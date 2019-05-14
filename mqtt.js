var mqtt = require('mqtt');
var readline = require('readline-sync');



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




var client = mqtt.connect('mqtt://postman.cloudmqtt.com', options);
client.on('connect', function () { // When connected
	console.log('connected');

	
	//input 
	var msg = readline.question("What is your message for publish?")


	// subscribe to a topic
	client.subscribe('/ESP/LED', function () {
		// when a message arrives, do something with it
		client.on('message', function (topic, message, packet) {
		console.log("Received '" + message + "' on '" + topic + "'");
		})
	})

	


	// publish a message to a topic
	client.publish('/ESP/LED', msg, function () {
		console.log("Message is published");
		client.end(); // Close the connection when published
	})

})