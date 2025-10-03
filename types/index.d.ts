declare function _default(str: string, max: number, opts?: EllipsizeOptions): string;
export default _default;
export type EllipsizeOptions = {
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
    truncate?: "middle" | boolean;
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
export function ellipsizeMiddle(str: string, max: number, ellipse: string, chars: string[]): string;
//# sourceMappingURL=index.d.ts.map