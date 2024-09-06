import { PBKDF2, lib, AES, enc } from 'crypto-js';

// Encryption with PIN
export function encryptWithPin(pasteContent, pin) {
    const key = PBKDF2(pin, 'salt', { keySize: 256 / 32, iterations: 1000 });
    const iv = lib.WordArray.random(16);
    const encrypted = AES.encrypt(pasteContent, key, { iv: iv });
    return {
        encryptedContent: encrypted.toString(),
        iv: iv.toString()
    };
}

// Decryption with PIN
export function decryptWithPin(encryptedContent, iv, pin) {
    const key = PBKDF2(pin, 'salt', { keySize: 256 / 32, iterations: 1000 });
    const decrypted = AES.decrypt(encryptedContent, key, { iv: enc.Hex.parse(iv) });
    return decrypted.toString(enc.Utf8);
}