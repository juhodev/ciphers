import { SET_RIGHT_SHIFT } from './Types';

export function setRightShift(rightShift: number) {
	return {
		type: SET_RIGHT_SHIFT,
		payload: rightShift,
	};
}
