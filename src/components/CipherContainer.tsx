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
import { Enigma } from '../machines/enigma/Enigma';
import TextArea from './UI/TextArea';
import './CipherContainer.scss';
import { enigmas, EnigmaInfo } from '../machines/enigma/EnigmaConstants';
import { CipherState } from '../store/cipher/Types';
import { SelectOption } from './Types';
import { Machine, MachineType } from '../machines/Machine';
import {
	calculateEnigmaPossibilities,
	getLorenzPossibilities,
} from '../machines/enigma/Utils';
import PlugContainer from './enigma/PlugContainer';
import EnigmaSettings from './enigma/EnigmaSettings';
import { LorenzState } from '../store/lorenz/Types';
import LorenzSettings from './lorenz/LorenzSettings';
import { setCam, setWheelPositions } from '../store/lorenz/Actions';
import { Lorenz } from '../machines/lorenz/Lorenz';
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
	machine: MachineType;
}

class CipherContainer extends React.Component<
	CipherContainerProps,
	CipherContainerState
> {
	machine: Machine;

	constructor(props: any) {
		super(props);

		this.setMachine();
		// this.machine = new Enigma();
		// this.state = { plaintext: '', machine: MachineType.Enigma };
		this.encryptString = this.encryptString.bind(this);
	}

	setMachine() {
		const { pathname } = window.location;

		switch (pathname) {
			case '/enigma':
				this.machine = new Enigma();
				this.state = { plaintext: '', machine: MachineType.Enigma };
				break;

			case '/lorenz':
				this.machine = new Lorenz();
				this.state = { plaintext: '', machine: MachineType.Lorenz };
				break;

			default:
				window.alert(
					`${pathname.substr(1, pathname.length)} not found`,
				);
		}
	}

	encryptString(): void {
		this.props.setPlainText(this.state.plaintext);
		this.machine.encryptString();
	}

	validInput(s: string): boolean {
		const { machine } = this.state;

		if (machine === MachineType.Enigma) {
			return /[a-zA-Z\s]/.test(s);
		} else if (machine === MachineType.Lorenz) {
			return /[a-zA-Z^(3|4|5|8|9)$\s]/.test(s);
		}
	}

	render() {
		const { plaintext, machine } = this.state;
		const enigmaInfo = enigmas[this.props.enigma.id];

		return (
			<div id="container">
				{machine === MachineType.Enigma ? (
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
				{machine === MachineType.Enigma ? (
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
				{enigmaInfo.hasPlugboard && machine === MachineType.Enigma && (
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

export default connect(
	mapStateToProps,
	{
		addPlug,
		removePlug,
		setId,
		setRotorPositions,
		setStartingPositions,
		setPlainText,
		setCipheredText,
		setCam,
		setWheelPositions,
	},
)(CipherContainer);
