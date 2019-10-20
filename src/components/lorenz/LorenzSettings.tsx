import * as React from 'react';
import CamPicker from './CamPicker';
import { setCam, setWheelPositions } from '../../store/lorenz/Actions';
import './LorenzSettings.scss';
import CamPickerContainer from './CamPickerContainer';
import Select from '../UI/Select';
import { SelectOption } from '../Types';

interface LorenzSettingsProps {
	cams: number[][];
	wheelPositions: number[];
	setCam: typeof setCam;
	setWheelPositions: typeof setWheelPositions;
}

interface LorenzSettingsState {
	camPickerOpen: boolean;
}

export default class LorenzSettings extends React.Component<
	LorenzSettingsProps,
	LorenzSettingsState
> {
	constructor(props: any) {
		super(props);

		this.state = { camPickerOpen: false };
		this.toggleCamPicker = this.toggleCamPicker.bind(this);
	}

	toggleCamPicker() {
		const { camPickerOpen } = this.state;

		this.setState({ camPickerOpen: !camPickerOpen });
	}

	createCamPickers() {
		const { cams, setCam } = this.props;

		const camPickers: JSX.Element[] = cams.map((wheel, i) => {
			const { wheelPositions } = this.props;
			const wheelOptions: SelectOption[] = new Array(wheel.length)
				.fill(0, 0)
				.map(
					(_, j): SelectOption => {
						return {
							id: j,
							displayName: `Position ${j}`,
						};
					},
				);

			return (
				<CamPicker
					key={i}
					id={i}
					cams={wheel}
					select={
						<Select
							options={wheelOptions}
							selectedOption={wheelOptions[wheelPositions[i]]}
							onChange={option => {
								wheelPositions[i] = option.id as number;
								console.log('setwheelpositions');
								this.props.setWheelPositions(wheelPositions);
							}}
						/>
					}
					onChange={(cam, value) => {
						if (cam < wheel.length) {
							setCam(i, cam, value);
						}
					}}
				/>
			);
		});

		return (
			<div className="cam-pickers">
				<CamPickerContainer
					camPickers={camPickers.splice(0, 5)}
					wheelName="Psi wheels"
				/>
				<CamPickerContainer
					camPickers={camPickers.splice(0, 2)}
					wheelName="Mu wheels"
				/>
				<CamPickerContainer
					camPickers={camPickers}
					wheelName="Chi wheels"
				/>
			</div>
		);
	}

	render() {
		const { camPickerOpen } = this.state;

		return (
			<div className="lorenz-settings">
				{camPickerOpen && this.createCamPickers()}
				{camPickerOpen ? (
					<span
						className="cam-picker-toggle"
						onClick={this.toggleCamPicker}
					>
						Close settings
					</span>
				) : (
					<span
						className="cam-picker-toggle"
						onClick={this.toggleCamPicker}
					>
						Open settings
					</span>
				)}
			</div>
		);
	}
}
