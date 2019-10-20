import { Plug, ADD_PLUG, REMOVE_PLUG, SET_ROTOR_POSITIONS, SET_STARTING_POSITIONS, SET_ENIGMA_ID } from "./Types";

export function addPlug(plug: Plug) {
	return {
		type: ADD_PLUG,
		payload: plug,
	};
}

export function removePlug(plug: Plug) {
	return {
		type: REMOVE_PLUG,
		payload: plug,
	};
}

export function setRotorPositions(rotorPositions: number[]) {
	return {
		type: SET_ROTOR_POSITIONS,
		payload: rotorPositions,
	};
}

export function setStartingPositions(startingPositions: number[]) {
	return {
		type: SET_STARTING_POSITIONS,
		payload: startingPositions,
	};
}

export function setId(id: number) {
	return {
		type: SET_ENIGMA_ID,
		payload: id,
	};
}