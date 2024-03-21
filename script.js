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

    // Vector operations
    add(other) {
        return new Color(this.r + other.r, this.g + other.g, this.b + other.b);
    }

    subtract(other) {
        return new Color(this.r - other.r, this.g - other.g, this.b - other.b);
    }

    multiply(other) {
        return new Color(this.r * other.r, this.g * other.g, this.b * other.b);
    }

    divide(other) {
        return new Color(this.r / other.r, this.g / other.g, this.b / other.b);
    }

    // Scalar operations
    multiplyScalar(scalar) {
        return new Color(this.r * scalar, this.g * scalar, this.b * scalar);
    }

    divideScalar(scalar) {
        return new Color(this.r / scalar, this.g / scalar, this.b / scalar);
    }

    // Other operations
    // Floor
    floor() {
        return new Color(Math.floor(this.r), Math.floor(this.g), Math.floor(this.b));
    }

    // Ceil
    ceil() {
        return new Color(Math.ceil(this.r), Math.ceil(this.g), Math.ceil(this.b));
    }

    // Dot product
    dot(other) {
        return this.r * other.r + this.g * other.g + this.b * other.b;
    }

    // Cross product
    cross(other) {
        return new Color(
            this.g * other.b - this.b * other.g,
            this.b * other.r - this.r * other.b,
            this.r * other.g - this.g * other.r
        );
    }

    // Magnitude
    magnitude() {
        return Math.sqrt(this.r * this.r + this.g * this.g + this.b * this.b);
    }

    // Normalize
    normalize() {
        return this.divideScalar(this.magnitude());
    }

    // Clamp
    clamp(min, max) {
        return new Color(
            Math.max(min, Math.min(max, this.r)),
            Math.max(min, Math.min(max, this.g)),
            Math.max(min, Math.min(max, this.b))
        );
    }

    // Remap
    remap(oldMin, oldMax, newMin, newMax) {
        return new Color(
            (this.r - oldMin) / (oldMax - oldMin) * (newMax - newMin) + newMin,
            (this.g - oldMin) / (oldMax - oldMin) * (newMax - newMin) + newMin,
            (this.b - oldMin) / (oldMax - oldMin) * (newMax - newMin) + newMin
        );
    }

    // Lerp
    lerp(other, t) {
        return new Color(
            this.r + (other.r - this.r) * t,
            this.g + (other.g - this.g) * t,
            this.b + (other.b - this.b) * t
        );
    }

    // Slerp
    slerp(other, t) {
        const omega = Math.acos(this.dot(other));
        return this.multiplyScalar(Math.sin((1 - t) * omega)).add(other.multiplyScalar(Math.sin(t * omega))).divideScalar(Math.sin(omega));
    }

    // Equal
    equal(other) {
        return this.r === other.r && this.g === other.g && this.b === other.b;
    }

    // Clone
    clone() {
        return new Color(this.r, this.g, this.b);
    }

    // toString
    toString() {
        return `Color(${this.r}, ${this.g}, ${this.b})`;
    }

    // toArray
    toArray() {
        return [this.r, this.g, this.b];
    }

    // toObject
    toObject() {
        return { r: this.r, g: this.g, b: this.b };
    }

    // toFloat32Array
    toFloat32Array() {
        return new Float32Array(this.toArray());
    }

    // toUint8Array
    toUint8Array() {
        return new Uint8Array(this.toArray().map(x => Math.floor(x * 255)));
    }

    // fromArray
    static fromArray(array) {
        return new Color(array[0], array[1], array[2]);
    }

    // fromObject
    static fromObject(obj) {
        return new Color(obj.r, obj.g, obj.b);
    }

    // fromFloat32Array
    static fromFloat32Array(array) {
        return new Color(array[0], array[1], array[2]);
    }

    // fromUint8Array
    static fromUint8Array(array) {
        return new Color(array[0] / 255, array[1] / 255, array[2] / 255);
    }

    // fromHex
    static fromHex(hex) {
        const r = parseInt(hex.substring(1, 3), 16) / 255;
        const g = parseInt(hex.substring(3, 5), 16) / 255;
        const b = parseInt(hex.substring(5, 7), 16) / 255;
        return new Color(r, g, b);
    }

    // random
    static random() {
        return new Color(Math.random(), Math.random(), Math.random());
    }

    // lerp
    static lerp(a, b, t) {
        return a.lerp(b, t);
    }

    // slerp
    static slerp(a, b, t) {
        return a.slerp(b, t);
    }

    // equal
    static equal(a, b) {
        return a.equal(b);
    }

    // toString
    static toString(color) {
        return color.toString();
    }

    // toArray
    static toArray(color) {
        return color.toArray();
    }

    // toObject
    static toObject(color) {
        return color.toObject();
    }

    // toFloat32Array
    static toFloat32Array(color) {
        return color.toFloat32Array();
    }

    // toUint8Array
    static toUint8Array(color) {
        return color.toUint8Array();
    }

    // fromArray
    static fromArray(array) {
        return Color.fromArray(array);
    }

    // fromObject
    static fromObject(obj) {
        return Color.fromObject(obj);
    }

    // fromFloat32Array
    static fromFloat32Array(array) {
        return Color.fromFloat32Array(array);
    }

    // fromUint8Array
    static fromUint8Array(array) {
        return Color.fromUint8Array(array);
    }

    // fromHex
    static fromHex(hex) {
        return Color.fromHex(hex);
    }

    // random
    static random() {
        return Color.random();
    }

    // lerp
    static lerp(a, b, t) {
        return Color.lerp(a, b, t);
    }

    // slerp
    static slerp(a, b, t) {
        return Color.slerp(a, b, t);
    }

    // equal
    static equal(a, b) {
        return Color.equal(a, b);
    }

    // TODO: this is not as simple as this.
    // will have to work on this a bit more later...
    getLuminance() {
        return 0.299 * this.r + 0.587 * this.g + 0.114 * this.b;
    }

}

