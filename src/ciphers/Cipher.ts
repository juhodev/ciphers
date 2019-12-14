export enum CipherType {
	Enigma,
	Lorenz,
	Sigaba,
}

export abstract class Cipher {
	cipherType: CipherType;

	constructor(cipherType: CipherType) {
		this.cipherType = cipherType;
	}

	abstract encryptString(): void;
}
