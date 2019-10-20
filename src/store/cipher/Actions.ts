import { SET_PLAINTEXT, SET_CIPHERTEXT } from "./Types";

export function setPlainText(s: string) {
	return {
		type: SET_PLAINTEXT,
		payload: s,
	};
}

export function setCipheredText(s: string) {
	return {
		type: SET_CIPHERTEXT,
		payload: s,
	};
}