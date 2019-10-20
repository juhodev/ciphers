export interface CipherState {
	plainText: string;
	cipheredText: string;
};

export const SET_PLAINTEXT: string = 'SET_PLAINTEXT';
export const SET_CIPHERTEXT: string = 'SET_CIPHERTEXT';

interface SetPlainText {
	type: typeof SET_PLAINTEXT;
	payload: string;
};

interface SetCipherText {
	type: typeof SET_CIPHERTEXT;
	payload: string;
};

export type CipherActionTypes = SetPlainText | SetCipherText;