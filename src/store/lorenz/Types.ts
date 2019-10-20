export interface LorenzState {
	wheelPositions: number[];
	camPositions: number[][];
}

export interface WheelCams {
	wheel: number;
	cams: number[];
}

export const SET_CAMS: string = 'SET_CAMS';
export const SET_CAM: string = 'SET_CAM';
export const SET_WHEEL_POSITIONS: string = 'SET_WHEEL_POSITIONS';

export interface SetCamsAction {
	type: typeof SET_CAMS;
	payload: WheelCams;
}

export interface SetWheelPositionsAction {
	type: typeof SET_WHEEL_POSITIONS;
	payload: number[];
}

export interface SetCamAction {
	type: typeof SET_CAM;
	payload: [number, number, number];
}

export type LorenzActionTypes =
	| SetCamsAction
	| SetCamAction
	| SetWheelPositionsAction;
