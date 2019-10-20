import { enigmas } from "../EnigmaConstants";

export class Rotor {

	alphabet: string[];
	currentPosition: number;

	constructor(id: number, rotorNumber: number) {
		this.alphabet = enigmas[id].rotors[rotorNumber].slice();
		this.currentPosition = 0;
	}

	roll(): number {
		this.rotate();
		return this.currentPosition;
	}

	getCurrentLetter(): string {
		return this.alphabet[0];
	}

	getPositionByLetter(letter: string): number {
		return this.alphabet.findIndex((l: string) => l === letter);
	}

	rotateTill(num: number): void {
		let roll: number = this.currentPosition;

		while (roll != num) {
			roll = this.roll();
		}
	}

	private rotate(): void {
		if (this.currentPosition === 25) {
			this.currentPosition = 0;
		} else {
			this.currentPosition++;
		}

		this.alphabet.push(this.alphabet.shift());
	}

}