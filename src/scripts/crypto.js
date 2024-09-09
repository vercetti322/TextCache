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
    try {
      const key = PBKDF2(pin, 'salt', { keySize: 256 / 32, iterations: 1000 });
      const decrypted = AES.decrypt(encryptedContent, key, { iv: enc.Hex.parse(iv) });
      const decryptedText = decrypted.toString(enc.Utf8);
  
      if (!isValidDecryptedText(decryptedText)) {
        throw new Error('Decryption produced invalid data');
      }
  
      return decryptedText;
    } catch (error) {
      console.error('Decryption failed:', error.message);
      return null;
    }
  }
  
  function isValidDecryptedText(text) {
    return typeof text === 'string' && text.length > 0;
  }