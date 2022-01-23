"use strict";

var test = require("tape");
var ellipsize = require("../src/index");

var ELLIPSE = "…";

test("ellipsize simple cases", function (assert) {
    var cases = [
        {
            label: "zero length string",
            len: 100,
            string: "",
            expect: "",
        },
        {
            label: "simple string",
            len: 8,
            string: "one two three four",
            expect: "one two" + ELLIPSE,
        },
        {
            label: "long string gets truncated",
            len: 8,
            string: "12345678910",
            expect: "1234567" + ELLIPSE,
        },
        {
            label: 'dashes are also a "word boundary"',
            len: 8,
            string: "one two-three four",
            expect: "one two" + ELLIPSE,
        },
        {
            label: "dont ellipsize short strings",
            len: 100,
            string: "one two three four",
            expect: "one two three four",
        },
        {
            label: "multibyte characters",
            len: 5,
            string: "审核未通过",
            expect: "审核未通过",
        },
        {
            label: "multibyte characters ellipsised",
            len: 5,
            string: "审核未通过过",
            expect: "审核未通" + ELLIPSE,
        },
        {
            label: "length has a default",
            len: undefined,
            string: "xia3blpfgw9skc40k8k8808cw0cwk4wg88c4cwcokw88ggss40wo080so044og00gc4o40s88sowk8k4k0sswg0k84gws4ksg8so44gwcg0gkcwgc0wwcog08cwc0ogogsgkgcccko48w",
            expect:
                "xia3blpfgw9skc40k8k8808cw0cwk4wg88c4cwcokw88ggss40wo080so044og00gc4o40s88sowk8k4k0sswg0k84gws4ksg8so44gwcg0gkcwgc0wwcog08cwc0ogogsgkgcccko48w".slice(
                    0,
                    139
                ) + ELLIPSE,
        },
        {
            label: "zero length returns an empty string",
            len: 0,
            string: "gc4o40s88sowk8k4k0ssw",
            expect: "",
        },
        {
            label: "bogus input",
            len: 0,
            string: null,
            expect: "",
        },
        {
            label: "bogus input",
            len: 0,
            string: undefined,
            expect: "",
        },
    ];

    cases.forEach(function (testCase) {
        var result = ellipsize(testCase.string, testCase.len);
        assert.equal(result, testCase.expect, testCase.label);
        assert.ok(result.length <= testCase.len || 140);
    });

    assert.end();
});

test("ellipsize truncate settings", function (assert) {
    var cases = [
        {
            label: "truncate settings off",
            len: 8,
            string: "123456789ABCDEF",
            expect: "",
            truncate: false,
        },
        {
            label: "truncate settings on",
            len: 8,
            string: "123456789ABCDEF",
            expect: "1234567" + ELLIPSE,
            truncate: true,
        },
        {
            label: "truncate settings default",
            len: 8,
            string: "123456789ABCDEF",
            expect: "1234567" + ELLIPSE,
            truncate: undefined,
        },
        {
            label: "truncate settings default",
            len: 8,
            string: "123456789ABCDEF",
            expect: "1234567" + ELLIPSE,
            truncate: null,
        },
        {
            label: "truncate settings middle",
            len: 8,
            string: "123456789ABCDEF",
            expect: "123" + ELLIPSE + "DEF",
            truncate: "middle",
        },
    ];

    cases.forEach(function (testCase) {
        var result = ellipsize(testCase.string, testCase.len, {
            truncate: testCase.truncate,
        });
        assert.equal(result, testCase.expect, testCase.label);
    });

    assert.end();
});

test("ellipsize truncate middle", function (assert) {
    var cases = [
        {
            label: "truncate words settings middle short",
            len: 16,
            string: "the quick brown fox",
            expect: "the" + ELLIPSE + " fox",
            truncate: "middle",
        },
        {
            label: "truncate words settings middle longer",
            len: 37,
            string: "These are a few of my favourite things",
            expect: "These are a few" + ELLIPSE + " favourite things",
            truncate: "middle",
        },
    ];

    cases.forEach(function (testCase) {
        var result = ellipsize(testCase.string, testCase.len, {
            truncate: testCase.truncate,
        });
        assert.equal(result, testCase.expect, testCase.label);
    });

    assert.end();
});

test("ellipsize custom ellipsize", function (assert) {
    var cases = [
        {
            label: "zero length string",
            len: 100,
            string: "",
            expect: "",
            ellipse: "--",
        },
        {
            label: "two character ellipse",
            len: 9,
            string: "one two three four",
            expect: "one two--",
            ellipse: "--",
        },
        {
            label: "unicode character ellipse",
            len: 8,
            string: "one two three four",
            expect: "one two☃",
            ellipse: "☃",
        },
        {
            label: "off by one string",
            len: 8,
            string: "one two three four",
            expect: "one--",
            ellipse: "--",
        },
    ];

    cases.forEach(function (testCase) {
        const { len, string, expect, ellipse } = testCase;
        const result = ellipsize(string, len, {
            ellipse,
        });
        assert.equal(result, expect, "ellipsized as expected");
        assert.ok(result.length <= len, "length does not exceed maxLen");
    });

    assert.end();
});
