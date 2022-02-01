"use strict";

var defaults = {
    ellipse: "…",
    chars: [" ", "-"],
    max: 140,
    truncate: true,
};

/**
 * "mac-style" or "harmonica" ellipsize.
 * Ellipsizes a string in the middle instead of the end.
 *
 * Examples:
 *
 *      These are a few of my favourite things
 *      These are … my faourite things
 *      These are … faourite things
 *      hese … things
 *
 * @param {string} str
 * @param {Number} max
 * @param {string} ellipse
 * @param {string[]} chars
 * @returns {string} ellipsized
 */

function ellipsizeMiddle(str, max, ellipse, chars) {
    if (str <= max) return str;
    if (max < 2) return str.slice(0, max - ellipse.length) + ellipse;

    var maxLen = max - ellipse.length;
    var middle = Math.floor(maxLen / 2);

    var left = middle;
    var right = str.length - middle;

    for (var i = 0; i < middle; i++) {
        var charLeft = str.charAt(i);
        var posRight = str.length - i;

        var charRight = str.charAt(posRight);

        if (chars.indexOf(charLeft) !== -1) left = i;
        if (chars.indexOf(charRight) !== -1) right = posRight;
    }

    return str.slice(0, left) + ellipse + str.slice(right);
}

/**
 *
 * @param {string} str
 * @param {number} max
 * @param {string} ellipse
 * @param {string[]} chars
 * @param {boolean} truncate
 * @returns
 */
function ellipsize(str, max, ellipse, chars, truncate) {
    if (str.length <= max) return str;

    var maxLen = max - ellipse.length;
    var end = maxLen;

    for (var i = 0; i <= maxLen; i++) {
        var char = str.charAt(i);
        if (chars.indexOf(char) !== -1) end = i;
    }

    // no breakpoint found, but truncate
    // was not allowed.
    if (!truncate && end == maxLen) return "";

    return str.slice(0, end) + ellipse;
}

/**
 * Ellipsize a string. Produces a string that is max lenght,
 * including the ellipse character.
 *
 * @param {string} str - String to ellipsize
 * @param {number} max - Max length including ellipsis
 * @param {Record<string, any>} [opts] - See additional options
 * @returns {string} ellipsized string
 */
module.exports = function (str, max, opts) {
    if (typeof str !== "string" || str.length === 0) return "";
    if (max === 0) return "";

    opts = opts || {};

    for (var key in defaults) {
        if (opts[key] === null || typeof opts[key] === "undefined") {
            opts[key] = defaults[key];
        }
    }

    opts.max = max || opts.max;

    if (opts.truncate == "middle")
        return ellipsizeMiddle(str, opts.max, opts.ellipse, opts.chars);

    return ellipsize(str, opts.max, opts.ellipse, opts.chars, opts.truncate);
};

module.exports.ellipsizeMiddle = ellipsizeMiddle;
module.exports.ellipsize = ellipsize;
