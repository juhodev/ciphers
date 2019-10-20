import { CipherState, CipherActionTypes, SET_CIPHERTEXT, SET_PLAINTEXT } from "./Types";

const initialState: CipherState = {
	plainText: '',
	cipheredText: '',
};

export default function cipherReducer(
	state = initialState,
	action: CipherActionTypes,
): CipherState {
	switch (action.type) {
		case SET_PLAINTEXT:
			return { plainText: action.payload, cipheredText: state.cipheredText };

		case SET_CIPHERTEXT:
			return { plainText: state.plainText, cipheredText: action.payload };

		default:
			return state;
	}
};