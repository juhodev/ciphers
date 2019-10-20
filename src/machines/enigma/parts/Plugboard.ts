import cipherStore from "../../../store/Index";
import { enigmas } from "../EnigmaConstants";

export class Plugboard {

	check(letter: string): string {
		const enigmaId: number = cipherStore.getState().enigma.id;
		if (enigmas[enigmaId].hasPlugboard) {
			if (cipherStore.getState().enigma.plugs.has(letter)) {
				return cipherStore.getState().enigma.plugs.get(letter);
			}
		}

		return letter;
	}

}