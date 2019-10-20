import { RotorBankInterface } from '../Types';
import { NumberRotor } from './NumberRotor';

export class IndexRotorBank implements RotorBankInterface {
	rotors: NumberRotor[];

	constructor(rotors: NumberRotor[]) {
		this.rotors = rotors;
	}

	activate(x: string[]) {
		for (const rotor in this.rotors) {
			this.shouldActivate(x, parseInt(rotor));
		}
	}

	private shouldActivate(inputs: string[], rotorPosition: number): boolean {
		for (const s of inputs) {
			switch (rotorPosition) {
				case 0:
					if (s === 'B') return true;
					else break;
				case 1:
					if (s === 'C') return true;
					else break;
				case 2:
					if (s === 'D' || s === 'E') return true;
					else break;
				case 3:
					if (s === 'F' || s === 'G' || s === 'H') return true;
					else break;
				case 4:
					if (s === 'I' || s === 'J' || s === 'K') return true;
					else break;

				case 5:
					if (s === 'L' || s == 'M' || s === 'N' || s === 'O')
						return true;
					else break;

				case 6:
					if (
						s === 'P' ||
						s === 'Q' ||
						s === 'R' ||
						s === 'S' ||
						s === 'T'
					)
						return true;
					else break;

				case 7:
					if (
						s === 'U' ||
						s === 'V' ||
						s === 'W' ||
						s === 'X' ||
						s === 'X' ||
						s === 'Y' ||
						s === 'Z'
					)
						return true;
					else break;

				case 8:
					if (s === 'A') return true;
					else break;
			}
		}
	}
}
