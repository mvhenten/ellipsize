# ellipsize

[![Build Status](https://drone.io/github.com/mvhenten/ellipsize/status.png)](https://drone.io/github.com/mvhenten/ellipsize/latest)

Ellipsizes a string near a word boundary.

An ellipsized text looks much better if the ellipsize was added at the end of the
last full word instead of somewhere in the middle - especially if there are very
few characters remaining.

## Why make a module for something sooo simple

Off by one errors.

I've written a couple of ellipsize functions, and got it wrong on edge cases
several times. It's not rocket science, but something as simple as this you should
write in five minutes right? Never mind the unit test.

This ellipsize function is robust and tested against a couple of edge cases.
It's written to be fast, work in any browser and have no dependencies at all.

It simply loops over all the characters using a single function call, storing the
last location of an allowed break point, if any. Otherwise just truncates the string.

## Examples

```javascript

    var ellipsize = require('ellipsize');

    ellipsize('');
    // ''
    ellipsize(undefined);
    // ''
    ellipsize('one two three four', 8 );
    // 'one two…'
    ellipsize('one two-three four', 8 );
    // 'one two…'
    ellipsize('one two three four', 100 );
    // 'one two three four'
    ellipsize('12345678910')
    // '1234567…'
    ellipsize('abc', 0 );
    // ''

```
You may provide an alternative ellipse character, or "break points" like so:

```javascript
    var ellipsize = require('ellipsize');

    ellipsize( 'one two&three four', 8, { chars: [' ', '&'], ellipse: '→' });
    // 'one two→'

```

## Copyright

Copyright 2014 Matthijs van Henten.
Released under the GPLv3.