const checkerLookup = [
    new Color(115, 82, 68),
    new Color(194, 150, 130),
    new Color(98, 122, 157),
    new Color(87, 108, 67),
    new Color(133, 128, 177),
    new Color(103, 189, 170),
    new Color(214, 126, 44),
    new Color(80, 91, 166),
    new Color(193, 90, 99),
    new Color(94, 60, 108),
    new Color(157, 188, 64),
    new Color(224, 163, 46),
    new Color(56, 61, 150),
    new Color(70, 148, 73),
    new Color(175, 54, 60),
    new Color(231, 199, 31),
    new Color(187, 86, 149),
    new Color(8, 133, 161),
    new Color(243, 243, 242),
    new Color(200, 200, 200),
    new Color(160, 160, 160),
    new Color(122, 122, 121),
    new Color(85, 85, 85),
    new Color(52, 52, 52),
];

// Global variable for LUT data
// TODO: This should be encapsulated in an object
let lutData = [];
let lutSize = 0;
let lutTitle = "";

const channels = {
    l: true,
    r: true,
    g: true,
    b: true,
}

// Identifiers for elements
const uploadInput = document.getElementById('file-upload');
const canvasRamp = document.getElementById('ramp');
const ctxRamp = canvasRamp.getContext('2d');
const canvasPreview = document.getElementById('preview');
const ctxPreview = canvasPreview.getContext('2d');
const elTitle = document.getElementById('lut-title');
const elSize = document.getElementById('lut-size');
const colorPatches = document.querySelectorAll('.color-patch');

const luma_btn = document.getElementById('luma-button');
const red_btn = document.getElementById('red-button');
const green_btn = document.getElementById('green-button');
const blue_btn = document.getElementById('blue-button');

luma_btn.addEventListener('click', () => {
    channels.l = !channels.l;
    luma_btn.classList.toggle('active');
    displayLUT();
});

red_btn.addEventListener('click', () => {
    channels.r = !channels.r;
    red_btn.classList.toggle('active');
    displayLUT();
});

green_btn.addEventListener('click', () => {
    channels.g = !channels.g;
    green_btn.classList.toggle('active');
    displayLUT();
});

blue_btn.addEventListener('click', () => {
    channels.b = !channels.b;
    blue_btn.classList.toggle('active');
    displayLUT();
});

const testImage = new Image();
testImage.src = 'assets/images/lut_test_fullgradient.png';
testImage.onload = function () {
    ctxPreview.drawImage(testImage, 0, 0, canvasPreview.width, canvasPreview.height);
}

// Event listeners
uploadInput.addEventListener('change', handleFileUpload);
canvasRamp.addEventListener('click', displayCoordinates);

