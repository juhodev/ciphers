import {
	WheelCams,
	SET_CAMS,
	SET_CAM,
	SET_WHEEL_POSITIONS,
	SetWheelPositionsAction,
	SetCamAction,
	SetCamsAction,
} from './Types';

export function setCams(wheelCams: WheelCams): SetCamsAction {
	return {
		type: SET_CAMS,
		payload: wheelCams,
	};
}

export function setCam(
	wheel: number,
	cam: number,
	value: number,
): SetCamAction {
	return {
		type: SET_CAM,
		payload: [wheel, cam, value],
	};
}

export function setWheelPositions(
	wheelPositions: number[],
): SetWheelPositionsAction {
	return {
		type: SET_WHEEL_POSITIONS,
		payload: wheelPositions,
	};
}
