export interface VigenereCipherState {
	key: string;
}

export const SET_KEY: string = 'SET_KEY';

export interface SetKey {
	type: typeof SET_KEY;
	payload: string;
}

export type VigenereCipherTypes = SetKey;
