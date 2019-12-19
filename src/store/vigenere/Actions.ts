import { SET_KEY } from './Types';

export function setKey(key: string) {
	return {
		type: SET_KEY,
		payload: key,
	};
}
