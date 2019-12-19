import { Cipher, CipherType } from '../Cipher';
import cipherStore from '../../store/Index';
import { alphabet } from '../Types';
import { setOutput } from '../../store/cipher/Actions';

/**
 * https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher
 */

export default class VigenereCipher extends Cipher {
	keyCount: number;

	constructor() {
		super(CipherType.Vigenere);

		this.keyCount = 0;
	}

	encryptString() {
		const plainText: string = cipherStore.getState().cipher.input;
		const encryptedString: string[] = [];
		const vigenereKey: string = cipherStore.getState().vigenereCipher.key;

		if (plainText.length === 0) return;
		for (let i = 0; i < plainText.length; i++) {
			encryptedString.push(
				this.encryptLetter(
					plainText[i].toUpperCase(),
					this.getKeyLetter(vigenereKey),
				),
			);
		}

		this.keyCount = 0;
		cipherStore.dispatch(
			setOutput(
				encryptedString.reduce((str: string, a: string) => str + a),
			),
		);
	}

	decryptString() {
		const cipherText: string = cipherStore.getState().cipher.input;
		const decryptedString: string[] = [];
		const vigenereKey: string = cipherStore.getState().vigenereCipher.key;

		if (cipherText.length === 0) return;
		for (let i = 0; i < cipherText.length; i++) {
			decryptedString.push(
				this.decryptLetter(
					cipherText[i].toUpperCase(),
					this.getKeyLetter(vigenereKey),
				),
			);
		}

		this.keyCount = 0;
		cipherStore.dispatch(
			setOutput(
				decryptedString.reduce((str: string, a: string) => str + a),
			),
		);
	}

	private encryptLetter(letter: string, keyLetter: string): string {
		const letterIndex: number = alphabet.indexOf(letter);
		const keyLetterIndex: number = alphabet.indexOf(keyLetter);

		const encryptedIndex: number = (letterIndex + keyLetterIndex) % 26;
		return alphabet[encryptedIndex];
	}

	private decryptLetter(letter: string, keyLetter: string) {
		const letterIndex: number = alphabet.indexOf(letter);
		const keyLetterIndex: number = alphabet.indexOf(keyLetter);

		const encryptedIndex: number = (letterIndex - keyLetterIndex) % 26;
		return alphabet[encryptedIndex];
	}

	private getKeyLetter(key: string) {
		if (this.keyCount >= key.length) {
			this.keyCount = 0;
		}

		return key[this.keyCount++].toUpperCase();
	}
}