function displayCoordinates() { }

drawGrid();

function calcCheckerColors(checker) {
    checker.forEach((el, index) => {
        el.style.backgroundColor = `rgb(${findLUTOutput(checkerLookup[index].divideScalar(255)).multiplyScalar(255).toArray().join(',')})`;
        console.log(findLUTOutput(checkerLookup[index].divideScalar(255)).multiplyScalar(255).toArray().join(',') + " " + checkerLookup[index].toArray().join(','));
    });
}

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

            // Display LUT title and size
            elTitle.textContent = lutTitle;
            elSize.textContent = lutSize;

            const imgData = ctxPreview.getImageData(0, 0, canvasPreview.width, canvasPreview.height).data;
            // Apply lut to image data
            for (let i = 0; i < imgData.length; i += 4) {
                const color = new Color(imgData[i] / 255, imgData[i + 1] / 255, imgData[i + 2] / 255);
                const output = findLUTOutput(color);
                imgData[i] = output.r * 255;
                imgData[i + 1] = output.g * 255;
                imgData[i + 2] = output.b * 255;
            }
            ctxPreview.putImageData(new ImageData(imgData, canvasPreview.width, canvasPreview.height), 0, 0);

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
            lutTitle = line.split(' ').slice(1).join(' ').replace(/"/g, '');
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
    calcCheckerColors(colorPatches);
    return lutData;
}

// TODO: cache the curve data until new upload
function displayLUT() {
    const ctx = canvasRamp.getContext('2d');
    const width = canvasRamp.width;
    const height = canvasRamp.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();

    // Draw grid
    drawGrid();

    const xCoords = [];
    const yRCoords = [];
    const yGCoords = [];
    const yBCoords = [];
    const yLCoords = [];

    for (let i = 0; i <= 255; i += 255 / 255) {
        const output = findLUTOutput(new Color(i / 255, i / 255, i / 255));
        const x = i * (width / 256);
        const yR = height - output.r * height;
        const yG = height - output.g * height;
        const yB = height - output.b * height;

        xCoords.push(x);
        yRCoords.push(yR);
        yGCoords.push(yG);
        yBCoords.push(yB);
        yLCoords.push(height - output.getLuminance() * height);
    }

    // TODO: can be a single loop
    // maybe even along with the above for loop...

    // Red curve
    if (channels.r) {
        ctx.beginPath();
        ctx.moveTo(0, yRCoords[0]);
        for (let i = 1; i < xCoords.length; i++) {
            if (yRCoords[i] <= 0) console.log(yRCoords[i]);
            ctx.lineTo(xCoords[i], yRCoords[i]);
            // ctx.arc(xCoords[i], yRCoords[i], 3, 0, 2 * Math.PI, false);
        }
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }

    // Green curve
    if (channels.g) {
        ctx.beginPath();
        ctx.moveTo(0, yGCoords[0]);
        for (let i = 1; i < xCoords.length; i++) {
            ctx.lineTo(xCoords[i], yGCoords[i]);
            // ctx.arc(xCoords[i], yGCoords[i], 3, 0, 2 * Math.PI, false);
        }
        ctx.strokeStyle = 'green';
        ctx.stroke();
    }

    // Blue curve
    if (channels.b) {
        ctx.beginPath();
        ctx.moveTo(0, yBCoords[0]);
        for (let i = 1; i < xCoords.length; i++) {
            ctx.lineTo(xCoords[i], yBCoords[i]);
            // ctx.arc(xCoords[i], yBCoords[i], 3, 0, 2 * Math.PI, false);
        }
        ctx.strokeStyle = 'blue';
        ctx.stroke();
    }

    // Luminance curve
    if (channels.l) {
        ctx.beginPath();
        ctx.moveTo(0, yLCoords[0]);
        for (let i = 1; i < xCoords.length; i++) {
            ctx.lineTo(xCoords[i], yLCoords[i]);
            // ctx.arc(xCoords[i], yBCoords[i], 3, 0, 2 * Math.PI, false);
        }
        ctx.strokeStyle = 'gray';
        ctx.stroke();
    }

}

