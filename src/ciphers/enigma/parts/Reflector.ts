import { ReflectorType } from "../EnigmaConstants";

export class Reflector {

	reflectorType: ReflectorType;

	constructor(reflectorType: ReflectorType) {
		this.reflectorType = reflectorType;
	}

	reflect(letter: string): string {
		return this.reflectorType.reflectMap.get(letter);
	}

}