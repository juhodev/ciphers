import * as React from 'react';
import { setRightShift } from '../../store/caesarcipher/Actions';

import './CaesarCipherSettings.scss';

interface CaesarCipherSettingsProps {
	setRightShift: typeof setRightShift;
}

interface CaesarCipherSettingsState {
	rightShift: number;
}

export default class CaesarCipherSettings extends React.Component<
	CaesarCipherSettingsProps,
	CaesarCipherSettingsState
> {
	constructor(props: any) {
		super(props);

		this.state = { rightShift: 0 };
	}

	render() {
		const { rightShift } = this.state;

		return (
			<div id="caesar-cipher">
				<div className="title">Right shift</div>
				<input
					type="number"
					min="0"
					max="26"
					placeholder={'0'}
					value={rightShift}
					onChange={evt => {
						if (evt.target.value.length > 0) {
							const { value } = evt.target;
							const parsedInt = parseInt(value);

							this.setState({
								rightShift: parsedInt,
							});

							this.props.setRightShift(parsedInt);
						} else {
							this.setState({ rightShift: 0 });
							this.props.setRightShift(0);
						}
					}}
				/>
			</div>
		);
	}
}
