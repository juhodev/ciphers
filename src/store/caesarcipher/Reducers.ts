import { CaesarCipherState, CaesarCipherTypes, SET_RIGHT_SHIFT } from './Types';

const initialState: CaesarCipherState = {
	rightShift: 0,
};

export default function caesarCipherReducer(
	state = initialState,
	action: CaesarCipherTypes,
) {
	switch (action.type) {
		case SET_RIGHT_SHIFT:
			state.rightShift = action.payload;
			return state;

		default:
			return state;
	}
}
