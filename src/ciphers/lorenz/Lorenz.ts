import { Cipher, CipherType } from '../Cipher';
import { Wheel } from './parts/Wheel';
import { TeleprinterCode } from './parts/TeleprinterCode';
import cipherStore from '../../store/Index';
import { setCipheredText } from '../../store/cipher/Actions';
import { setCams, setWheelPositions } from '../../store/lorenz/Actions';

export class Lorenz extends Cipher {
	wheels: Wheel[];
	teleprinterCode: TeleprinterCode;

	constructor() {
		super(CipherType.Lorenz);

		this.wheels = [];
		this.teleprinterCode = new TeleprinterCode();
		this.teleprinterCode.init();
	}

	encryptString(): void {
		this.setSettings();

		const encryptedString: string[] = [];
		let plainText: string = cipherStore.getState().cipher.plainText;
		plainText = plainText.replace(/[\s]/g, '');

		if (plainText.length === 0) return;

		for (let i: number = 0; i < plainText.length; i++) {
			encryptedString.push(this.encryptLetter(plainText[i]));
		}

		cipherStore.dispatch(
			setCipheredText(
				encryptedString.reduce((str: string, a: string) => str + a),
			),
		);

		this.wheels.forEach((wheel, i) => {
			cipherStore.dispatch(setCams({ wheel: i, cams: wheel.cams }));
		});

		cipherStore.dispatch(
			setWheelPositions(this.wheels.map(w => w.currentPosition)),
		);
	}

	private encryptLetter(s: string): string {
		this.rotateWheels();

		const random5BitLetters: number[] = this.get5BitLettersFromWheels();
		const randomXOR: number = random5BitLetters[0] ^ random5BitLetters[1];

		const inputCode: number = this.teleprinterCode.to(s);
		const inputXORwithRandom: number = inputCode ^ randomXOR;

		const encrypted: string = this.teleprinterCode.from(inputXORwithRandom);
		return encrypted;
	}

	private rotateWheels(): void {
		if (this.wheels[6].getCurrentBit() === 0b1) {
			this.wheels[5].roll();
		}

		if (this.wheels[5].getCurrentBit() === 0b1) {
			for (let i: number = 0; i < 5; i++) {
				this.wheels[i].roll();
			}
		}

		for (let i: number = 0; i < 6; i++) {
			this.wheels[6 + i].roll();
		}
	}

	private get5BitLettersFromWheels(): number[] {
		let leftWheels: number = 0;
		let rightWheels: number = 0;

		for (let i = 0; i < 5; i++) {
			const leftWheelBit: number = this.wheels[i].getCurrentBit();
			leftWheels = leftWheels | (leftWheelBit << i);

			const rightWheelBit: number = this.wheels[7 + i].getCurrentBit();
			rightWheels = rightWheels | (rightWheelBit << i);
		}

		return [leftWheels, rightWheels];
	}

	private setSettings(): void {
		const wheels: number[][] = cipherStore.getState().lorenz.camPositions;
		const wheelPositions: number[] = cipherStore.getState().lorenz
			.wheelPositions;

		if (this.wheels.length === 0) {
			wheels.forEach(wheel => {
				this.wheels.push(new Wheel(wheel.length, wheel));
			});
		} else {
			this.wheels.map((wheel, i) => {
				wheel.cams = wheels[i];
				wheel.setCurrentPosition(wheelPositions[i]);
			});
		}
	}
}
