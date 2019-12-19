import { SET_VERNAM_KEY } from './Types';

export function setVernamKey(key: string) {
	return {
		type: SET_VERNAM_KEY,
		payload: key,
	};
}
