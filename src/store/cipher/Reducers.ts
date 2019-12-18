import { CipherState, CipherActionTypes, SET_INPUT, SET_OUTPUT } from './Types';

const initialState: CipherState = {
	input: '',
	output: '',
};

export default function cipherReducer(
	state = initialState,
	action: CipherActionTypes,
): CipherState {
	switch (action.type) {
		case SET_INPUT:
			return { input: action.payload, output: state.output };

		case SET_OUTPUT:
			return { input: state.input, output: action.payload };

		default:
			return state;
	}
}
