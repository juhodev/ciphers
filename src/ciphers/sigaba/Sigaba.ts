import { Cipher, CipherType } from '../Cipher';
import { ControlRotorBank } from './rotors/ControlRotorBank';
import { AlphabetRotor } from './rotors/AlphabetRotor';
import { alphabet } from '../Types';

export class Sigaba extends Cipher {
	constructor() {
		super(CipherType.Sigaba);
	}

	encryptString() {
		const bank: ControlRotorBank = new ControlRotorBank([
			new AlphabetRotor(0, true),
			new AlphabetRotor(1, true),
			new AlphabetRotor(2, true),
			new AlphabetRotor(3, true),
			new AlphabetRotor(4, true),
		]);

		const controlInputs: string[] = [
			bank.activate('A'),
			bank.activate('B'),
			bank.activate('C'),
			bank.activate('D'),
		];

		console.log(`got this: ${controlInputs}`);
		console.log(
			`hmm ${alphabet.indexOf(controlInputs[0]) |
				alphabet.indexOf(controlInputs[1]) |
				alphabet.indexOf(controlInputs[2]) |
				alphabet.indexOf(controlInputs[3])}`,
		);
	}

	decryptString() {}
}
