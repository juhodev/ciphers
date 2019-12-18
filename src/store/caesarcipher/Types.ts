export interface CaesarCipherState {
	rightShift: number;
}

export const SET_RIGHT_SHIFT: string = 'SET_RIGHT_SHIFT';

export interface SetRightShift {
	type: typeof SET_RIGHT_SHIFT;
	payload: number;
}

export type CaesarCipherTypes = SetRightShift;
