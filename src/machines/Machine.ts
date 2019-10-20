export enum MachineType {
	Enigma,
	Lorenz,
	Sigaba,
}

export abstract class Machine {
	machineType: MachineType;

	constructor(machineType: MachineType) {
		this.machineType = machineType;
	}

	abstract encryptString(): void;
}