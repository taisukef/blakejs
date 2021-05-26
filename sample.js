import { blake as blake2b } from './blake2b.js';
import { blake as blake2s } from './blake2s.js';

console.log(blake2b.blake2bHex('abc'));
// prints ba80a53f981c4d0d6a2797b69f12f6e94c212f14685ac4b74b12bb6fdbffa2d17d87c5392aab792dc252d5de4533cc9518d38aa8dbf1925ab92386edd4009923
console.log(blake2s.blake2sHex('abc'));
// prints 508c5e8c327c14e2e1a72ba34eeb452f37458b209ed63a294d999b4c86675982
