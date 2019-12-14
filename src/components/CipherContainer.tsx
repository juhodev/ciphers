import * as React from 'react';
import { EnigmaState } from '../store/enigma/Types';
import {
	addPlug,
	removePlug,
	setId,
	setRotorPositions,
	setStartingPositions,
} from '../store/enigma/Actions';
import { setPlainText, setCipheredText } from '../store/cipher/Actions';
import { connect } from 'react-redux';
import { AppState } from '../store/Index';
import { Enigma } from '../ciphers/enigma/Enigma';
import TextArea from './UI/TextArea';
import './CipherContainer.scss';
import { enigmas, EnigmaInfo } from '../ciphers/enigma/EnigmaConstants';
import { CipherState } from '../store/cipher/Types';
import { SelectOption } from './Types';
import { Cipher, CipherType } from '../ciphers/Cipher';
import {
	calculateEnigmaPossibilities,
	getLorenzPossibilities,
} from '../ciphers/enigma/Utils';
import PlugContainer from './enigma/PlugContainer';
import EnigmaSettings from './enigma/EnigmaSettings';
import { LorenzState } from '../store/lorenz/Types';
import LorenzSettings from './lorenz/LorenzSettings';
import { setCam, setWheelPositions } from '../store/lorenz/Actions';
import { Lorenz } from '../ciphers/lorenz/Lorenz';
import Select from './UI/Select';

interface CipherContainerProps {
	addPlug: typeof addPlug;
	removePlug: typeof removePlug;
	setId: typeof setId;
	setRotorPositions: typeof setRotorPositions;
	setStartingPositions: typeof setStartingPositions;
	enigma: EnigmaState;
	setPlainText: typeof setPlainText;
	setCipheredText: typeof setCipheredText;
	cipher: CipherState;
	lorenz: LorenzState;
	setCam: typeof setCam;
	setWheelPositions: typeof setWheelPositions;
}

interface CipherContainerState {
	plaintext: string;
	machine: CipherType;
}

class CipherContainer extends React.Component<
	CipherContainerProps,
	CipherContainerState
> {
	cipher: Cipher;

	constructor(props: any) {
		super(props);

		this.setCipher();
		// this.cipher = new Enigma();
		// this.state = { plaintext: '', machine: CipherType.Enigma };
		this.encryptString = this.encryptString.bind(this);
	}

	setCipher() {
		const { pathname } = window.location;

		switch (pathname) {
			case '/enigma':
				this.cipher = new Enigma();
				this.state = { plaintext: '', machine: CipherType.Enigma };
				break;

			case '/lorenz':
				this.cipher = new Lorenz();
				this.state = { plaintext: '', machine: CipherType.Lorenz };
				break;

			default:
				window.alert(
					`${pathname.substr(1, pathname.length)} not found`,
				);
		}
	}

	encryptString(): void {
		this.props.setPlainText(this.state.plaintext);
		this.cipher.encryptString();
	}

	validInput(s: string): boolean {
		const { machine } = this.state;

		if (machine === CipherType.Enigma) {
			return /[a-zA-Z\s]/.test(s);
		} else if (machine === CipherType.Lorenz) {
			return /[a-zA-Z^(3|4|5|8|9)$\s]/.test(s);
		}
	}

	render() {
		const { plaintext, machine } = this.state;
		const enigmaInfo = enigmas[this.props.enigma.id];

		return (
			<div id="container">
				{machine === CipherType.Enigma ? (
					<EnigmaSettings
						enigma={this.props.enigma}
						setId={this.props.setId}
						setRotorPositions={this.props.setRotorPositions}
						setStartingPositions={this.props.setStartingPositions}
					/>
				) : (
					<LorenzSettings
						cams={this.props.lorenz.camPositions}
						setCam={this.props.setCam}
						wheelPositions={this.props.lorenz.wheelPositions}
						setWheelPositions={this.props.setWheelPositions}
					/>
				)}
				{machine === CipherType.Enigma ? (
					<span id="machine-info">
						{`${enigmaInfo.displayName} was introduced in ${
							enigmaInfo.introduced
						}. It has ${enigmaInfo.rotors.length} rotors ${
							enigmaInfo.machineRotors ===
							enigmaInfo.rotors.length
								? ''
								: `(${enigmaInfo.machineRotors} rotors in the enigma concurrently)`
						} ${
							enigmaInfo.hasPlugboard ? ' and a plugboard ' : ''
						} giving it ${calculateEnigmaPossibilities(
							enigmaInfo.machineRotors,
							enigmaInfo.rotors.length,
							enigmaInfo.hasPlugboard,
						)} possible combinations.`}
					</span>
				) : (
					<span id="machine-info">
						The lorenz machine has{' '}
						<abbr title={getLorenzPossibilities()}>
							10 to the 170
						</abbr>{' '}
						possible combinations.
					</span>
				)}
				{enigmaInfo.hasPlugboard && machine === CipherType.Enigma && (
					<PlugContainer
						plugs={this.props.enigma.plugs}
						removePlug={this.props.removePlug}
						addPlug={this.props.addPlug}
					/>
				)}
				<TextArea
					title="Input"
					placeholder="Input"
					value={plaintext}
					onChange={(e: string) => {
						if (this.validInput(e[e.length - 1])) {
							this.setState({ plaintext: e.toUpperCase() });
						}
					}}
				/>
				<div className="button-container">
					<button onClick={this.encryptString}>Encrypt</button>
				</div>
				<TextArea
					title="Encrypted"
					value={this.props.cipher.cipheredText}
					readOnly={true}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	enigma: state.enigma,
	cipher: state.cipher,
	lorenz: state.lorenz,
});

export default connect(mapStateToProps, {
	addPlug,
	removePlug,
	setId,
	setRotorPositions,
	setStartingPositions,
	setPlainText,
	setCipheredText,
	setCam,
	setWheelPositions,
})(CipherContainer);
