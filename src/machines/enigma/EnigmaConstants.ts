export const enigmas: EnigmaInfo[] = [
	{
		rotors: [
			["D", "M", "T", "W", "S", "I", "L", "R", "U", "Y", "Q", "N", "K", "F", "E", "J", "C", "A", "Z", "B", "P", "G", "X", "O", "H", "V"],
			["H", "Q", "Z", "G", "P", "J", "T", "M", "O", "B", "L", "N", "C", "I", "F", "D", "Y", "A", "W", "V", "E", "U", "S", "R", "K", "X"],
			["U", "Q", "N", "T", "L", "S", "Z", "F", "M", "R", "E", "H", "D", "P", "X", "K", "I", "B", "V", "Y", "G", "J", "C", "W", "O", "A"],
		],
		hasPlugboard: false,
		machineRotors: 3,
		id: '0',
		introduced: '1924',
		displayName: 'Commercial Enigma A, B',
		name: 'commercialEnigma',
	},
	{
		rotors: [
			["E", "K", "M", "F", "L", "G", "D", "Q", "V", "Z", "N", "T", "O", "W", "Y", "H", "X", "U", "S", "P", "A", "I", "B", "R", "C", "J"],
			["A", "J", "D", "K", "S", "I", "R", "U", "X", "B", "L", "H", "W", "T", "M", "C", "Q", "G", "Z", "N", "P", "Y", "F", "V", "O", "E"],
			["B", "D", "F", "H", "J", "L", "C", "P", "R", "T", "X", "V", "Z", "N", "Y", "E", "I", "W", "G", "A", "K", "M", "U", "S", "Q", "O"],
		],
		hasPlugboard: true,
		machineRotors: 3,
		id: '1',
		introduced: '1930',
		displayName: 'Enigma 1',
		name: 'enigmaOne',
	},
	{
		rotors: [
			["E", "K", "M", "F", "L", "G", "D", "Q", "V", "Z", "N", "T", "O", "W", "Y", "H", "X", "U", "S", "P", "A", "I", "B", "R", "C", "J"],
			["A", "J", "D", "K", "S", "I", "R", "U", "X", "B", "L", "H", "W", "T", "M", "C", "Q", "G", "Z", "N", "P", "Y", "F", "V", "O", "E"],
			["B", "D", "F", "H", "J", "L", "C", "P", "R", "T", "X", "V", "Z", "N", "Y", "E", "I", "W", "G", "A", "K", "M", "U", "S", "Q", "O"],
			["E", "S", "O", "V", "P", "Z", "J", "A", "Y", "Q", "U", "I", "R", "H", "X", "L", "N", "F", "T", "G", "K", "D", "C", "M", "W", "B"],
			["V", "Z", "B", "R", "G", "I", "T", "Y", "U", "P", "S", "D", "N", "H", "L", "X", "A", "W", "M", "J", "Q", "O", "F", "E", "C", "K"],
		],
		hasPlugboard: true,
		machineRotors: 3,
		id: '2',
		introduced: 'December 1938',
		displayName: 'M3 Army',
		name: 'armyEnigma',
	},
	{
		rotors: [
			["E", "K", "M", "F", "L", "G", "D", "Q", "V", "Z", "N", "T", "O", "W", "Y", "H", "X", "U", "S", "P", "A", "I", "B", "R", "C", "J"],
			["A", "J", "D", "K", "S", "I", "R", "U", "X", "B", "L", "H", "W", "T", "M", "C", "Q", "G", "Z", "N", "P", "Y", "F", "V", "O", "E"],
			["B", "D", "F", "H", "J", "L", "C", "P", "R", "T", "X", "V", "Z", "N", "Y", "E", "I", "W", "G", "A", "K", "M", "U", "S", "Q", "O"],
			["E", "S", "O", "V", "P", "Z", "J", "A", "Y", "Q", "U", "I", "R", "H", "X", "L", "N", "F", "T", "G", "K", "D", "C", "M", "W", "B"],
			["V", "Z", "B", "R", "G", "I", "T", "Y", "U", "P", "S", "D", "N", "H", "L", "X", "A", "W", "M", "J", "Q", "O", "F", "E", "C", "K"],
			["J", "P", "G", "V", "O", "U", "M", "F", "Y", "Q", "B", "E", "N", "H", "Z", "R", "D", "K", "A", "S", "X", "L", "I", "C", "T", "W"],
			["N", "Z", "J", "H", "G", "R", "C", "X", "M", "Y", "S", "W", "B", "O", "U", "F", "A", "I", "V", "L", "P", "E", "K", "Q", "D", "T"],
			["F", "K", "Q", "H", "T", "L", "X", "O", "C", "B", "J", "S", "P", "D", "Z", "R", "A", "M", "E", "W", "N", "I", "U", "Y", "G", "V"],
		],
		hasPlugboard: true,
		machineRotors: 4,
		id: '3',
		introduced: '1939',
		displayName: 'M4 Naval',
		name: 'navalEnigma',
	}
]

export const reflectorB: ReflectorType = {
	name: 'Reflector B',
	reflectMap: new Map<string, string>([
		['A', 'Y'],
		['B', 'R'],
		['C', 'U'],
		['D', 'H'],
		['E', 'Q'],
		['F', 'S'],
		['G', 'L'],
		['H', 'D'],
		['I', 'P'],
		['J', 'X'],
		['K', 'N'],
		['L', 'G'],
		['M', 'O'],
		['N', 'K'],
		['O', 'M'],
		['P', 'I'],
		['Q', 'E'],
		['R', 'B'],
		['S', 'F'],
		['T', 'Z'],
		['U', 'C'],
		['V', 'W'],
		['W', 'V'],
		['X', 'J'],
		['Y', 'A'],
		['Z', 'T'],
	])
}

export type EnigmaInfo = {
	rotors: string[][],
	hasPlugboard: boolean,
	machineRotors: number,
	id: string,
	introduced: string,
	displayName: string,
	name: string,
};

export type ReflectorType = {
	name: string,
	reflectMap: Map<string, string>,
};