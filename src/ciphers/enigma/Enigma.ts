import { Cipher, CipherType } from '../Cipher';
import { Plugboard } from './parts/Plugboard';
import { Reflector } from './parts/Reflector';
import { reflectorB } from './EnigmaConstants';
import { RotorContainer } from './parts/RotorContainer';
import { Rotor } from './parts/Rotor';
import { getLetterFromAlphabet } from './Utils';
import cipherStore from '../../store/Index';
import { setStartingPositions } from '../../store/enigma/Actions';
import { setOutput } from '../../store/cipher/Actions';

export class Enigma extends Cipher {
	alphabet: string[];
	rotorContainer: RotorContainer;
	reflector: Reflector;
	plugboard: Plugboard;

	constructor() {
		super(CipherType.Enigma);

		this.alphabet = [
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J',
			'K',
			'L',
			'M',
			'N',
			'O',
			'P',
			'Q',
			'R',
			'S',
			'T',
			'U',
			'V',
			'W',
			'X',
			'Y',
			'Z',
		];
		this.rotorContainer = new RotorContainer();
		this.reflector = new Reflector(reflectorB);
		this.plugboard = new Plugboard();
	}

	encryptString(): void {
		this.setEnigmaSettings();

		const encryptedString: string[] = [];
		let plainText: string = cipherStore.getState().cipher.input;
		plainText = plainText.replace(/[\s]/g, '');

		if (plainText.length === 0) return;
		for (let i: number = 0; i < plainText.length; i++) {
			encryptedString.push(
				this.encryptLetter(plainText[i].toUpperCase()),
			);
		}

		cipherStore.dispatch(
			setOutput(
				encryptedString.reduce((str: string, a: string) => str + a),
			),
		);

		cipherStore.dispatch(
			setStartingPositions(
				this.rotorContainer.rotors.map(w => w.currentPosition),
			),
		);
	}

	decryptString() {
		this.encryptString();
	}

	private setEnigmaSettings(): void {
		const rotorPositions: number[] = cipherStore.getState().enigma
			.rotorPositions;
		const startingPositions: number[] = cipherStore.getState().enigma
			.startingPositions;

		this.rotorContainer.rotors = [];

		for (let rotor of rotorPositions) {
			this.rotorContainer.rotors.push(
				new Rotor(cipherStore.getState().enigma.id, rotor),
			);
		}

		this.rotorContainer.rotors.forEach((rotor: Rotor, i: number) => {
			rotor.rotateTill(startingPositions[i]);
		});
	}

	private encryptLetter(letter: string): string {
		letter = this.plugboard.check(letter);
		this.rotorContainer.roll();

		let rotorLetter: string;
		let letterInt: number = this.alphabet.findIndex(
			(l: string) => l === letter,
		);

		this.rotorContainer.rotors.forEach((rotor: Rotor, i: number) => {
			if (i === 0) {
				rotorLetter = getLetterFromAlphabet(letterInt, rotor.alphabet);
			} else {
				rotorLetter = getLetterFromAlphabet(
					letterInt -
						this.rotorContainer.rotors[i - 1].currentPosition,
					rotor.alphabet,
				);
			}

			letterInt = this.alphabet.findIndex(
				(l: string) => l === rotorLetter,
			);
		});

		rotorLetter = this.reflector.reflect(rotorLetter);

		for (let i: number = 0; i < this.rotorContainer.rotors.length; i++) {
			let tempI: number = this.rotorContainer.rotors.length - 1 - i;

			if (i === 0) {
				letterInt = this.rotorContainer.rotors[
					tempI
				].getPositionByLetter(rotorLetter);
			} else {
				rotorLetter = getLetterFromAlphabet(
					letterInt +
						this.rotorContainer.rotors[tempI].currentPosition,
					this.alphabet,
				);
				letterInt = this.rotorContainer.rotors[
					tempI
				].getPositionByLetter(rotorLetter);
			}
		}

		rotorLetter = getLetterFromAlphabet(letterInt, this.alphabet);
		rotorLetter = this.plugboard.check(rotorLetter);

		return rotorLetter;
	}
}
