import { EnigmaActionTypes, ADD_PLUG, REMOVE_PLUG, EnigmaState, RemovePlugAction, AddPlugAction, SET_ROTOR_POSITIONS, SET_STARTING_POSITIONS, SetRotorPositionsAction, SetStartingPositionsAction, SET_ENIGMA_ID, SetId } from "./Types";

const initialState: EnigmaState = {
	plugs: new Map<string, string>(),
	rotorPositions: [0, 1, 2],
	startingPositions: [0, 0, 0],
	id: 0,
};

export default function enigmaReducer(
	state = initialState,
	action: EnigmaActionTypes,
): EnigmaState {
	switch (action.type) {
		case ADD_PLUG:
			return Object.assign({}, state, {
				plugs: state.plugs.set(
					(action as AddPlugAction).payload.in,
					(action as AddPlugAction).payload.out)
					.set((action as AddPlugAction).payload.out,
						(action as AddPlugAction).payload.in),
			})

		case REMOVE_PLUG:
			[(action as RemovePlugAction).payload.in, (action as RemovePlugAction).payload.out]
				.forEach(plug => state.plugs.delete(plug));
			return Object.assign({}, state, { plugs: state.plugs });

		case SET_ROTOR_POSITIONS:
			return Object.assign({}, state, {
				rotorPositions: (action as SetRotorPositionsAction).payload,
			});

		case SET_STARTING_POSITIONS:
			return Object.assign({}, state, {
				startingPositions: (action as SetStartingPositionsAction).payload,
			});

		case SET_ENIGMA_ID:
			return Object.assign({}, state, { id: (action as SetId).payload });

		default:
			return state;
	}
}