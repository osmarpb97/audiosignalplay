/**
 * > Array manipulation functions
 *
 * This module contains helper functions to work with arrays (usually typed arrays,
 * but not required).
 *
 * This module accepts the premise that explicit is better than implicit.
 * For this reason:
 * - The first parameter of all the functions is the number of samples to process.
 * - The last parameter of all modifyng functions is the array to use as output
 * allowing _explicit_ in-place modification
 *
 * [![npm install dsp-array](https://nodei.co/npm/dsp-array.png?mini=true)](https://npmjs.org/package/dsp-array/)
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)
 *
 * @example
 * var array = require('dsp-array')
 * const sine = array.fill(1024, (x) => Math.sin(0.5 * x))
 *
 * @example
 * // included in dsp-kit package
 * var dsp = require('dsp-kit')
 * dsp.fill(...)
 *
 * @module array
 */

/**
 * Create a typed array (a Float64Array) filled with zeros
 *
 * @param {Integer} size
 * @return {Array} the array
 */
export function zeros(size) { return new Float64Array(size) }

/**
 * Fill an array using a function
 *
 * @param {Number|Array} array - The array (to reuse) or an array length to create one
 * @param {Function} fn - the generator function. It receives the following parameters:
 *
 * - n: a number from [0..1]
 * - index: a number from [0...length]
 * - length: the array length
 *
 * @example
 * const sine = array.fill(10, (x) => Math.sin(x))
 */
export function fill(N, fn, output) {
    if (arguments.length < 3) output = zeros(N)
    for (let n = 0; n < N; n++) output[n] = fn(n, N)
    return output
}

/**
 * Concatenate two arrays
 * @param {Array} arrayA
 * @param {Array} arrayB
 * @param {Array} destination - (Optional) If provided, the length must be
 * _at least_ the sum of the arrayA and arrayB length plus the destOffset
 * @return {Array} destination
 * @example
 * // concat into a new array
 * const arrayC = array.concat(arrayA, arrayB)
 */
export function concat(a, b, dest = null, offset = 0) {
    const al = a.length
    const bl = b.length
    if (dest === null) dest = zeros(al + bl + offset)
    for (let i = 0; i < al; i++) dest[i + offset] = a[i]
    for (let i = 0; i < bl; i++) dest[i + al + offset] = b[i]
    return dest
}

/**
 * Add elements from two arrays. Can work in-place
 *
 * @param {Integer} numberOfSamples - the number of samples to add
 * @param {Array} a - one buffer to add
 * @param {Array} b - the other buffer
 * @param {Array} output - (Optional) the output buffer (or a new one if not provided)
 * @return {Array} the output buffer
 * @example
 * add(10, signalA, signalB)
 * // in-place (store the result in signalA)
 * add(10, signalA, signalB, signalA)
 */
export function add(N, a, b, out) {
    out = out || zeros(N)
    for (var i = 0; i < N; i++) out[i] = a[i] + b[i] || a[i] || b[i]
    console.table(a, b, out)
    return out
}


/**
 * Multiply elements from two arrays. Can work in-place
 *
 * @param {Integer} numberOfSamples - the number of samples to add
 * @param {Array} a - one buffer to add
 * @param {Array} b - the other buffer
 * @param {Array} output - (Optional) the output buffer (or a new one if not provided)
 * @return {Array} the output buffer
 * @example
 * mult(10, signalA, signalB)
 * // in-place (store the result in signalA)
 * mult(10, signalA, signalB, signalA)
 */
export function mult(N, a, b, out) {
    out = out || zeros(N)
    for (var i = 0; i < N; i++) out[i] = a[i] * b[i]
    return out
}

/**
 * Amplify array. Can work in-place
 *
 * @param {Array} a - one buffer to add
 * @param {Integer} n - the number of samples to add
 * @example
 * mult(10, signalA, signalB)
 * // in-place (store the result in signalA)
 * mult(10, signalA, signalB, signalA)
 */
export function amplify(a, n) {
    var N = a.length
    var out = zeros(N)
    for (var i = 0; i < N; i++) out[i] = a[i] * n
    return out
}

/**
 * Convolution
 *
 * @param {Integer} numberOfSamples - the number of samples to add
 * @param {Array} a - one buffer to add
 * @param {Array} b - the other buffer
 * @param {Array} output - (Optional) the output buffer (or a new one if not provided)
 * @return {Array} the output buffer
 * @example
 * convolution(signalA, signalB)
 */



export function convolution(a, b) {
    console.table(a, b)
    if (a.length === 0 || b.length === 0) {
        throw new Error("Vectors can not be empty!");
    }
    const volume = a;
    const kernel = b;
    let displacement = 0;
    const convVec = [];

    for (let i = 0; i < volume.length; i++) {
        for (let j = 0; j < kernel.length; j++) {
            if (displacement + j !== convVec.length) {
                convVec[displacement + j] =
                    convVec[displacement + j] + volume[i] * kernel[j];
            } else {
                convVec.push(volume[i] * kernel[j]);
            }
        }
        displacement++;
    }
    return convVec;
}

/**
 * Multiply elements from two arrays. Can work in-place
 *
 * @param {Array} a - one buffer to add
 * @example
 * mult(10, signalA, signalB)
 * // in-place (store the result in signalA)
 * mult(10, signalA, signalB, signalA)
 */
export function reflect(a) {
    return a.reverse()
}


/**
 * Take samples every n element. Can work in-place
 *
 * @param {Array} a - one buffer to add
 * @param {Integer} n - take every N samples 
 * @example
 * desplazamiento(10, signalA)
 * recorre a la izquierda o a la derecha
 */
