import * as React from 'react';
import SelectGroup from '../UI/SelectGroup';
import { SelectProps } from '../UI/Select';
import { SelectOption } from '../Types';
import { enigmas } from '../../machines/enigma/EnigmaConstants';
import { EnigmaState } from '../../store/enigma/Types';
import {
	setId,
	setRotorPositions,
	setStartingPositions,
} from '../../store/enigma/Actions';
import './EnigmaSettings.scss';

interface EnigmaSettingsProps {
	enigma: EnigmaState;
	setId: typeof setId;
	setRotorPositions: typeof setRotorPositions;
	setStartingPositions: typeof setStartingPositions;
}

export default class EnigmaSettings extends React.Component<
	EnigmaSettingsProps
> {
	createWheels(rotorCount: number, possibleRotors: number): SelectProps[] {
		const rotors: SelectOption[] = [];

		for (let i = 0; i < possibleRotors; i++) {
			rotors.push({ id: i, displayName: `Rotor ${i}` });
		}

		const savedRotors: number[] = this.props.enigma.rotorPositions;
		if (rotorCount > savedRotors.length) {
			savedRotors.push(0);
		}

		if (rotorCount < savedRotors.length) {
			savedRotors.pop();
		}

		return new Array(rotorCount).fill(0, 0).map(
			(_, i: number): SelectProps => {
				return {
					options: rotors,
					selectedOption: {
						id: savedRotors[i],
						displayName: `Rotor ${savedRotors[i]}`,
					},
					onChange: option => {
						this.props.enigma.rotorPositions[
							i
						] = option.id as number;
						this.props.setRotorPositions(
							this.props.enigma.rotorPositions,
						);
					},
				};
			},
		);
	}

	createStartingPositions(rotorCount: number): SelectProps[] {
		const positions: number[] = this.props.enigma.startingPositions;

		if (rotorCount > positions.length) {
			positions.push(0);
		}

		if (rotorCount < positions.length) {
			positions.pop();
		}

		return positions.map(
			(_, i: number): SelectProps => {
				return {
					options: new Array(26).fill(0, 0).map(
						(__, j): SelectOption => {
							return {
								id: j,
								displayName: `Position ${j}`,
							};
						},
					),
					selectedOption: {
						id: positions[i],
						displayName: `Position ${positions[i]}`,
					},
					onChange: option => {
						positions[i] = option.id as number;
						this.props.setStartingPositions(positions);
					},
				};
			},
		);
	}

	render() {
		const enigmaInfo = enigmas[this.props.enigma.id];

		return (
			<div id="option-container">
				<SelectGroup
					title="Enigma"
					group={[
						{
							options: enigmas.map(
								(info): SelectOption => {
									return {
										id: info.id,
										displayName: info.displayName,
									};
								},
							),
							selectedOption: {
								id: enigmaInfo.id,
								displayName: enigmaInfo.displayName,
							},
							onChange: option => {
								this.props.setId(parseInt(option.id as string));
							},
						},
					]}
				/>
				<SelectGroup
					title="Rotors"
					group={this.createWheels(
						enigmaInfo.machineRotors,
						enigmaInfo.rotors.length,
					)}
				/>
				<SelectGroup
					title="Positions"
					group={this.createStartingPositions(
						enigmaInfo.machineRotors,
					)}
				/>
			</div>
		);
	}
}
