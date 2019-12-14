import { Rotor } from "./Rotor";

export class RotorContainer {

	rotors: Rotor[];

	constructor() {
		this.rotors = [
			new Rotor(0, 2),
			new Rotor(0, 1),
			new Rotor(0, 0),
		];
	}

	roll(): void {
		let lastRoll: number = -1;

		for (let rotor of this.rotors) {
			if (lastRoll === 25 || lastRoll === -1) {
				lastRoll = rotor.roll();
			}
		}
	}
}