import { VigenereCipherState, VigenereCipherTypes, SET_KEY } from './Types';

const initialState: VigenereCipherState = {
	key: '',
};

export default function vigenereCipherReducer(
	state = initialState,
	action: VigenereCipherTypes,
) {
	switch (action.type) {
		case SET_KEY:
			return { key: action.payload };

		default:
			return state;
	}
}
