if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', afterLoaded);
} else {
    //The DOMContentLoaded event has already fired. Just run the code.
    afterLoaded();
}

function afterLoaded() {
    //Your initialization code goes here. This is from where your code should start
    //  running if it wants to access elements placed in the DOM by your HTML files.
    //  If you are wanting to access DOM elements inserted by JavaScript, you may need
    //  to delay more, or use a MutationObserver to see when they are inserted.
    const MODEL_URL = '/models'
	// var Canvas = require('canvas');

	var canvas = document.getElementById("myCanvas");

	// console.log(canvas)
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx=canvas.getContext("2d");
    // ctx.drawImage(document.getElementById('myImage'),0,0);

    var img = document.getElementById("myImage");

	 
	//the x coordinates
	var x = 0;
	 
	//the y coordinates
	var y = 0;
	 
	//When our image has loaded.
	img.onload = function(){
	    //Draw the image onto the canvas.
	    ctx.drawImage(img, x, y);
	}

	async function hello(){
		
		const minProbability = 0.05
		await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
		await faceapi.loadFaceLandmarkModel(MODEL_URL)
		await faceapi.loadFaceRecognitionModel(MODEL_URL)
		await faceapi.loadFaceExpressionModel(MODEL_URL)
		await faceapi.loadAgeGenderModel(MODEL_URL)

		const input = document.getElementById('myImage')
		let fullFaceDescriptions = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors().withFaceExpressions().withAgeAndGender();
		// fullFaceDescriptions = faceapi.resizeResults(fullFaceDescriptions)
		faceapi.draw.drawDetections(canvas, fullFaceDescriptions)
		// faceapi.draw.drawFaceLandmarks(canvas, fullFaceDescriptions)
		faceapi.draw.drawFaceExpressions(canvas, fullFaceDescriptions, minProbability)
		// faceapi.draw.drawContour(canvas, fullFaceDescriptions)


		// return mobile
		// console.log(fullFaceDescriptions)
		console.log(fullFaceDescriptions[0]['gender'], fullFaceDescriptions[0]['age'])
		var age = Math.round(parseFloat(fullFaceDescriptions[0]['age']))
		console.log(age)

		ctx.fillText("Gender: "+fullFaceDescriptions[0]['gender']+" / "+"Age: "+ age.toString(), 10, 50);

	}

	hello()


}





