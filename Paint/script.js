var canvas = document.getElementById('canvas');
var pencil = document.getElementById('pencil');
var rubber = document.getElementById('rubber');
var myColor = document.getElementById('color');
var line = document.getElementById('line');
var erase = document.getElementById('erase');
var rectangle = document.getElementById('rectangle');
var fill_rectangle = document.getElementById('fill_rectangle');
var circle = document.getElementById('circle');
var fill_circle = document.getElementById('fill_circle');
var image = document.getElementById('file');
var pi = Math.PI;
var size = 15;



var context = canvas.getContext('2d');

document.getElementById('size').oninput = function() {
	document.getElementById('test').innerHTML = this.value;
	size = this.value; 
};

erase.onclick = function() {
	context.clearRect(0, 0, canvas.width, canvas.height)
};

pencil.onclick = function() {
	canvas.onmousedown = function(event) {
		context.beginPath();
		context.moveTo(event.offsetX, event.offsetY);
		canvas.onmousemove = function(event) {
			var a = event.offsetX;
			var b = event.offsetY;
			context.lineWidth = size;
			context.lineTo(a, b);
			context.strokeStyle = myColor.value;
			context.globalCompositeOperation = "source-over";
			context.stroke();
		};
		canvas.onmouseup = function() {
			canvas.onmousemove = null;

		};
	};
};

rubber.onclick = function() {
	canvas.onmousedown = function(event) {
		context.beginPath();
		context.moveTo(event.offsetX, event.offsetY);
		canvas.onmousemove = function(event) {
			var a = event.offsetX;
			var b = event.offsetY;
			context.lineWidth = size;
			context.lineTo(a, b);
			context.globalCompositeOperation = "destination-out";
			context.stroke();
		};
		canvas.onmouseup = function() {
			canvas.onmousemove = null;
			canvas.onmousedown = null;
		};
	};
};

// line.onclick = function() {
// 	canvas.onmousedown = function(event) {
// 		context.beginPath();
// 		context.moveTo(event.offsetX, event.offsetY);
// 		context.lineWidth = size;
// 		context.strokeStyle = myColor.value;
// 		var a = event.offsetX;
// 			var b = event.offsetY;
// 			context.lineTo(a, b);
// 			context.stroke();

// 		canvas.onmouseup = function(event) {
			
// 		};
// 	};
// };

line.onclick = function() {
	
	canvas.onclick = function(event) {

		var a = event.offsetX;
		var b = event.offsetY;
		context.beginPath();
		canvas.style.cursor = "crosshair";
		
	canvas.onclick = function(event) {
		var x = event.offsetX;
		var y = event.offsetY;
					context.moveTo(a, b)
					context.lineWidth = size;
					context.strokeStyle = myColor.value;
					context.lineTo(x , y);
					context.globalCompositeOperation = "source-over";
					context.stroke();
					canvas.onclick = null;
			}
		}
	};

rectangle.onclick = function() {
	
	canvas.onclick = function(event) {
		var a = event.offsetX;
		var b = event.offsetY;
		context.beginPath();
		canvas.style.cursor = "crosshair";
	canvas.onclick = function(event) {
		var x = event.offsetX;
		var y = event.offsetY;
		var hauteur = b - y;
		var largeur = a - x;
		context.lineWidth = size;
		context.strokeStyle = myColor.value;
		context.rect(x, y, largeur, hauteur);
		context.globalCompositeOperation = "source-over";
		context.stroke();
		canvas.onclick = null;
			}
		}
	};

fill_rectangle.onclick = function() {
	event.preventDefault();
		canvas.onclick = function(event) {
			var a = event.offsetX;
			var b = event.offsetY;
			context.beginPath();
			canvas.style.cursor = "crosshair";
		canvas.onclick = function(event) {
			var x = event.offsetX;
			var y = event.offsetY;
			var hauteur = b - y;
			var largeur = a - x;
			context.lineWidth = size;
			context.fillStyle = myColor.value;
			context.rect(x, y, largeur, hauteur);
			context.globalCompositeOperation = "source-over";
			context.fill();
			canvas.onclick = null;
				}
			}
		};


circle.onclick = function() {
	event.preventDefault();
	canvas.onclick = function(event) {
		var a = event.offsetX;
		var b = event.offsetY;
		canvas.style.cursor = "crosshair";
		canvas.onclick = function(event) {
			var x = event.offsetX;
			var y = event.offsetY;
			context.lineWidth = size;
			context.strokeStyle = myColor.value;
			context.beginPath();
			var radius = Math.pow(Math.pow(x - a, 2) + Math.pow(y - b, 2), 0.5);
			context.arc(a, b, radius, 0, 2 * pi);
			context.globalCompositeOperation = "source-over";
			context.stroke();
			canvas.onclick = null;
		}
	}
};

fill_circle.onclick = function() {
	event.preventDefault();
	canvas.onclick = function(event) {
		var a = event.offsetX;
		var b = event.offsetY;
		canvas.style.cursor = "crosshair";
		canvas.onclick = function(event) {
			var x = event.offsetX;
			var y = event.offsetY;
			context.beginPath();
			context.lineWidth = size;
			var radius = Math.pow(Math.pow(x - a, 2) + Math.pow(y - b, 2), 0.5);
			context.arc(a, b, radius, 0, 2 * pi);
			context.fillStyle = myColor.value;
			context.globalCompositeOperation = "source-over";
			context.fill();
			canvas.onclick = null;
		}
	}
};


saveImage = function(event) {
	var image = canvas.toDataURL('image/jpg');
	event.href = image;
};

image.addEventListener('change', handleImage, false);

function handleImage(event) {
	var reader = new FileReader();
	reader.onload = function(event){
		var img = new Image();
		img.onload = function(){
			context.drawImage(img, 0, 0);
		}
		img.src = event.target.result; 
	}
	reader.readAsDataURL(event.target.files[0]);
}