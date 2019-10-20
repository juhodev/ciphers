import { RotorInterface } from '../Types';

export class NumberRotor implements RotorInterface {
	characters: string[];
	forwardOrder: boolean;

	constructor(characters: string[], forwardOrder: boolean) {
		this.characters = characters;
		this.forwardOrder = forwardOrder;
	}

	roll() {
		
	}
}
