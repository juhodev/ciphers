export class Wheel {

	cams: number[];
	size: number;
	currentPosition: number;

	constructor(size: number, cams: number[]) {
		this.currentPosition = 0;
		this.size = size;
		this.cams = cams;
	}

	setCurrentPosition(position: number): void {
		this.currentPosition = position;
	}

	roll(): void {
		this.nextWheelPosition();
	}

	getCurrentBit(): number {
		return this.cams[this.currentPosition];
	}

	private nextWheelPosition(): void {
		if (this.currentPosition === 0) {
			this.currentPosition = this.size - 1;
			return;
		}

		this.currentPosition--;
	}

}