/** @type {CanvasRenderingContext2D} */
const ctx = myCanvas.getContext("2d");

const slider = document.getElementById("numOfSamples");
let numOfSamples = slider.value;

const side = Math.min(window.innerHeight, window.innerWidth);

let height = myCanvas.height = side;
let width = myCanvas.width = side;

let h = height / 2;
let k = width / 2;

ctx.beginPath();
ctx.arc(h, k, width / 2, 0, 2 * Math.PI);
ctx.lineWidth = 2;
ctx.stroke();
ctx.closePath();

slider.addEventListener("input", () => {
	numOfSamples = slider.value;

    document.getElementById("numOfSamplesValue").innerText = numOfSamples;

	ctx.clearRect(0, 0, width, height);

	ctx.beginPath();
	ctx.arc(h, k, width / 2, 0, 2 * Math.PI);
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.closePath();

	let countIn = 0;

	for (let i = 0; i < numOfSamples; i++) {
		x = Math.random() - 0.5;
		y = Math.random() - 0.5;

		ctx.beginPath();
		ctx.arc(h + x * height, k + y * width, 1, 0, 2 * Math.PI);

		if (x * x + y * y < 0.25) {
			ctx.fillStyle = "red";
			countIn++;
		} else if (x * x + y * y > 0.25) {
			ctx.fillStyle = "blue";
		} else {
			ctx.fillStyle = "black";
		}

		ctx.fill();
		ctx.closePath();
	}

    insideInfo.innerText = countIn;
    outsideInfo.innerText = numOfSamples - countIn;

	result.innerText = 4 * countIn / numOfSamples;
});

window.addEventListener("resize", () => {
	const side = Math.min(window.innerHeight, window.innerWidth);

	height = myCanvas.height = side;
	width = myCanvas.width = side;

	h = height / 2;
	k = width / 2;

	ctx.beginPath();
	ctx.arc(h, k, width / 2, 0, 2 * Math.PI);
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.closePath();

	slider.dispatchEvent(new Event("input"));
});