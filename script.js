import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GammaCorrectionShader } from 'three/addons/shaders/GammaCorrectionShader.js';
import { DataTexture } from 'three';

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
    [115, 82, 68],
    [194, 150, 130],
    [98, 122, 157],
    [87, 108, 67],
    [133, 128, 177],
    [103, 189, 170],
    [214, 126, 44],
    [80, 91, 166],
    [193, 90, 99],
    [94, 60, 108],
    [157, 188, 64],
    [224, 163, 46],
    [56, 61, 150],
    [70, 148, 73],
    [175, 54, 60],
    [231, 199, 31],
    [187, 86, 149],
    [8, 133, 161],
    [243, 243, 242],
    [200, 200, 200],
    [160, 160, 160],
    [122, 122, 121],
    [85, 85, 85],
    [52, 52, 52],
];

// Settings, constants...
const TAU = 2 * Math.PI;
const POINT_BASE_COUNT = 20;
const POINT_SIZE = 0.2;

let state = {
    threejs: {
        scene: {},
        camera: {},
        controls: {},
        renderer: {}
    },
    file: {
        is_changed: true
    },
    lut: {
        data: [],
        size: 0,
        name: "",
        is_valid: false,
        component_size: 3
    },
    preview_img: {
        data: [],
        scene: {},
        camera: {},
        renderer: {},
        composer: {},
        lut_pass: {}
    }
};

const LOG_LEVEL = Object.freeze({
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3
});

const set_log_level = LOG_LEVEL.DEBUG;

function log(msg, level) {
    if (level > set_log_level) {
        return;
    }

    switch (level) {
        case LOG_LEVEL.ERROR: {
            console.error(`[ERROR]: ${msg}`);
        } break;
        case LOG_LEVEL.WARN: {
            console.warn(`[WARNING]: ${msg}`);
        } break;
        case LOG_LEVEL.INFO: {
            console.info(`[INFO]: ${msg}`);
        } break;
        case LOG_LEVEL.DEBUG: {
            console.debug(`[DEBUG]: ${msg}`);
        }
    }
}

// Remap
// TODO: Add comment and make it work with both arrays
// and regular numbers.
function remap_color(color, oldMin, oldMax, newMin, newMax) {
    return [
        (color[0] - oldMin) / (oldMax - oldMin) * (newMax - newMin) + newMin,
        (color[1] - oldMin) / (oldMax - oldMin) * (newMax - newMin) + newMin,
        (color[2] - oldMin) / (oldMax - oldMin) * (newMax - newMin) + newMin
    ];
}

function mul_scalar(color, scalar) {
    return [color[0] * scalar, color[1] * scalar, color[2] * scalar];
}

// TODO: this is not as simple as this.
// will have to work on this a bit more later...
function calc_luminance(color) {
    return 0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2];
}

