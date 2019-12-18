import * as React from 'react';
import { EnigmaState } from '../store/enigma/Types';
import {
	addPlug,
	removePlug,
	setId,
	setRotorPositions,
	setStartingPositions,
} from '../store/enigma/Actions';
import { setInput, setOutput } from '../store/cipher/Actions';
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
import { setRightShift } from '../store/caesarcipher/Actions';
import CaesarCipher from '../ciphers/caesar/CaesarCipher';
import CaesarCipherSettings from './ceasarCipher/CaesarCipherSettings';
import InfoContainer from './UI/InfoContainer';

interface CipherContainerProps {
	addPlug: typeof addPlug;
	removePlug: typeof removePlug;
	setId: typeof setId;
	setRotorPositions: typeof setRotorPositions;
	setStartingPositions: typeof setStartingPositions;
	enigma: EnigmaState;
	setInput: typeof setInput;
	setOutput: typeof setOutput;
	cipher: CipherState;
	lorenz: LorenzState;
	setCam: typeof setCam;
	setWheelPositions: typeof setWheelPositions;
	setRightShift: typeof setRightShift;
}

interface CipherContainerState {
	plaintext: string;
	cipher: CipherType;
	mode: string;
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
		this.decryptString = this.decryptString.bind(this);
	}

	setCipher() {
		const { pathname } = window.location;

		switch (pathname) {
			case '/enigma':
				this.cipher = new Enigma();
				this.state = {
					plaintext: '',
					cipher: CipherType.Enigma,
					mode: 'encrypt',
				};
				break;

			case '/lorenz':
				this.cipher = new Lorenz();
				this.state = {
					plaintext: '',
					cipher: CipherType.Lorenz,
					mode: 'encrypt',
				};
				break;

			case '/caesarcipher':
				this.cipher = new CaesarCipher();
				this.state = {
					plaintext: '',
					cipher: CipherType.Caesar,
					mode: 'encrypt',
				};
				break;

			default:
				window.alert(
					`${pathname.substr(1, pathname.length)} not found`,
				);
		}
	}

	encryptString(): void {
		this.props.setInput(this.state.plaintext);
		this.cipher.encryptString();
	}

	decryptString(): void {
		this.props.setInput(this.state.plaintext);
		this.cipher.decryptString();
	}

	validInput(s: string): boolean {
		const { cipher } = this.state;

		if (cipher === CipherType.Enigma) {
			return /[a-zA-Z\s]/.test(s);
		} else if (cipher === CipherType.Lorenz) {
			return /[a-zA-Z^(3|4|5|8|9)$\s]/.test(s);
		} else if (cipher === CipherType.Caesar) {
			return /[a-zA-Z]/.test(s);
		}
	}

	renderOptions(cipherType: CipherType) {
		const enigmaInfo = enigmas[this.props.enigma.id];

		switch (cipherType) {
			case CipherType.Enigma:
				return (
					<div>
						<EnigmaSettings
							enigma={this.props.enigma}
							setId={this.props.setId}
							setRotorPositions={this.props.setRotorPositions}
							setStartingPositions={
								this.props.setStartingPositions
							}
						/>
						{enigmaInfo.hasPlugboard &&
							cipherType === CipherType.Enigma && (
								<PlugContainer
									plugs={this.props.enigma.plugs}
									removePlug={this.props.removePlug}
									addPlug={this.props.addPlug}
								/>
							)}
					</div>
				);

			case CipherType.Lorenz:
				return (
					<LorenzSettings
						cams={this.props.lorenz.camPositions}
						setCam={this.props.setCam}
						wheelPositions={this.props.lorenz.wheelPositions}
						setWheelPositions={this.props.setWheelPositions}
					/>
				);

			case CipherType.Caesar:
				return (
					<CaesarCipherSettings
						setRightShift={this.props.setRightShift}
					/>
				);
		}
	}

	renderInfo(cipherType: CipherType) {
		switch (cipherType) {
			case CipherType.Enigma:
				const enigmaInfo = enigmas[this.props.enigma.id];

				return (
					<InfoContainer
						info={`${enigmaInfo.displayName} was introduced in ${
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
					/>
				);
		}
	}

	render() {
		const { plaintext, cipher, mode } = this.state;

		return (
			<div id="container">
				<div id="options">{this.renderOptions(cipher)}</div>
				<div id="common">
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
						<button
							onClick={() => {
								if (mode === 'encrypt') {
									this.setState({ mode: 'decrypt' });
								} else {
									this.setState({ mode: 'encrypt' });
								}
							}}
						>
							Switch
						</button>
						{mode === 'encrypt' ? (
							<button onClick={this.encryptString}>
								Encrypt
							</button>
						) : (
							<button onClick={this.decryptString}>
								Decrypt
							</button>
						)}
					</div>
					<TextArea
						title="Output"
						value={this.props.cipher.output}
						readOnly={true}
					/>
				</div>
				{this.renderInfo(cipher)}
			</div>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	enigma: state.enigma,
	cipher: state.cipher,
	lorenz: state.lorenz,
	caesarCipher: state.caesarCipher,
});

export default connect(mapStateToProps, {
	addPlug,
	removePlug,
	setId,
	setRotorPositions,
	setStartingPositions,
	setInput,
	setOutput,
	setCam,
	setWheelPositions,
	setRightShift,
})(CipherContainer);