function findLUTOutput(input) {
    // Map color to domain [0, 1]
    const domainColor = input.remap(0, 1, 0, 1);

    // Map to grid units
    const gridColor = domainColor.multiplyScalar(lutSize - 1);

    // Interpolate
    // tetraInterp(gridColor);
    // const interpColor = trilerp(gridColor);
    const interpColor = tetraInterp(gridColor);

    return interpColor;
}

// Trilinear interpolation
// xyz > bgr
function trilerp(input) {
    const x_floor = Math.floor(input.b);
    const y_floor = Math.floor(input.g);
    const z_floor = Math.floor(input.r);

    const x_ceil = Math.ceil(input.b);
    const y_ceil = Math.ceil(input.g);
    const z_ceil = Math.ceil(input.r);

    // Calculate weights for each dimension based on distance normalized
    const u = (x_floor == x_ceil) ? 0.0 : (input.b - x_floor) / (x_ceil - x_floor);
    const v = (y_floor == y_ceil) ? 0.0 : (input.g - y_floor) / (y_ceil - y_floor);
    const w = (z_floor == z_ceil) ? 0.0 : (input.r - z_floor) / (z_ceil - z_floor);

    // Find points of the cube
    const p000 = lutData[(x_floor * lutSize + y_floor) * lutSize + z_floor];
    const p001 = lutData[(x_floor * lutSize + y_floor) * lutSize + z_ceil];
    const p010 = lutData[(x_floor * lutSize + y_ceil) * lutSize + z_floor];
    const p011 = lutData[(x_floor * lutSize + y_ceil) * lutSize + z_ceil];
    const p100 = lutData[(x_ceil * lutSize + y_floor) * lutSize + z_floor];
    const p101 = lutData[(x_ceil * lutSize + y_floor) * lutSize + z_ceil];
    const p110 = lutData[(x_ceil * lutSize + y_ceil) * lutSize + z_floor];
    const p111 = lutData[(x_ceil * lutSize + y_ceil) * lutSize + z_ceil];

    // Lerp along x-axis
    const px00 = p000.lerp(p100, u);
    const px01 = p001.lerp(p101, u);
    const px10 = p010.lerp(p110, u);
    const px11 = p011.lerp(p111, u);

    // Lerp along y-axis
    const pxy0 = px00.lerp(px10, v);
    const pxy1 = px01.lerp(px11, v);

    // Lerp along z-axis
    return pxy0.lerp(pxy1, w);
}

function calcCornerIndex(R, G, B, size) {
    return (B * size * size) + (G * size) + R;
}