function init_threejs() {
    state.threejs.scene = new THREE.Scene();
    state.threejs.camera = new THREE.PerspectiveCamera(30, canvas_cube.width / canvas_cube.height, 0.1, 1000);

    state.threejs.renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvas_cube,
    });
    state.threejs.renderer.setSize(canvas_cube.width, canvas_cube.height);

    state.threejs.controls = new OrbitControls(state.threejs.camera, state.threejs.renderer.domElement);
    state.threejs.controls.enablePan = false;

    const point_count = POINT_BASE_COUNT * POINT_BASE_COUNT * POINT_BASE_COUNT;
    const pointSize = POINT_SIZE;
    const offset = pointSize / 16; // NOTE: I'm not sure why 16 works and not 2...
    const scaleFactor = 1 + offset;
    const p0 = 0 * scaleFactor - offset;
    const p1 = 1 * scaleFactor + offset;

    // Drawing the cube's cage
    const lineGeo = new THREE.BufferGeometry();
    const linePos = new Float32Array([
        // Bottom Square
        p0, p0, p0, p1, p0, p0, // Line 1
        p1, p0, p0, p1, p0, p1, // Line 2
        p1, p0, p1, p0, p0, p1, // Line 3
        p0, p0, p1, p0, p0, p0, // Line 4

        // Top Square (same as bottom but with z = 1)
        p0, p1, p0, p1, p1, p0, // Line 5
        p1, p1, p0, p1, p1, p1, // Line 6
        p1, p1, p1, p0, p1, p1, // Line 7
        p0, p1, p1, p0, p1, p0, // Line 8

        // Connecting Vertical Lines
        p0, p0, p0, p0, p1, p0, // Line 9 
        p1, p0, p0, p1, p1, p0, // Line 10
        p1, p0, p1, p1, p1, p1, // Line 11
        p0, p0, p1, p0, p1, p1  // Line 12
    ]);
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
    lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({ vertexColors: true });
    const cubeCage = new THREE.LineSegments(lineGeo, lineMat);
    state.threejs.scene.add(cubeCage);

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(point_count * 3);
    const colors = new Float32Array(point_count * 3);
    const step = 1 / (POINT_BASE_COUNT - 1);
    let index = 0;
    for (let r = 0; r < POINT_BASE_COUNT; r++) {
        for (let g = 0; g < POINT_BASE_COUNT; g++) {
            for (let b = 0; b < POINT_BASE_COUNT; b++) {
                positions[index * 3] = r * step;
                positions[index * 3 + 1] = g * step;
                positions[index * 3 + 2] = b * step;

                colors[index * 3] = r * step;
                colors[index * 3 + 1] = g * step;
                colors[index * 3 + 2] = b * step;

                index++;
            }
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({ vertexColors: true, size: pointSize });
    const points = new THREE.Points(geometry, material);
    // Add a name so it's easier to get later
    points.name = "lut_points";
    state.threejs.scene.add(points);

    state.threejs.camera.position.z = 5;
    cubeCage.position.set(cubeCage.position.x - 0.5, cubeCage.position.y - 0.5, cubeCage.position.z - 0.5);
    points.position.set(points.position.x - 0.5, points.position.y - 0.5, points.position.z - 0.5);
}

function init_preview_img() {
    state.preview_img.scene = new THREE.Scene();
    state.preview_img.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    state.preview_img.renderer = new THREE.WebGLRenderer({
        canvas: canvas_prev_img
    });


    // state.preview_img.renderer.colorSpace = THREE.SRGBColorSpace;
    // state.preview_img.renderer.toneMapping = THREE.ReinhardToneMapping;

    const geo = new THREE.PlaneGeometry(2, 2);
    const texture = new THREE.TextureLoader().load(
        "assets/images/prev_image2.jpg",
        () => {
            console.log("Image loaded");
            texture.colorSpace = THREE.SRGBColorSpace;
            state.preview_img.renderer.render(state.preview_img.scene, state.preview_img.camera);
        },
        undefined,
        (error) => {
            console.error("Error loading image:", error);
        }
    );
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const plane = new THREE.Mesh(geo, material);

    state.preview_img.scene.add(plane);

    state.preview_img.composer = new EffectComposer(state.preview_img.renderer);
    state.preview_img.composer.addPass(new RenderPass(state.preview_img.scene, state.preview_img.camera));

    const test_lut = [
        1.0, 1.0, 0.0, 1.0,
        1.0, 1.0, 0.0, 1.0,
        1.0, 1.0, 0.0, 1.0
    ];
    const lutSize = 1; // Default placeholder size
    const lutData = new Float32Array(test_lut); // Default placeholder data
    const lut_texture = new THREE.Data3DTexture(lutData, lutSize, lutSize, lutSize);
    lut_texture.format = THREE.RGBAFormat;
    lut_texture.type = THREE.FloatType;
    lut_texture.minFilter = THREE.LinearFilter;
    lut_texture.magFilter = THREE.LinearFilter;
    lut_texture.wrapS = THREE.ClampToEdgeWrapping;
    lut_texture.wrapT = THREE.ClampToEdgeWrapping;
    lut_texture.wrapR = THREE.ClampToEdgeWrapping;
    lut_texture.needsUpdate = true;

    const lut_shader = {
        uniforms: {
            tDiffuse: { value: null },
            lutMap: { value: new THREE.Data3DTexture() },
            lutSize: { value: 0 },
            enabled: { value: false }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D tDiffuse;
            uniform sampler3D lutMap;
            uniform float lutSize;
            uniform bool enabled;
            varying vec2 vUv;

            vec3 calc_corner_coord(float R, float G, float B) {
                return vec3(
                    R / lutSize,
                    G / lutSize,
                    B / lutSize
                );
            }

            vec3 remap_color(vec3 input_color, float old_min, float old_max, float new_min, float new_max) {
                return vec3(
                    (input_color.r - old_min) / (old_max - old_min) * (new_max - new_min) + new_min,
                    (input_color.g - old_min) / (old_max - old_min) * (new_max - new_min) + new_min,
                    (input_color.b - old_min) / (old_max - old_min) * (new_max - new_min) + new_min
                );
            }

            vec3 tetrahedral_interpolation(vec3 input_color) {
                const float matrix_t1[32] = float[32]
                    (1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                    -1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0,
                    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0, 1.0);

                const float matrix_t2[32] = float[32](
                    1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                    -1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 1.0,
                    0.0, 0.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0
                );
            
                const float matrix_t3[32] = float[32](
                    1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                    0.0, -1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0,
                    0.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 1.0,
                    -1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
                );
            
                const float matrix_t4[32] = float[32](
                    1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 1.0, 0.0,
                    -1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0, 1.0
                );
            
                const float matrix_t5[32] = float[32](
                    1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 1.0,
                    -1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, -1.0, 1.0, 0.0, 0.0, 0.0, 0.0
                );
            
                const float matrix_t6[32] = float[32](
                    1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 1.0,
                    0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
                    -1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
                );
            
                float R0 = floor(input_color.r);
                float G0 = floor(input_color.g);
                float B0 = floor(input_color.b);
            
                float R1 = ceil(input_color.r);
                float G1 = ceil(input_color.g);
                float B1 = ceil(input_color.b);

                float delta_r = (R0 == R1) ? 0.0 : (input_color.r - R0) / (R1 - R0);
                float delta_g = (G0 == G1) ? 0.0 : (input_color.g - G0) / (G1 - G0);
                float delta_b = (B0 == B1) ? 0.0 : (input_color.b - B0) / (B1 - B0);
            
                float delta_t[4] = float[4](1.0, delta_b, delta_r, delta_g);
            
                float Vr[8] = float[8](
                    texture(lutMap, calc_corner_coord(R0, G0, B0)).r,
                    texture(lutMap, calc_corner_coord(R0, G1, B0)).r,
                    texture(lutMap, calc_corner_coord(R1, G0, B0)).r,
                    texture(lutMap, calc_corner_coord(R1, G1, B0)).r,
                    texture(lutMap, calc_corner_coord(R0, G0, B1)).r,
                    texture(lutMap, calc_corner_coord(R0, G1, B1)).r,
                    texture(lutMap, calc_corner_coord(R1, G0, B1)).r,
                    texture(lutMap, calc_corner_coord(R1, G1, B1)).r
                );
            
                float Vg[8] = float[8](
                    texture(lutMap, calc_corner_coord(R0, G0, B0)).g,
                    texture(lutMap, calc_corner_coord(R0, G1, B0)).g,
                    texture(lutMap, calc_corner_coord(R1, G0, B0)).g,
                    texture(lutMap, calc_corner_coord(R1, G1, B0)).g,
                    texture(lutMap, calc_corner_coord(R0, G0, B1)).g,
                    texture(lutMap, calc_corner_coord(R0, G1, B1)).g,
                    texture(lutMap, calc_corner_coord(R1, G0, B1)).g,
                    texture(lutMap, calc_corner_coord(R1, G1, B1)).g
                );
            
                float Vb[8] = float[8](
                    texture(lutMap, calc_corner_coord(R0, G0, B0)).b,
                    texture(lutMap, calc_corner_coord(R0, G1, B0)).b,
                    texture(lutMap, calc_corner_coord(R1, G0, B0)).b,
                    texture(lutMap, calc_corner_coord(R1, G1, B0)).b,
                    texture(lutMap, calc_corner_coord(R0, G0, B1)).b,
                    texture(lutMap, calc_corner_coord(R0, G1, B1)).b,
                    texture(lutMap, calc_corner_coord(R1, G0, B1)).b,
                    texture(lutMap, calc_corner_coord(R1, G1, B1)).b
                );
            
                // Determine which tetrahedron to use
                float result_red;
                float result_green;
                float result_blue;

                if (delta_b > delta_r && delta_r > delta_g) {
                    // T1
                    float result[8] = float[8](
                        delta_t[0] * matrix_t1[0] + delta_t[1] * matrix_t1[8] + delta_t[2] * matrix_t1[16] + delta_t[3] * matrix_t1[24],
                        delta_t[0] * matrix_t1[1] + delta_t[1] * matrix_t1[9] + delta_t[2] * matrix_t1[17] + delta_t[3] * matrix_t1[25],
                        delta_t[0] * matrix_t1[2] + delta_t[1] * matrix_t1[10] + delta_t[2] * matrix_t1[18] + delta_t[3] * matrix_t1[26],
                        delta_t[0] * matrix_t1[3] + delta_t[1] * matrix_t1[11] + delta_t[2] * matrix_t1[19] + delta_t[3] * matrix_t1[27],
                        delta_t[0] * matrix_t1[4] + delta_t[1] * matrix_t1[12] + delta_t[2] * matrix_t1[20] + delta_t[3] * matrix_t1[28],
                        delta_t[0] * matrix_t1[5] + delta_t[1] * matrix_t1[13] + delta_t[2] * matrix_t1[21] + delta_t[3] * matrix_t1[29],
                        delta_t[0] * matrix_t1[6] + delta_t[1] * matrix_t1[14] + delta_t[2] * matrix_t1[22] + delta_t[3] * matrix_t1[30],
                        delta_t[0] * matrix_t1[7] + delta_t[1] * matrix_t1[15] + delta_t[2] * matrix_t1[23] + delta_t[3] * matrix_t1[31]
                    );

                    result_red = result[0] * Vr[0] +
                                result[1] * Vr[1] +
                                result[2] * Vr[2] +
                                result[3] * Vr[3] +
                                result[4] * Vr[4] +
                                result[5] * Vr[5] +
                                result[6] * Vr[6] +
                                result[7] * Vr[7];

                    result_green = result[0] * Vg[0] +
                                result[1] * Vg[1] +
                                result[2] * Vg[2] +
                                result[3] * Vg[3] +
                                result[4] * Vg[4] +
                                result[5] * Vg[5] +
                                result[6] * Vg[6] +
                                result[7] * Vg[7];

                    result_blue = result[0] * Vb[0] +
                                result[1] * Vb[1] +
                                result[2] * Vb[2] +
                                result[3] * Vb[3] +
                                result[4] * Vb[4] +
                                result[5] * Vb[5] +
                                result[6] * Vb[6] +
                                result[7] * Vb[7];
                } else if (delta_b > delta_g && delta_g > delta_r) {
                    // T2
                    float result[8] = float[8](
                        delta_t[0] * matrix_t2[0] + delta_t[1] * matrix_t2[8] + delta_t[2] * matrix_t2[16] + delta_t[3] * matrix_t2[24],
                        delta_t[0] * matrix_t2[1] + delta_t[1] * matrix_t2[9] + delta_t[2] * matrix_t2[17] + delta_t[3] * matrix_t2[25],
                        delta_t[0] * matrix_t2[2] + delta_t[1] * matrix_t2[10] + delta_t[2] * matrix_t2[18] + delta_t[3] * matrix_t2[26],
                        delta_t[0] * matrix_t2[3] + delta_t[1] * matrix_t2[11] + delta_t[2] * matrix_t2[19] + delta_t[3] * matrix_t2[27],
                        delta_t[0] * matrix_t2[4] + delta_t[1] * matrix_t2[12] + delta_t[2] * matrix_t2[20] + delta_t[3] * matrix_t2[28],
                        delta_t[0] * matrix_t2[5] + delta_t[1] * matrix_t2[13] + delta_t[2] * matrix_t2[21] + delta_t[3] * matrix_t2[29],
                        delta_t[0] * matrix_t2[6] + delta_t[1] * matrix_t2[14] + delta_t[2] * matrix_t2[22] + delta_t[3] * matrix_t2[30],
                        delta_t[0] * matrix_t2[7] + delta_t[1] * matrix_t2[15] + delta_t[2] * matrix_t2[23] + delta_t[3] * matrix_t2[31]
                    );

                    result_red = result[0] * Vr[0] +
                                result[1] * Vr[1] +
                                result[2] * Vr[2] +
                                result[3] * Vr[3] +
                                result[4] * Vr[4] +
                                result[5] * Vr[5] +
                                result[6] * Vr[6] +
                                result[7] * Vr[7];

                    result_green = result[0] * Vg[0] +
                                result[1] * Vg[1] +
                                result[2] * Vg[2] +
                                result[3] * Vg[3] +
                                result[4] * Vg[4] +
                                result[5] * Vg[5] +
                                result[6] * Vg[6] +
                                result[7] * Vg[7];

                    result_blue = result[0] * Vb[0] +
                                result[1] * Vb[1] +
                                result[2] * Vb[2] +
                                result[3] * Vb[3] +
                                result[4] * Vb[4] +
                                result[5] * Vb[5] +
                                result[6] * Vb[6] +
                                result[7] * Vb[7];
                } else if (delta_g > delta_b && delta_b > delta_r) {
                    // t3
                    float result[8] = float[8](
                        delta_t[0] * matrix_t3[0] + delta_t[1] * matrix_t3[8] + delta_t[2] * matrix_t3[16] + delta_t[3] * matrix_t3[24],
                        delta_t[0] * matrix_t3[1] + delta_t[1] * matrix_t3[9] + delta_t[2] * matrix_t3[17] + delta_t[3] * matrix_t3[25],
                        delta_t[0] * matrix_t3[2] + delta_t[1] * matrix_t3[10] + delta_t[2] * matrix_t3[18] + delta_t[3] * matrix_t3[26],
                        delta_t[0] * matrix_t3[3] + delta_t[1] * matrix_t3[11] + delta_t[2] * matrix_t3[19] + delta_t[3] * matrix_t3[27],
                        delta_t[0] * matrix_t3[4] + delta_t[1] * matrix_t3[12] + delta_t[2] * matrix_t3[20] + delta_t[3] * matrix_t3[28],
                        delta_t[0] * matrix_t3[5] + delta_t[1] * matrix_t3[13] + delta_t[2] * matrix_t3[21] + delta_t[3] * matrix_t3[29],
                        delta_t[0] * matrix_t3[6] + delta_t[1] * matrix_t3[14] + delta_t[2] * matrix_t3[22] + delta_t[3] * matrix_t3[30],
                        delta_t[0] * matrix_t3[7] + delta_t[1] * matrix_t3[15] + delta_t[2] * matrix_t3[23] + delta_t[3] * matrix_t3[31]
                    );

                    result_red = result[0] * Vr[0] +
                                result[1] * Vr[1] +
                                result[2] * Vr[2] +
                                result[3] * Vr[3] +
                                result[4] * Vr[4] +
                                result[5] * Vr[5] +
                                result[6] * Vr[6] +
                                result[7] * Vr[7];

                    result_green = result[0] * Vg[0] +
                                result[1] * Vg[1] +
                                result[2] * Vg[2] +
                                result[3] * Vg[3] +
                                result[4] * Vg[4] +
                                result[5] * Vg[5] +
                                result[6] * Vg[6] +
                                result[7] * Vg[7];

                    result_blue = result[0] * Vb[0] +
                                result[1] * Vb[1] +
                                result[2] * Vb[2] +
                                result[3] * Vb[3] +
                                result[4] * Vb[4] +
                                result[5] * Vb[5] +
                                result[6] * Vb[6] +
                                result[7] * Vb[7];
                } else if (delta_r > delta_b && delta_b > delta_g) {
                    // t4
                    float result[8] = float[8](
                        delta_t[0] * matrix_t4[0] + delta_t[1] * matrix_t4[8] + delta_t[2] * matrix_t4[16] + delta_t[3] * matrix_t4[24],
                        delta_t[0] * matrix_t4[1] + delta_t[1] * matrix_t4[9] + delta_t[2] * matrix_t4[17] + delta_t[3] * matrix_t4[25],
                        delta_t[0] * matrix_t4[2] + delta_t[1] * matrix_t4[10] + delta_t[2] * matrix_t4[18] + delta_t[3] * matrix_t4[26],
                        delta_t[0] * matrix_t4[3] + delta_t[1] * matrix_t4[11] + delta_t[2] * matrix_t4[19] + delta_t[3] * matrix_t4[27],
                        delta_t[0] * matrix_t4[4] + delta_t[1] * matrix_t4[12] + delta_t[2] * matrix_t4[20] + delta_t[3] * matrix_t4[28],
                        delta_t[0] * matrix_t4[5] + delta_t[1] * matrix_t4[13] + delta_t[2] * matrix_t4[21] + delta_t[3] * matrix_t4[29],
                        delta_t[0] * matrix_t4[6] + delta_t[1] * matrix_t4[14] + delta_t[2] * matrix_t4[22] + delta_t[3] * matrix_t4[30],
                        delta_t[0] * matrix_t4[7] + delta_t[1] * matrix_t4[15] + delta_t[2] * matrix_t4[23] + delta_t[3] * matrix_t4[31]
                    );

                    result_red = result[0] * Vr[0] +
                                result[1] * Vr[1] +
                                result[2] * Vr[2] +
                                result[3] * Vr[3] +
                                result[4] * Vr[4] +
                                result[5] * Vr[5] +
                                result[6] * Vr[6] +
                                result[7] * Vr[7];

                    result_green = result[0] * Vg[0] +
                                result[1] * Vg[1] +
                                result[2] * Vg[2] +
                                result[3] * Vg[3] +
                                result[4] * Vg[4] +
                                result[5] * Vg[5] +
                                result[6] * Vg[6] +
                                result[7] * Vg[7];

                    result_blue = result[0] * Vb[0] +
                                result[1] * Vb[1] +
                                result[2] * Vb[2] +
                                result[3] * Vb[3] +
                                result[4] * Vb[4] +
                                result[5] * Vb[5] +
                                result[6] * Vb[6] +
                                result[7] * Vb[7];
                } else if (delta_r > delta_g && delta_g > delta_b) {
                    // t5
                    float result[8] = float[8](
                        delta_t[0] * matrix_t5[0] + delta_t[1] * matrix_t5[8] + delta_t[2] * matrix_t5[16] + delta_t[3] * matrix_t5[24],
                        delta_t[0] * matrix_t5[1] + delta_t[1] * matrix_t5[9] + delta_t[2] * matrix_t5[17] + delta_t[3] * matrix_t5[25],
                        delta_t[0] * matrix_t5[2] + delta_t[1] * matrix_t5[10] + delta_t[2] * matrix_t5[18] + delta_t[3] * matrix_t5[26],
                        delta_t[0] * matrix_t5[3] + delta_t[1] * matrix_t5[11] + delta_t[2] * matrix_t5[19] + delta_t[3] * matrix_t5[27],
                        delta_t[0] * matrix_t5[4] + delta_t[1] * matrix_t5[12] + delta_t[2] * matrix_t5[20] + delta_t[3] * matrix_t5[28],
                        delta_t[0] * matrix_t5[5] + delta_t[1] * matrix_t5[13] + delta_t[2] * matrix_t5[21] + delta_t[3] * matrix_t5[29],
                        delta_t[0] * matrix_t5[6] + delta_t[1] * matrix_t5[14] + delta_t[2] * matrix_t5[22] + delta_t[3] * matrix_t5[30],
                        delta_t[0] * matrix_t5[7] + delta_t[1] * matrix_t5[15] + delta_t[2] * matrix_t5[23] + delta_t[3] * matrix_t5[31]
                    );

                    result_red = result[0] * Vr[0] +
                                result[1] * Vr[1] +
                                result[2] * Vr[2] +
                                result[3] * Vr[3] +
                                result[4] * Vr[4] +
                                result[5] * Vr[5] +
                                result[6] * Vr[6] +
                                result[7] * Vr[7];

                    result_green = result[0] * Vg[0] +
                                result[1] * Vg[1] +
                                result[2] * Vg[2] +
                                result[3] * Vg[3] +
                                result[4] * Vg[4] +
                                result[5] * Vg[5] +
                                result[6] * Vg[6] +
                                result[7] * Vg[7];

                    result_blue = result[0] * Vb[0] +
                                result[1] * Vb[1] +
                                result[2] * Vb[2] +
                                result[3] * Vb[3] +
                                result[4] * Vb[4] +
                                result[5] * Vb[5] +
                                result[6] * Vb[6] +
                                result[7] * Vb[7];
                } else {
                    // t6
                    float result[8] = float[8](
                        delta_t[0] * matrix_t6[0] + delta_t[1] * matrix_t6[8] + delta_t[2] * matrix_t6[16] + delta_t[3] * matrix_t6[24],
                        delta_t[0] * matrix_t6[1] + delta_t[1] * matrix_t6[9] + delta_t[2] * matrix_t6[17] + delta_t[3] * matrix_t6[25],
                        delta_t[0] * matrix_t6[2] + delta_t[1] * matrix_t6[10] + delta_t[2] * matrix_t6[18] + delta_t[3] * matrix_t6[26],
                        delta_t[0] * matrix_t6[3] + delta_t[1] * matrix_t6[11] + delta_t[2] * matrix_t6[19] + delta_t[3] * matrix_t6[27],
                        delta_t[0] * matrix_t6[4] + delta_t[1] * matrix_t6[12] + delta_t[2] * matrix_t6[20] + delta_t[3] * matrix_t6[28],
                        delta_t[0] * matrix_t6[5] + delta_t[1] * matrix_t6[13] + delta_t[2] * matrix_t6[21] + delta_t[3] * matrix_t6[29],
                        delta_t[0] * matrix_t6[6] + delta_t[1] * matrix_t6[14] + delta_t[2] * matrix_t6[22] + delta_t[3] * matrix_t6[30],
                        delta_t[0] * matrix_t6[7] + delta_t[1] * matrix_t6[15] + delta_t[2] * matrix_t6[23] + delta_t[3] * matrix_t6[31]
                    );

                    result_red = result[0] * Vr[0] +
                                result[1] * Vr[1] +
                                result[2] * Vr[2] +
                                result[3] * Vr[3] +
                                result[4] * Vr[4] +
                                result[5] * Vr[5] +
                                result[6] * Vr[6] +
                                result[7] * Vr[7];

                    result_green = result[0] * Vg[0] +
                                result[1] * Vg[1] +
                                result[2] * Vg[2] +
                                result[3] * Vg[3] +
                                result[4] * Vg[4] +
                                result[5] * Vg[5] +
                                result[6] * Vg[6] +
                                result[7] * Vg[7];

                    result_blue = result[0] * Vb[0] +
                                result[1] * Vb[1] +
                                result[2] * Vb[2] +
                                result[3] * Vb[3] +
                                result[4] * Vb[4] +
                                result[5] * Vb[5] +
                                result[6] * Vb[6] +
                                result[7] * Vb[7];
                }
            
                return vec3(result_red, result_green, result_blue);
            }

            vec3 find_lut_output(vec3 input_color) {
                // Map color to domain [0, 1]
                vec3 domain_color = remap_color(input_color, 0.0, 1.0, 0.0, 1.0);
            
                // Map to grid units
                vec3 grid_color = domain_color * (lutSize - 1.0);
            
                // Interpolate
                vec3 interp_color = tetrahedral_interpolation(grid_color);
            
                return interp_color;
            }

            void main() {
                vec4 originalColor = LinearTosRGB(texture(tDiffuse, vUv));

                if (enabled && lutSize != 0.0) {
                    // vec3 lutCoord = vec3(vUv, 0.5);
                    // vec3 lutColor = texture(lutMap, lutCoord).rgb;
                    // gl_FragColor = vec4(lutColor, 1.0);

                    vec3 lut_color = find_lut_output(originalColor.rgb);
                    gl_FragColor = vec4(lut_color, 1.0);

                } else {
                    vec4 originalColor = texture(tDiffuse, vUv);
                    gl_FragColor = LinearTosRGB(originalColor);
                }
            }
        `
    };

    // Adding the above shader pass
    state.preview_img.lut_pass = new ShaderPass(lut_shader);
    state.preview_img.composer.addPass(state.preview_img.lut_pass);

    // Adding a gamma correction pass
    // TODO: not needed when using `LinearTosRGB()` function in shader
    // const gamma_correction_pass = new ShaderPass(GammaCorrectionShader);
    // state.preview_img.composer.addPass(gamma_correction_pass);

    state.preview_img.renderer.setSize(canvas_prev_img.width, canvas_prev_img.height);
}

let last_time = 0;
function game_loop(timestamp) {
    let delta = timestamp - last_time;

    update(delta);
    render();

    last_time = timestamp;
    window.requestAnimationFrame(game_loop);
}

function update(delta) {
    state.threejs.controls.update();
}

function render() {
    // Render LUT Cube
    state.threejs.renderer.render(state.threejs.scene, state.threejs.camera);

    // Render Preview Image
    state.preview_img.composer.render();
}

function draw_canvas_grid(canvas, color, stepsH, stepsV = -1, diagonal = true) {
    // Set vertical steps to the same as horizontal
    // in case it wasn't specified.
    stepsV = stepsV < 0 ? stepsH : stepsV;

    const ctx = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const stepSizeH = width / stepsH;
    const stepSizeV = height / stepsV;

    ctx.beginPath();

    if (diagonal) {
        ctx.moveTo(0, height);
        ctx.lineTo(width, 0);
    }

    ctx.moveTo(stepSizeH, 0);
    for (let i = 1; i < stepsH; i++) {
        ctx.lineTo(stepSizeH * i, height);
        ctx.moveTo(stepSizeH * (i + 1), 0);
    }

    ctx.moveTo(0, stepSizeV);
    for (let i = 1; i < stepsV; i++) {
        ctx.lineTo(width, stepSizeV * i);
        ctx.moveTo(0, stepSizeV * (i + 1));
    }

    ctx.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    ctx.stroke();
}

// Upload field and button
const upload_btn = document.getElementById("upload-button");
const file_input = document.getElementById("file-input");

// Canvas - for LUT graph/ramp
const canvas_graph = document.getElementById("canvas-graph");
// Canvas - for threejs
const canvas_cube = document.getElementById("canvas-cube");
// Canvas - for preview image
const canvas_prev_img = document.getElementById("canvas-preview-img");

// LUT infobox
const info_name = document.getElementById("lut-name");
const info_size = document.getElementById("lut-size");
const info_domain = document.getElementById("lut-domain");

// Color checker
const color_patches = document.querySelectorAll('.color-patch');

document.addEventListener("DOMContentLoaded", (e) => {
    init_threejs();
    init_preview_img();

    window.requestAnimationFrame(game_loop);

    draw_canvas_grid(canvas_graph, [64, 51, 15], 4);
});

file_input.addEventListener("change", function () {
    state.file.is_changed = true;
});

// Main upload event listener
upload_btn.addEventListener("click", async function () {
    const file = file_input.files[0];

    // Only read in, if we detect a change in file
    if (file && state.file.is_changed) {
        // Blur interface for loading...
        document.querySelector("body").style.filter = "blur(10px)";

        const reader = new FileReader();
        reader.onload = async function (e) {
            // Parse the LUT as array of data
            const success = await parse_lut_data(e.target.result);

            if (success) {
                document.querySelector("body").style.filter = "blur(0)";
                log("LUT data successfully parsed.", LOG_LEVEL.INFO);
                log(state.lut.size, LOG_LEVEL.DEBUG);

                // Set the file input state to unchanged
                state.file.is_changed = false;

                // Load in the data viz functions
                await display_lut_data();
            } else {
                log("An error occured when trying to parse LUT data.", LOG_LEVEL.ERROR);
            }
        };
        reader.readAsText(file);
    }
});

async function parse_lut_data(text) {
    return new Promise((resolve) => {
        // Clearing the previous data out, which means we need
        // to set the valid flag to false as well.
        state.lut.data = [];
        state.lut.size = 0;
        state.lut.name = "";
        state.lut.is_valid = false;

        // Split the text up by lines
        const lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (line.length === 0 || line[0] === '#') continue;

            if (line.split(' ')[0].toLowerCase() === "title") {
                // Get the name of the LUT
                state.lut.name = line.split(' ').slice(1).join(' ').replace(/"/g, '');
                continue;
            }

            // Check if this is a line for LUT data
            if (line[0] !== 'L' && line[0] !== 'T' && line[0] !== 'D') {
                const values = line.split(' ');

                state.lut.data.push(parseFloat(values[0]));
                state.lut.data.push(parseFloat(values[1]));
                state.lut.data.push(parseFloat(values[2]));

                // const g = parseFloat(values[1]);
                // const b = parseFloat(values[2]);
                // state.lut.data.push(new Color(r, g, b));
            }
        }
        // Calculate the size of the LUT based on the data length
        state.lut.size = Math.cbrt(state.lut.data.length / 3);

        // LUT is loaded and parsed!
        state.lut.is_valid = true;
        resolve(true);
    });
}

function update_lut_info() {
    info_name.innerText = state.lut.name;
    info_size.innerText = `${state.lut.size}x${state.lut.size}x${state.lut.size}`;
    // TODO: update domain info
}

// Convenience function to wrap around all the visualization functions
// to be called after the lut has been parsed.
async function display_lut_data() {
    // Update the infobox for the lut
    update_lut_info();

    await display_lut_graph();

    // Apply LUT to color patches in color checker
    await display_lut_color_patches();

    // Mutate the 3D cube
    await display_lut_cube();

    console.log(state.lut.data.length);

    // Apply LUT to preview image
    await display_lut_as_preview();
}

async function display_lut_graph() {
    return new Promise((resolve) => {
        log("Displaying the graph...", LOG_LEVEL.DEBUG);
        const ctx = canvas_graph.getContext('2d');
        const width = canvas_graph.width;
        const height = canvas_graph.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();

        // Draw grid
        draw_canvas_grid(canvas_graph, [64, 51, 15], 4);

        const xCoords = [];
        const yRCoords = [];
        const yGCoords = [];
        const yBCoords = [];
        const yLCoords = [];

        for (let i = 0; i <= 255; i += 255 / state.lut.size) {
            const output = find_lut_output([i / 255, i / 255, i / 255]);
            const x = i * (width / 256);
            const yR = height - output[0] * height;
            const yG = height - output[1] * height;
            const yB = height - output[2] * height;

            xCoords.push(x);
            yRCoords.push(yR);
            yGCoords.push(yG);
            yBCoords.push(yB);
            yLCoords.push(height - calc_luminance(output) * height);
        }

        // TODO: can be a single loop
        // maybe even along with the above for loop...

        // Red curve
        if (channels.r) {
            ctx.beginPath();
            ctx.moveTo(0, yRCoords[0]);
            for (let i = 1; i < xCoords.length; i++) {
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

        resolve();
    });
}

async function display_lut_color_patches() {
    return new Promise((resolve) => {
        log("Updating color patches...", LOG_LEVEL.DEBUG);
        color_patches.forEach((el, index) => {
            const after_patch = el.querySelector(".after");
            const interp_color = find_lut_output(
                [
                    checkerLookup[index][0] / 255,
                    checkerLookup[index][1] / 255,
                    checkerLookup[index][2] / 255,
                ]
            );

            const out_color = [
                interp_color[0] * 255,
                interp_color[1] * 255,
                interp_color[2] * 255
            ].join(',');

            after_patch.style.backgroundColor = `rgb(${out_color})`;
        });

        resolve();
    });
}

async function display_lut_cube() {
    return new Promise((resolve) => {
        log("Displaying the 3D LUT cube...", LOG_LEVEL.DEBUG);

        const target_size = POINT_BASE_COUNT;
        const geo = state.threejs.scene.getObjectByName("lut_points").geometry;
        const pos = geo.attributes.position.array;
        const col = geo.attributes.color.array;

        for (let r = 0; r < target_size; r++) {
            for (let g = 0; g < target_size; g++) {
                for (let b = 0; b < target_size; b++) {
                    const index = (r * target_size * target_size + g * target_size + b) * 3;

                    // Calculate the normalized input color
                    const input_color = [
                        r / (target_size - 1),
                        g / (target_size - 1),
                        b / (target_size - 1)
                    ];

                    const out_color = find_lut_output(input_color);

                    pos[index] = out_color[0];
                    pos[index + 1] = out_color[1];
                    pos[index + 2] = out_color[2];

                    col[index] = out_color[0];
                    col[index + 1] = out_color[1];
                    col[index + 2] = out_color[2];
                }
            }
        }

        geo.attributes.position.needsUpdate = true;
        geo.attributes.color.needsUpdate = true;

        resolve();
    });
}

async function display_lut_as_preview() {
    return new Promise((resolve) => {
        log("Applying LUT to preview image...", LOG_LEVEL.DEBUG);

        // NOTE: we need to add an alpha element, because we can only
        // pass this as RGBA and not RGB....!
        const rgba_lut_data = new Float32Array(state.lut.data.length * 4 / 3);
        for (let i = 0; i < state.lut.data.length; i += 3) {
            rgba_lut_data.set(state.lut.data.slice(i, i + 3), i * 4 / 3);
            rgba_lut_data[i * 4 / 3 + 3] = 1.0;
        }

        const lut_texture = new THREE.Data3DTexture(rgba_lut_data, state.lut.size, state.lut.size, state.lut.size);
        lut_texture.format = THREE.RGBAFormat;
        lut_texture.type = THREE.FloatType;
        lut_texture.minFilter = THREE.NearestFilter;
        lut_texture.magFilter = THREE.NearestFilter;
        lut_texture.wrapS = THREE.ClampToEdgeWrapping;
        lut_texture.wrapT = THREE.ClampToEdgeWrapping;
        lut_texture.wrapR = THREE.ClampToEdgeWrapping;
        lut_texture.needsUpdate = true;

        state.preview_img.lut_pass.uniforms.lutMap.value = lut_texture;
        state.preview_img.lut_pass.uniforms.lutSize.value = state.lut.size;
        state.preview_img.lut_pass.uniforms.enabled.value = true;

        resolve();
    });
}

// TODO: make it better?
canvas_prev_img.addEventListener("mousedown", function (e) {
    state.preview_img.lut_pass.uniforms.enabled.value = false;

    canvas_prev_img.addEventListener("mouseup", function (e) {
        state.preview_img.lut_pass.uniforms.enabled.value = true;
    });
});

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
// const canvasRamp = document.getElementById('ramp');
// const ctxRamp = canvasRamp.getContext('2d');
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
// uploadInput.addEventListener('change', handleFileUpload);
// canvasRamp.addEventListener('click', displayCoordinates);

function displayCoordinates() { }

// drawGrid();

function calcCheckerColors(checker) {
    checker.forEach((el, index) => {
        el.style.backgroundColor = `rgb(${find_lut_output(checkerLookup[index].divideScalar(255)).multiplyScalar(255).toArray().join(',')})`;
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
                const output = find_lut_output(color);
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

    for (let i = 0; i <= 255; i += 255 / lutSize) {
        const output = find_lut_output(new Color(i / 255, i / 255, i / 255));
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

    // TEMP LOOP
    // const verts = [];
    // const interval = lutSize / 20;
    // for (let bIndex = 0; bIndex < lutSize; bIndex += interval) {
    //     for (let gIndex = 0; gIndex < lutSize; gIndex += interval) {
    //         for (let rIndex = 0; rIndex < lutSize; rIndex += interval) {
    //             const index = Math.floor(rIndex) * lutSize * lutSize + Math.floor(gIndex) * lutSize + Math.floor(bIndex);
    //             const color = lutData[index];
    //             verts.push({ r: color.r, g: color.g, b: color.b });
    //         }
    //     }
    // }
    // console.log(verts);

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

/**
 * Returns the interpolated color based on an input,
 * LUT data, and interpolation method.
 * 
 * @param {array} input Input color as an array [R, G, B]
 * @returns {array} interpolated color [R, G, B]
 */
function find_lut_output(input) {
    // Map color to domain [0, 1]
    // const domainColor = input.remap(0, 1, 0, 1);
    const domainColor = remap_color(input, 0, 1, 0, 1);

    // Map to grid units
    // const gridColor = domainColor.multiplyScalar(state.lut.size - 1);
    const gridColor = mul_scalar(domainColor, state.lut.size - 1);

    // Interpolate
    // tetraInterp(gridColor);
    // const interpColor = trilerp(gridColor);
    const interpColor = tetrahedral_interpolation(gridColor);

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
    const p000 = state.lut.data[(x_floor * state.lut.size + y_floor) * state.lut.size + z_floor];
    const p001 = state.lut.data[(x_floor * state.lut.size + y_floor) * state.lut.size + z_ceil];
    const p010 = state.lut.data[(x_floor * state.lut.size + y_ceil) * state.lut.size + z_floor];
    const p011 = state.lut.data[(x_floor * state.lut.size + y_ceil) * state.lut.size + z_ceil];
    const p100 = state.lut.data[(x_ceil * state.lut.size + y_floor) * state.lut.size + z_floor];
    const p101 = state.lut.data[(x_ceil * state.lut.size + y_floor) * state.lut.size + z_ceil];
    const p110 = state.lut.data[(x_ceil * state.lut.size + y_ceil) * state.lut.size + z_floor];
    const p111 = state.lut.data[(x_ceil * state.lut.size + y_ceil) * state.lut.size + z_ceil];

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

function calc_corner_index(R, G, B, size) {
    return ((B * size * size) + (G * size) + R) * 3;
}

function tetrahedral_interpolation(input) {
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

    const R0 = Math.floor(input[0]);
    const G0 = Math.floor(input[1]);
    const B0 = Math.floor(input[2]);

    const R1 = Math.ceil(input[0]);
    const G1 = Math.ceil(input[1]);
    const B1 = Math.ceil(input[2]);

    const delta_r = (R0 == R1) ? 0.0 : (input[0] - R0) / (R1 - R0);
    const delta_g = (G0 == G1) ? 0.0 : (input[1] - G0) / (G1 - G0);
    const delta_b = (B0 == B1) ? 0.0 : (input[2] - B0) / (B1 - B0);

    const delta_t = math.matrix([1, delta_b, delta_r, delta_g]);

    const Vr = math.matrix([
        state.lut.data[calc_corner_index(R0, G0, B0, state.lut.size)],
        state.lut.data[calc_corner_index(R0, G1, B0, state.lut.size)],
        state.lut.data[calc_corner_index(R1, G0, B0, state.lut.size)],
        state.lut.data[calc_corner_index(R1, G1, B0, state.lut.size)],
        state.lut.data[calc_corner_index(R0, G0, B1, state.lut.size)],
        state.lut.data[calc_corner_index(R0, G1, B1, state.lut.size)],
        state.lut.data[calc_corner_index(R1, G0, B1, state.lut.size)],
        state.lut.data[calc_corner_index(R1, G1, B1, state.lut.size)],
    ]);

    const Vg = math.matrix([
        state.lut.data[calc_corner_index(R0, G0, B0, state.lut.size) + 1],
        state.lut.data[calc_corner_index(R0, G1, B0, state.lut.size) + 1],
        state.lut.data[calc_corner_index(R1, G0, B0, state.lut.size) + 1],
        state.lut.data[calc_corner_index(R1, G1, B0, state.lut.size) + 1],
        state.lut.data[calc_corner_index(R0, G0, B1, state.lut.size) + 1],
        state.lut.data[calc_corner_index(R0, G1, B1, state.lut.size) + 1],
        state.lut.data[calc_corner_index(R1, G0, B1, state.lut.size) + 1],
        state.lut.data[calc_corner_index(R1, G1, B1, state.lut.size) + 1],
    ]);

    const Vb = math.matrix([
        state.lut.data[calc_corner_index(R0, G0, B0, state.lut.size) + 2],
        state.lut.data[calc_corner_index(R0, G1, B0, state.lut.size) + 2],
        state.lut.data[calc_corner_index(R1, G0, B0, state.lut.size) + 2],
        state.lut.data[calc_corner_index(R1, G1, B0, state.lut.size) + 2],
        state.lut.data[calc_corner_index(R0, G0, B1, state.lut.size) + 2],
        state.lut.data[calc_corner_index(R0, G1, B1, state.lut.size) + 2],
        state.lut.data[calc_corner_index(R1, G0, B1, state.lut.size) + 2],
        state.lut.data[calc_corner_index(R1, G1, B1, state.lut.size) + 2],
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

    return [result_red, result_green, result_blue];
}