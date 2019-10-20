export class TeleprinterCode {

	codeFromString: Map<string, number>;
	codeToString: Map<number, string>;

	constructor() {
		this.codeFromString = new Map();
		this.codeToString = new Map();
	}

	init(): void {
		this.codeFromString.set('A', 0b11000);
		this.codeFromString.set('B', 0b10011);
		this.codeFromString.set('C', 0b01110);
		this.codeFromString.set('D', 0b10010);
		this.codeFromString.set('E', 0b10000);
		this.codeFromString.set('F', 0b10110);
		this.codeFromString.set('G', 0b01011);
		this.codeFromString.set('H', 0b00101);
		this.codeFromString.set('I', 0b01100);
		this.codeFromString.set('J', 0b11010);
		this.codeFromString.set('K', 0b11110);
		this.codeFromString.set('L', 0b01001);
		this.codeFromString.set('M', 0b00111);
		this.codeFromString.set('N', 0b00110);
		this.codeFromString.set('O', 0b00011);
		this.codeFromString.set('P', 0b01101);
		this.codeFromString.set('Q', 0b11101);
		this.codeFromString.set('R', 0b01010);
		this.codeFromString.set('S', 0b10100);
		this.codeFromString.set('T', 0b00001);
		this.codeFromString.set('U', 0b11100);
		this.codeFromString.set('V', 0b01111);
		this.codeFromString.set('W', 0b11001);
		this.codeFromString.set('X', 0b10111);
		this.codeFromString.set('Y', 0b10101);
		this.codeFromString.set('Z', 0b10001);
		this.codeFromString.set('/', 0b00000);//NULL String
		this.codeToString.set(0b11000, 'A');
		this.codeToString.set(0b10011, 'B');
		this.codeToString.set(0b01110, 'C');
		this.codeToString.set(0b10010, 'D');
		this.codeToString.set(0b10000, 'E');
		this.codeToString.set(0b10110, 'F');
		this.codeToString.set(0b01011, 'G');
		this.codeToString.set(0b00101, 'H');
		this.codeToString.set(0b01100, 'I');
		this.codeToString.set(0b11010, 'J');
		this.codeToString.set(0b11110, 'K');
		this.codeToString.set(0b01001, 'L');
		this.codeToString.set(0b00111, 'M');
		this.codeToString.set(0b00110, 'N');
		this.codeToString.set(0b00011, 'O');
		this.codeToString.set(0b01101, 'P');
		this.codeToString.set(0b11101, 'Q');
		this.codeToString.set(0b01010, 'R');
		this.codeToString.set(0b10100, 'S');
		this.codeToString.set(0b00001, 'T');
		this.codeToString.set(0b11100, 'U');
		this.codeToString.set(0b01111, 'V');
		this.codeToString.set(0b11001, 'W');
		this.codeToString.set(0b10111, 'X');
		this.codeToString.set(0b10101, 'Y');
		this.codeToString.set(0b10001, 'Z');
		this.codeToString.set(0b00000, '/');//NULL String
		this.codeToString.set(0b00010, '3');
		this.codeToString.set(0b01000, '4');
		this.codeToString.set(0b11111, '8');
		this.codeToString.set(0b11011, '5');
		this.codeToString.set(0b00100, '9');
		this.codeFromString.set('3', 0b00010);
		this.codeFromString.set('4', 0b01000);
		this.codeFromString.set('8', 0b11111);
		this.codeFromString.set('5', 0b11011);
		this.codeFromString.set('9', 0b00100);
	}

	to(s: string): number {
		return this.codeFromString.get(s);
	}

	from(bits: number): string {
		return this.codeToString.get(bits);
	}

}