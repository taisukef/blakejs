blakejs ES module version
====

<!-- [![travis ci](https://travis-ci.org/dcposch/blakejs.svg?branch=master)](https://travis-ci.org/dcposch/blakejs) -->

**blakejs is a pure Javascript implementation of the BLAKE2b and BLAKE2s hash functions.**

![blake1](https://cloud.githubusercontent.com/assets/169280/25921238/9bf1877a-3589-11e7-8a93-74b69c3874bb.jpg)

---

[RFC 7693: The BLAKE Cryptographic Hash and MAC](https://tools.ietf.org/html/rfc7693)

BLAKE is the default family of hash functions in the venerable NaCl crypto library. Like SHA2 and SHA3 but unlike MD5 and SHA1, BLAKE offers solid security. With an optimized assembly implementation, BLAKE can be faster than all of those other hash functions.

Of course, this implementation is in Javascript, so it won't be winning any speed records. More under Performance below. It's short and sweet, less than 500 LOC.

**As far as I know, this package is the easiest way to compute Blake2 in the browser.**

Other options to consider:
- [@nazar-pc](https://github.com/nazar-pc) has WebAssembly implementation for higher performance where supported: [blake2.wasm](https://github.com/nazar-pc/blake2.wasm)
- [@emilbayes](https://github.com/emilbayes) has a Blake2b-only implementation with salt support; WASM with automatic JS fallback: [blake2b](https://github.com/emilbayes/blake2b)
- On node, you probably want the native wrapper [node-blake2](https://github.com/ludios/node-blake2)

Quick Start
---
```js
import { blake as blake2b } from 'https://taisukef.github.io/blakejs_es/blake2b.js';
import { blake as blake2s } from 'https://taisukef.github.io/blakejs_es/blake2s.js';

console.log(blake.blake2bHex('abc'))
// prints ba80a53f981c4d0d6a2797b69f12f6e94c212f14685ac4b74b12bb6fdbffa2d17d87c5392aab792dc252d5de4533cc9518d38aa8dbf1925ab92386edd4009923
console.log(blake.blake2sHex('abc'))
// prints 508c5e8c327c14e2e1a72ba34eeb452f37458b209ed63a294d999b4c86675982
```

API
---

### 1. Use `blake2b` to compute a BLAKE2b hash

Pass it a string or `Uint8Array` containing bytes to hash, and it will return a `Uint8Array` containing the hash.

```js
// Computes the BLAKE2B hash of a string or byte array, and returns a Uint8Array
//
// Returns a n-byte Uint8Array
//
// Parameters:
// - input - the input bytes, as a string, Buffer, or Uint8Array
//           Strings are converted to UTF8 bytes
// - key - optional key Uint8Array, up to 64 bytes
// - outlen - optional output length in bytes, default 64
function blake2b(input, key, outlen) {
    [...]
}
```

For convenience, `blake2bHex` takes the same arguments and works the same way, but returns a hex string.

### 2. Use `blake2b[Init,Update,Final]` to compute a streaming hash

```js
const KEY = null // optional key
const OUTPUT_LENGTH = 64 // bytes
const context = blake2bInit(OUTPUT_LENGTH, KEY)
...
// each time you get a byte array from the stream:
blake2bUpdate(context, bytes)
...
// finally, once the stream has been exhausted
consnt hash = blake2bFinal(context)
// returns a 64-byte hash, as a Uint8Array
```

### 3. All `blake2b*` functions have `blake2s*` equivalents

BLAKE2b: `blake2b`, `blake2bHex`, `blake2bInit`, `blake2bUpdate`, and `blake2bFinal`

BLAKE2s: `blake2s`, `blake2sHex`, `blake2sInit`, `blake2sUpdate`, and `blake2sFinal`

The inputs are identical except that maximum key size and maximum output size are 32 bytes instead of 64.

Limitations
---
* Can only handle up to 2**53 bytes of input

  If your webapp is hashing more than 8 petabytes, you may have other problems :)

Testing
---
* Examples from the RFC
* BLAKE2s self-test from the RFC
* Examples from http://pythonhosted.org/pyblake2/examples.html
* A longer set of test vectors generated by https://github.com/jedisct1/crypto-test-vectors/tree/master/crypto/hash/blake2/blake2b/nosalt-nopersonalization/generators/libsodium

```
$ deno test --allow-read
```

Performance
---
```
BLAKE2b: 15.2 MB / second on a 2.2GHz i7-4770HQ
BLAKE2s: 20.4 MB / second

¯\_(ツ)_/¯
```

If you're using BLAKE2b in server side node.js code, you probably want the [native wrapper](https://www.npmjs.com/package/blake2) which should be able to do several hundred MB / second on the same processor.

If you're using BLAKE2b in a web app, 15 MB/sec might be fine.

Javascript doesn't have 64-bit integers, and BLAKE2b is a 64-bit integer algorithm. Writing it with`Uint32Array` is not that fast. BLAKE2s is a 32-bit algorithm, so it's a bit faster.

If we want better machine code at the expense of gross-looking Javascript, we could use asm.js


License
---
Creative Commons CC0. Ported from the reference C implementation in
[RFC 7693](https://tools.ietf.org/html/rfc7693).
