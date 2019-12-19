import { Cipher, CipherType } from '../Cipher';
import { TeleprinterCode } from '../lorenz/parts/TeleprinterCode';
import cipherStore from '../../store/Index';
import { setOutput } from '../../store/cipher/Actions';

export default class VernamCipher extends Cipher {
	teleprinterCode: TeleprinterCode;

	constructor() {
		super(CipherType.Vernam);

		this.teleprinterCode = new TeleprinterCode();
		this.teleprinterCode.init();
	}

	encryptString() {
		const plainText: string = cipherStore.getState().cipher.input;
		const encryptedString: string[] = [];
		const keyStream: string = cipherStore.getState().vernamCipher.key;

		if (keyStream.length < plainText.length) {
			window.alert('key is too short');
			return;
		}

		if (plainText.length === 0) return;
		for (let i = 0; i < plainText.length; i++) {
			encryptedString.push(this.xorLetters(plainText[i], keyStream[i]));
		}

		cipherStore.dispatch(
			setOutput(
				encryptedString.reduce((str: string, a: string) => str + a),
			),
		);
	}

	decryptString() {
		this.encryptString();
	}

	private xorLetters(letter: string, keyLetter: string): string {
		const letterCode: number = this.teleprinterCode.to(letter);
		const keyLetterCode: number = this.teleprinterCode.to(keyLetter);
		const xor: number = letterCode ^ keyLetterCode;
		return this.teleprinterCode.from(xor);
	}
}
