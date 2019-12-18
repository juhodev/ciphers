import { Cipher, CipherType } from '../Cipher';
import cipherStore from '../../store/Index';
import { alphabet } from '../Types';
import { setOutput } from '../../store/cipher/Actions';

export default class CaesarCipher extends Cipher {
	constructor() {
		super(CipherType.Caesar);
	}

	encryptString() {
		const plainText: string = cipherStore.getState().cipher.input;
		const encryptedString: string[] = [];
		const rightShift: number = cipherStore.getState().caesarCipher
			.rightShift;

		if (plainText.length === 0) return;
		for (let i = 0; i < plainText.length; i++) {
			encryptedString.push(
				this.encryptLetter(plainText[i].toUpperCase(), rightShift),
			);
		}

		cipherStore.dispatch(
			setOutput(
				encryptedString.reduce((str: string, a: string) => str + a),
			),
		);
	}

	decryptString() {
		const plainText: string = cipherStore.getState().cipher.input;
		const encryptedString: string[] = [];
		const rightShift: number = cipherStore.getState().caesarCipher
			.rightShift;

		if (plainText.length === 0) return;
		for (let i = 0; i < plainText.length; i++) {
			encryptedString.push(
				this.decryptLetter(plainText[i].toUpperCase(), rightShift),
			);
		}

		cipherStore.dispatch(
			setOutput(
				encryptedString.reduce((str: string, a: string) => str + a),
			),
		);
	}

	private decryptLetter(letter: string, rightShift: number): string {
		const letterIndex: number = alphabet.indexOf(letter);
		let shifted: number = letterIndex - rightShift;
		if (shifted < 0) shifted += 26;
		return alphabet[shifted];
	}

	private encryptLetter(letter: string, rightShift: number): string {
		const letterIndex: number = alphabet.indexOf(letter);
		let shifted: number = letterIndex + rightShift;
		if (shifted > 26) shifted -= 26;
		return alphabet[shifted];
	}
}
