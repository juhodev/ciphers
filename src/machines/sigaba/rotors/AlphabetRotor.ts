import { RotorInterface, SigabaAlphabets } from '../Types';

export class AlphabetRotor implements RotorInterface {
	characters: string[];
	forwardOrder: boolean;
	currentPosition: number;

	constructor(alphabetIndex: number, forwardOrder: boolean) {
		this.characters = SigabaAlphabets[alphabetIndex];
		this.forwardOrder = forwardOrder;
		this.currentPosition = 0;
	}

	getLetter(): string {
		return this.characters[this.currentPosition];
	}

	roll() {
		if (this.forwardOrder) {
			if (this.currentPosition == this.characters.length - 1) {
				this.currentPosition = 0;
			} else {
				this.currentPosition++;
			}

			this.characters.push(this.characters.shift());
		} else {
			if (this.currentPosition == 0) {
				this.currentPosition = this.characters.length;
			} else {
				this.currentPosition--;
			}

			this.characters.unshift(this.characters.pop());
		}
	}
}
