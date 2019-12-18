import { SET_INPUT, SET_OUTPUT } from './Types';

export function setInput(s: string) {
	return {
		type: SET_INPUT,
		payload: s,
	};
}

export function setOutput(s: string) {
	return {
		type: SET_OUTPUT,
		payload: s,
	};
}
