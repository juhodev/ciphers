export interface EnigmaState {
	plugs: Map<string, string>;
	rotorPositions: number[];
	startingPositions: number[];
	id: number;
}

export interface Plug {
	in: string;
	out: string;
}

export const ADD_PLUG: string = 'ADD_PLUG';
export const REMOVE_PLUG: string = 'RMEOVE_PLUG';
export const SET_ROTOR_POSITIONS: string = 'SET_ROTOR_POSITIONS';
export const SET_STARTING_POSITIONS: string = 'SET_STARTING_POSITIONS';
export const SET_ENIGMA_ID: string = 'SET_ENIGMA_ID';

export interface AddPlugAction {
	type: typeof ADD_PLUG;
	payload: Plug;
}

export interface RemovePlugAction {
	type: typeof REMOVE_PLUG;
	payload: Plug;
}

export interface SetRotorPositionsAction {
	type: typeof SET_ROTOR_POSITIONS;
	payload: number[];
}

export interface SetStartingPositionsAction {
	type: typeof SET_STARTING_POSITIONS;
	payload: number[];
}

export interface SetId {
	type: typeof SET_ENIGMA_ID;
	payload: number;
}

export type EnigmaActionTypes =
	| SetId
	| RemovePlugAction
	| SetRotorPositionsAction
	| SetStartingPositionsAction
	| AddPlugAction;
