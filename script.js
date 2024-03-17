class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.channels = [r, g, b];
    }

    getChannel(channel) {
        return this.channels[channel];
    }
}

// Global variable for LUT data
// TODO: This should be encapsulated in an object
let lutData = [];
let lutSize = 0;
let lutTitle = "";

// Identifiers for elements
const uploadInput = document.getElementById('file-upload');
const canvasRamp = document.getElementById('ramp');
const ctxRamp = canvasRamp.getContext('2d');

// Event listeners
uploadInput.addEventListener('change', handleFileUpload);

drawGrid();

function handleFileUpload() {
    const file = uploadInput.files[0];

    if (file) {
        // Clear the LUT data
        lutData = [];
        lutSize = 0;

        const reader = new FileReader();
        reader.onload = function (e) {
            const content = e.target.result;
            lutData = parseLUTData(content);

        }
        reader.readAsText(file);
    }
}

function parseLUTData(content) {
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.length === 0 || line[0] === '#') continue;

        if (line.split(' ')[0].toLowerCase() === "title") {
            // Get the title of the LUT
            const title = line.split(' ').slice(1).join(' ').replace(/"/g, '');
            console.log("LUT Title: " + title);
            continue;
        }

        // Check if this is the line for size
        // using toLowerCase in case the file has different capitalization
        if (line.split(' ')[0].toLowerCase() === "lut_3d_size") {
            lutSize = parseInt(line.split(' ')[1]);
            continue;
        }

        // Check if this is a line for LUT data
        if (line[0] !== 'L' && line[0] !== 'T' && line[0] !== 'D') {
            const values = line.split(' ');
            const r = parseFloat(values[0]);
            const g = parseFloat(values[1]);
            const b = parseFloat(values[2]);
            lutData.push(new Color(r, g, b));
        }
    }
    lutSize = Math.cbrt(lutData.length);

    displayLUT();
    return lutData;
}

// TODO: cache the curve data until new upload
function displayLUT() {
    const ctx = canvasRamp.getContext('2d');
    const width = canvasRamp.width;
    const height = canvasRamp.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    drawGrid();

    const xCoords = [];
    const yRCoords = [];
    const yGCoords = [];
    const yBCoords = [];

    for (let i = 0; i <= 255; i += 255 / lutSize) {
        const output = findLUTOutput(new Color(i / 255, i / 255, i / 255));
        const x = i * (width / 256);
        const yR = height - output.r * height;
        const yG = height - output.g * height;
        const yB = height - output.b * height;

        xCoords.push(x);
        yRCoords.push(yR);
        yGCoords.push(yG);
        yBCoords.push(yB);
    }

    // Red curve
    ctx.beginPath();
    ctx.moveTo(0, yRCoords[0]);
    for (let i = 1; i < xCoords.length; i++) {
        ctx.lineTo(xCoords[i], yRCoords[i]);
        ctx.arc(xCoords[i], yRCoords[i], 3, 0, 2 * Math.PI, false);
    }
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Green curve
    ctx.beginPath();
    ctx.moveTo(0, yGCoords[0]);
    for (let i = 1; i < xCoords.length; i++) {
        ctx.lineTo(xCoords[i], yGCoords[i]);
        ctx.arc(xCoords[i], yGCoords[i], 3, 0, 2 * Math.PI, false);
    }
    ctx.strokeStyle = 'green';
    ctx.stroke();

    // Blue curve
    ctx.beginPath();
    ctx.moveTo(0, yBCoords[0]);
    for (let i = 1; i < xCoords.length; i++) {
        ctx.lineTo(xCoords[i], yBCoords[i]);
        ctx.arc(xCoords[i], yBCoords[i], 3, 0, 2 * Math.PI, false);
    }
    ctx.strokeStyle = 'blue';
    ctx.stroke();

}

function findLUTOutput(input) {
    // Map to domain [0, 1]
    const r = (input.r - 0.0) / (1.0 - 0.0);
    const g = (input.g - 0.0) / (1.0 - 0.0);
    const b = (input.b - 0.0) / (1.0 - 0.0);

    // Map to grid units
    const rIndex = r * (lutSize - 1);
    const gIndex = g * (lutSize - 1);
    const bIndex = b * (lutSize - 1);

    // Interpolate
    const rOut = trilerp(bIndex, gIndex, rIndex, 0);
    const gOut = trilerp(bIndex, gIndex, rIndex, 1);
    const bOut = trilerp(bIndex, gIndex, rIndex, 2);

    return new Color(rOut, gOut, bOut);
}

function trilerp(x, y, z, channel) {
    const x_floor = Math.floor(x);
    const y_floor = Math.floor(y);
    const z_floor = Math.floor(z);

    const x_ceil = Math.ceil(x);
    const y_ceil = Math.ceil(y);
    const z_ceil = Math.ceil(z);

    // Calculate weights for each dimension based on distance normalized
    const u = (x_floor == x_ceil) ? 0.0 : (x - x_floor) / (x_ceil - x_floor);
    const v = (y_floor == y_ceil) ? 0.0 : (y - y_floor) / (y_ceil - y_floor);
    const w = (z_floor == z_ceil) ? 0.0 : (z - z_floor) / (z_ceil - z_floor);

    // Interpolate
    const p000 = lutData[(x_floor * lutSize + y_floor) * lutSize + z_floor].getChannel(channel);
    const p001 = lutData[(x_floor * lutSize + y_floor) * lutSize + z_ceil].getChannel(channel);
    const p010 = lutData[(x_floor * lutSize + y_ceil) * lutSize + z_floor].getChannel(channel);
    const p011 = lutData[(x_floor * lutSize + y_ceil) * lutSize + z_ceil].getChannel(channel);
    const p100 = lutData[(x_ceil * lutSize + y_floor) * lutSize + z_floor].getChannel(channel);
    const p101 = lutData[(x_ceil * lutSize + y_floor) * lutSize + z_ceil].getChannel(channel);
    const p110 = lutData[(x_ceil * lutSize + y_ceil) * lutSize + z_floor].getChannel(channel);
    const p111 = lutData[(x_ceil * lutSize + y_ceil) * lutSize + z_ceil].getChannel(channel);

    // Along x-axis
    const px00 = p000 + (p100 - p000) * u;
    const px01 = p001 + (p101 - p001) * u;
    const px10 = p010 + (p110 - p010) * u;
    const px11 = p011 + (p111 - p011) * u;

    // Along y-axis
    const pxy0 = px00 + (px10 - px00) * v;
    const pxy1 = px01 + (px11 - px01) * v;

    // Along z-axis
    return pxy0 + (pxy1 - pxy0) * w;
}

function drawGrid() {
    const width = canvasRamp.width;
    const height = canvasRamp.height;

    const steps = 4;
    const stepSizeH = width / steps;
    const stepSizeV = height / steps;

    ctxRamp.beginPath();
    ctxRamp.moveTo(0, height);
    ctxRamp.lineTo(width, 0);

    ctxRamp.moveTo(stepSizeH, 0);
    for (let i = 1; i < steps; i++) {
        ctxRamp.lineTo(stepSizeH * i, height);
        ctxRamp.moveTo(stepSizeH * (i + 1), 0);
    }

    ctxRamp.moveTo(0, stepSizeV);
    for (let i = 1; i < steps; i++) {
        ctxRamp.lineTo(width, stepSizeV * i);
        ctxRamp.moveTo(0, stepSizeV * (i + 1));
    }

    ctxRamp.strokeStyle = "rgba(255,255,255,0.1)";
    ctxRamp.stroke();
}