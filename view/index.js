green = async function(){
	await fetch("http://127.0.0.1:8080/green")
		.then(result =>{
			document.getElementById("green_audio").play();
			console.log('success')
		})
}

red = async function(){
	await fetch("http://127.0.0.1:8080/red")
		.then(result =>{
			document.getElementById("red_audio").play();
			console.log('success')
		})
	
}

off = async function(){
	await fetch("http://127.0.0.1:8080/off")
		.then(result =>{
			document.getElementById("off_audio").play();
			console.log('success')
		})
}

blue = async function(){
	await fetch("http://127.0.0.1:8080/blue")
		.then(result =>{
			document.getElementById("blue_audio").play();
			console.log('success')
		})
}