export function desplazamiento(n, a) {
    var lon = a.length
    var N = Math.abs(n)
    var out = zeros(lon)
    var cero = 0
    if (n < 0) {
        for (var i = N; i < lon; i++) {
            out[i] = a[cero]
            cero++;
        }
    } else {
        for (var i = N; i < lon; i++) {
            out[cero] = a[i] || out[cero]
            cero++;
        }
    }
    console.log("OUT", out)
    return out
}



/**
 * Diezmacion=submuestreo
 *
 * @param {Array} a - one buffer to add
 * @param {Integer} n - take every N samples 
 * @example
 * diezmacion(10, signalA)
 * // in-place (store the result in signalA)
 * mult(10, signalA, signalB, signalA)
 */
export function diezmacion(n, a) {
    console.log(n)
    console.table(a)
    if (n > a.length) return
    var out = zeros(a.length)
    for (var i = 0; i < Math.floor(a.length / n); i++) out[i * n] = a[i * n]
    return out
}


/**
 * Interpolacion cero
 *
 * @param {Array} a - one buffer to add
 * @param {Integer} n - take every N samples 
 * @example
 * interpolacionCero(2, signalA)
 * 
 */
export function interpolacionCero(n, a) {
    var dif = Math.abs((a.length - 2) * (n - 1)) //longitud menos orillas por cuantos ceros
    console.log('cuantos ceros: ', dif)
    var out = zeros(a.length + dif) //12345=5  2  10203045=8
    var j = 0
    console.log(a.length)
    for (var i = 0; i < a.length; i++) {
        //console.log(a[i])
        out[j] = a[i] // 2[0] -> 2[0]
        j = j + 1 // 1
        for (var s = 0; s < n - 1; s++) {
            //console.log('+++')
            out[j] = 0
            j = j + 1
        }
    }
    console.table(out)
    return out
}

/**
 * Interpolacion escalon
 *
 * @param {Array} a - one buffer to add
 * @param {Integer} n - take every N samples 
 * @example
 * interpolacionEscalon(2, signalA)
 * 
 */
export function interpolacionEscalon(n, a) {
    console.log(n)
    var dif = (a.length - 2) * (n - 1)
    var out = zeros(a.length + dif)
    var j = 0
    var izquierda = 0
    for (var i = 0; i < a.length - 1; i++) {
        out[j] = a[i]
        izquierda = a[i]
        j = j + 1
        for (var s = 0; s < n - 1; s++) {
            out[j] = izquierda
            j = j + 1
        }
    }
    return out
}


/**
 * Interpolacion lineal
 *
 * @param {Array} a - one buffer to add
 * @param {Integer} n - take every N samples 
 * @example
 * interpolacionEscalon(2, signalA)
 * 
 */
export function interpolacionLineal(n, a) {
    console.log(n)
    var dif = (a.length - 2) * (n - 1)
    var out = zeros(a.length + dif)
    var j = 0
    var y = 0
    var ydiv = 0
    for (var i = 1; i < a.length - 1; i++) {
        out[j] = a[i]
        y = Math.abs(a[i] - a[i + 1])
        ydiv = y / n
        j = j + 1
        for (var s = 0; s < n - 1; s++) {
            out[j] = out[j - 1] + ydiv
            j = j + 1
        }
    }
    return out
}


/**
 * Substract elements from two arrays. Can work in-place
 *
 * @param {Integer} numberOfSamples - the number of samples to add
 * @param {Array} minuend - the buffer to substract from
 * @param {Array} subtrahend - the buffer to get the numbers to being subtracted
 * @param {Array} output - (Optional) the output buffer (or a new one if not provided)
 * @return {Array} the output buffer
 * @example
 * var signalA = [3, 3, 3, 3]
 * var signalB = [0, 1, 2, 3]
 * substr(10, signalA, signalB) // => [3, 2, 1, 0]
 * // in-place (store the result in signalA)
 * substr(10, signalA, signalB, signalA) // => signalA contains the result
 */
export function substr(N, a, b, out) {
    out = out || zeros(N)
    for (var i = 0; i < N; i++) out[i] = a[i] - b[i] || a[i] || -b[i]
    console.table(a, b, out)
    return out
}


const isSame = Object.is
    /**
     * Round the values of an array to a number of decimals.
     *
     * There are small differences of precission between algorithms. This helper
     * function allows to compare them discarding the precission errors.
     *
     * @function
     * @param {Array} array
     * @param {Integer} decimals - (Optional) the number of decimals (8 by default)
     */
export const round = roundTo(8)

/**
 * Create a function that rounds to the given decimals
 * @param {Integer} decimals - The number of decimals
 * @return {Function} a function
 * @see round
 */
export function roundTo(dec) {
    return function round(arr, n = dec, output) {
        const size = arr.length
        if (!output) output = new Float64Array(size)
        const limit = Math.min(size, output.length)
        const m = Math.pow(10, n)
        for (let i = 0; i < limit; i++) {
            const r = Math.round(arr[i] * m) / m
            output[i] = isSame(r, -0) ? 0 : r
        }
        return output
    }
}

/**
 * Test if the N first elements of an array is true for a given predicate
 *
 * @param {Integer} N - the number of elements to test
 * @param {Function} predicate - a function that receive an element of the
 * array and should return true or false
 * @param {Array} array - the array
 * @return {Boolean}
 *
 * @example
 * var signal = [1, 1, 1, 2, 2, 2]
 * testAll(3, signal, (x) => x === 1) // => true
 * testAll(4, signal, (x) => x === 1) // => false
 */
export function testAll(N, fn, array) {
    for (var i = 0; i < N; i++) {
        if (!fn(array[i])) return false
    }
    return true
}