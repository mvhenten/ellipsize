declare namespace _exports {
    export { EllipsizeOptions };
}
declare function _exports(str: string, max: number, opts?: EllipsizeOptions): string;
declare namespace _exports {
    export { ellipsizeMiddle };
    export { ellipsize };
}
export = _exports;
type EllipsizeOptions = {
    /**
     * - Character to use as the ellipsis
     */
    ellipse?: string;
    /**
     * - Characters to use as breakpoints
     */
    chars?: string[];
    /**
     * - Maximum length of the string including the ellipse
     */
    max?: number;
    /**
     * - Whether to truncate the string if no breakpoints are found
     */
    truncate?: boolean;
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
declare function ellipsizeMiddle(str: string, max: number, ellipse: string, chars: string[]): string;
/**
 *
 * @param {string} str
 * @param {number} max
 * @param {string} ellipse
 * @param {string[]} chars
 * @param {boolean} truncate
 * @returns
 */
declare function ellipsize(str: string, max: number, ellipse: string, chars: string[], truncate: boolean): string;
//# sourceMappingURL=index.d.ts.map