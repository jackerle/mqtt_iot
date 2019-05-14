var express  = require('express')
var app = express()
var path = require('path')
var mqtt_handle = require('./lib/mqtt_handle')









app.use('/view', express.static(__dirname + '/view'))
app.get('/index',(req,res)=>{
	res.sendFile(path.join(__dirname + '/view/index.html'))
})

app.get('/green',(req,res)=>{
		console.log(req.method)
		mqtt_handle.mqtt_green()
		res.redirect('back')
})

app.get('/off',(req,res)=>{
	console.log(req.method)
	mqtt_handle.mqtt_off()
	res.redirect('back')
})

app.get('/red',(req,res)=>{
	console.log(req.method)
	mqtt_handle.mqtt_red()
	res.redirect('back')
})

app.get('/blue',(req,res)=>{
	console.log(req.method)
	mqtt_handle.mqtt_blue()
	res.redirect('back')
})


console.log('server opended')
app.listen(8080)