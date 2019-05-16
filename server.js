var express  = require('express')
var app = express()
var path = require('path')
var mqtt_handle = require('./lib/mqtt_handle')
const fs = require('fs');
const request = require('request');
var text = 'don\'t have any instruction';


const options = {
    url: `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=en&client=tw-ob`,
    headers: {
        'Referer': 'http://translate.google.com/',
        'User-Agent': 'stagefright/1.2 (Linux;Android 5.0)'
    }
}
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });
app.use('/view', express.static(__dirname + '/view'))
app.use('/sound', express.static(__dirname + '/sound'))
app.get('/index',(req,res)=>{
	res.sendFile(path.join(__dirname + '/view/index.html'))
})






app.get('/green',async (req,res)=>{
		mqtt_handle.mqtt_green()
		console.log(req.method)
		res.redirect('back')
})

app.get('/off',async (req,res)=>{
	mqtt_handle.mqtt_off()
	console.log(req.method)
	res.redirect('back')
})

app.get('/red',async (req,res)=>{
	mqtt_handle.mqtt_red()
	console.log(req.method)
	res.redirect('back')
})

app.get('/blue',async (req,res)=>{
	mqtt_handle.mqtt_blue()
	console.log(req.method)
	res.redirect('back')
})

app.get('/green_sound',(req,res)=>{
	res.sendFile(path.join(__dirname + '/sound/green_sound.mp3'))
})
app.get('/blue_sound',(req,res)=>{
	res.sendFile(path.join(__dirname + '/sound/blue_sound.mp3'))
})
app.get('/red_sound',(req,res)=>{
	res.sendFile(path.join(__dirname + '/sound/red_sound.mp3'))
})
app.get('/off_sound',(req,res)=>{
	res.sendFile(path.join(__dirname + '/sound/off_sound.mp3'))
})


console.log('server opended')
app.listen(8080)