function tetraInterp(input) {
    const matrixT1 = math.matrix([
        [1, 0, 0, 0, 0, 0, 0, 0],
        [-1, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, -1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, -1, 1]
    ]);

    const matrixT2 = math.matrix([
        [1, 0, 0, 0, 0, 0, 0, 0],
        [-1, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, -1, 0, 1],
        [0, 0, 0, 0, -1, 1, 0, 0]
    ]);

    const matrixT3 = math.matrix([
        [1, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, -1, 0, 1],
        [-1, 1, 0, 0, 0, 0, 0, 0]
    ]);

    const matrixT4 = math.matrix([
        [1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, -1, 0, 0, 0, 1, 0],
        [-1, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, -1, 1]
    ]);

    const matrixT5 = math.matrix([
        [1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, -1, 0, 0, 0, 1],
        [-1, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, -1, 1, 0, 0, 0, 0]
    ]);

    const matrixT6 = math.matrix([
        [1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, -1, 0, 0, 0, 1],
        [0, -1, 0, 1, 0, 0, 0, 0],
        [-1, 1, 0, 0, 0, 0, 0, 0]
    ]);

    const R0 = Math.floor(input.r);
    const G0 = Math.floor(input.g);
    const B0 = Math.floor(input.b);

    const R1 = Math.ceil(input.r);
    const G1 = Math.ceil(input.g);
    const B1 = Math.ceil(input.b);

    const delta_r = (R0 == R1) ? 0.0 : (input.r - R0) / (R1 - R0);
    const delta_g = (G0 == G1) ? 0.0 : (input.g - G0) / (G1 - G0);
    const delta_b = (B0 == B1) ? 0.0 : (input.b - B0) / (B1 - B0);

    const delta_t = math.matrix([1, delta_b, delta_r, delta_g]);

    const Vr = math.matrix([
        lutData[calcCornerIndex(R0, G0, B0, lutSize)].getChannel(0),
        lutData[calcCornerIndex(R0, G1, B0, lutSize)].getChannel(0),
        lutData[calcCornerIndex(R1, G0, B0, lutSize)].getChannel(0),
        lutData[calcCornerIndex(R1, G1, B0, lutSize)].getChannel(0),
        lutData[calcCornerIndex(R0, G0, B1, lutSize)].getChannel(0),
        lutData[calcCornerIndex(R0, G1, B1, lutSize)].getChannel(0),
        lutData[calcCornerIndex(R1, G0, B1, lutSize)].getChannel(0),
        lutData[calcCornerIndex(R1, G1, B1, lutSize)].getChannel(0),
    ]);

    const Vg = math.matrix([
        lutData[calcCornerIndex(R0, G0, B0, lutSize)].getChannel(1),
        lutData[calcCornerIndex(R0, G1, B0, lutSize)].getChannel(1),
        lutData[calcCornerIndex(R1, G0, B0, lutSize)].getChannel(1),
        lutData[calcCornerIndex(R1, G1, B0, lutSize)].getChannel(1),
        lutData[calcCornerIndex(R0, G0, B1, lutSize)].getChannel(1),
        lutData[calcCornerIndex(R0, G1, B1, lutSize)].getChannel(1),
        lutData[calcCornerIndex(R1, G0, B1, lutSize)].getChannel(1),
        lutData[calcCornerIndex(R1, G1, B1, lutSize)].getChannel(1),
    ]);

    const Vb = math.matrix([
        lutData[calcCornerIndex(R0, G0, B0, lutSize)].getChannel(2),
        lutData[calcCornerIndex(R0, G1, B0, lutSize)].getChannel(2),
        lutData[calcCornerIndex(R1, G0, B0, lutSize)].getChannel(2),
        lutData[calcCornerIndex(R1, G1, B0, lutSize)].getChannel(2),
        lutData[calcCornerIndex(R0, G0, B1, lutSize)].getChannel(2),
        lutData[calcCornerIndex(R0, G1, B1, lutSize)].getChannel(2),
        lutData[calcCornerIndex(R1, G0, B1, lutSize)].getChannel(2),
        lutData[calcCornerIndex(R1, G1, B1, lutSize)].getChannel(2),
    ]);

    // Determine which tetrahedron to use
    let result_red, result_green, result_blue;
    if (delta_b > delta_r && delta_r > delta_g) {
        // t1
        const result = math.multiply(delta_t, matrixT1);
        result_red = math.multiply(result, Vr);
        result_green = math.multiply(result, Vg);
        result_blue = math.multiply(result, Vb);
    } else if (delta_b > delta_g && delta_g > delta_r) {
        // t2
        const result = math.multiply(delta_t, matrixT2);
        result_red = math.multiply(result, Vr);
        result_green = math.multiply(result, Vg);
        result_blue = math.multiply(result, Vb);
    } else if (delta_g > delta_b && delta_b > delta_r) {
        // t3
        const result = math.multiply(delta_t, matrixT3);
        result_red = math.multiply(result, Vr);
        result_green = math.multiply(result, Vg);
        result_blue = math.multiply(result, Vb);
    } else if (delta_r > delta_b && delta_b > delta_g) {
        // t4
        const result = math.multiply(delta_t, matrixT4);
        result_red = math.multiply(result, Vr);
        result_green = math.multiply(result, Vg);
        result_blue = math.multiply(result, Vb);
    } else if (delta_r > delta_g && delta_g > delta_b) {
        // t5
        const result = math.multiply(delta_t, matrixT5);
        result_red = math.multiply(result, Vr);
        result_green = math.multiply(result, Vg);
        result_blue = math.multiply(result, Vb);
    } else {
        // t6
        const result = math.multiply(delta_t, matrixT6);
        result_red = math.multiply(result, Vr);
        result_green = math.multiply(result, Vg);
        result_blue = math.multiply(result, Vb);
    }

    return new Color(result_red, result_green, result_blue);
}

function drawGrid() {
    const width = canvasRamp.width;
    const height = canvasRamp.height;

    ctxRamp.clearRect(0, 0, width, height);

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

    ctxRamp.strokeStyle = "rgba(179, 144, 41, 0.5)";
    ctxRamp.stroke();
}

function calcLuminance(color) {
    return 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
}