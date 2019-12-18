export interface CipherState {
	input: string;
	output: string;
}

export const SET_INPUT: string = 'SET_INPUT';
export const SET_OUTPUT: string = 'SET_OUTPUT';

interface SetInput {
	type: typeof SET_INPUT;
	payload: string;
}

interface SetOutput {
	type: typeof SET_OUTPUT;
	payload: string;
}

export type CipherActionTypes = SetInput | SetOutput;
