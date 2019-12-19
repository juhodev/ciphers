export enum CipherType {
	Enigma,
	Lorenz,
	Sigaba,
	Caesar,
	Vigenere,
	Vernam,
}

export abstract class Cipher {
	cipherType: CipherType;

	constructor(cipherType: CipherType) {
		this.cipherType = cipherType;
	}

	abstract encryptString(): void;
	abstract decryptString(): void;
}
