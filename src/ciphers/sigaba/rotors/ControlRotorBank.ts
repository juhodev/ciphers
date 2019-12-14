import { AlphabetRotor } from './AlphabetRotor';
import { RotorBankInterface } from '../Types';
import { alphabet } from '../../Types';
import { getLetterFromAlphabet } from '../../enigma/Utils';

export class ControlRotorBank implements RotorBankInterface {
	rotors: AlphabetRotor[];
	private fastRotor: AlphabetRotor;
	private mediumRotor: AlphabetRotor;
	private slowRotor: AlphabetRotor;

	constructor(rotors: AlphabetRotor[]) {
		this.rotors = rotors;

		this.fastRotor = this.rotors[3];
		this.mediumRotor = this.rotors[4];
		this.slowRotor = this.rotors[2];
	}

	activate(x: string): string {
		// TODO: Figure out if this should happen before or after the signal goes through
		// Fast rotor steps o nce for each letter keyed to the keyboard
		const fastRotorLetter: string =
			alphabet[this.fastRotor.currentPosition];

		this.fastRotor.roll();

		// Medium rotor steps one every time the fast rotor transitions from O to another letter
		if (fastRotorLetter === 'O') {
			const mediumRotorLetter: string =
				alphabet[this.mediumRotor.currentPosition];

			this.mediumRotor.roll();

			// The slow rotor steps every time the medium rotor makes a transition from O to N in the forward position or O to P in the reverse position
			if (
				(this.mediumRotor.forwardOrder &&
					mediumRotorLetter === 'O' &&
					alphabet[this.mediumRotor.currentPosition] == 'N') ||
				(!this.mediumRotor.forwardOrder &&
					mediumRotorLetter === 'O' &&
					alphabet[this.mediumRotor.currentPosition] == 'P')
			) {
				this.slowRotor.roll();
			}
		}

		// Signal goes through rotors

		let rotorLetter: string;
		let letterInt: number = alphabet.findIndex((l: string) => l === x);

		// The 5th rotor is the one on the right side
		let lastRotor: AlphabetRotor;

		for (const rotor of this.rotors.reverse()) {
			if (lastRotor == undefined) {
				rotorLetter = getLetterFromAlphabet(
					letterInt,
					rotor.characters,
				);
			} else {
				rotorLetter = getLetterFromAlphabet(
					letterInt - lastRotor.currentPosition,
					rotor.characters,
				);
			}

			lastRotor = rotor;
			letterInt = alphabet.findIndex((l: string) => l === rotorLetter);
			console.log(`letter: ${rotorLetter}`);
		}

		return rotorLetter;
	}
}
