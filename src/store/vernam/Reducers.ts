import { VernamCipherState, VernamCipherTypes, SET_VERNAM_KEY } from './Types';

const initialState: VernamCipherState = {
	key: '',
};

export default function vernamCipherReducer(
	state = initialState,
	action: VernamCipherTypes,
) {
	switch (action.type) {
		case SET_VERNAM_KEY:
			return { key: action.payload };

		default:
			return state;
	}
}
