export interface VernamCipherState {
	key: string;
}

export const SET_VERNAM_KEY = 'SET_VERNAM_KEY';

export interface SetVernamKey {
	type: typeof SET_VERNAM_KEY;
	payload: string;
}

export type VernamCipherTypes = SetVernamKey;
