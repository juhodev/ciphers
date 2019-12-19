import * as React from 'react';
import { setKey } from '../../store/vigenere/Actions';

import './VigenereCipherSettings.scss';

interface VigenereCipherSettingsProps {
	setKey: typeof setKey;
}

interface VigenereCipherSettingsState {
	key: string;
}

export default class VigenereCipherSettings extends React.Component<
	VigenereCipherSettingsProps,
	VigenereCipherSettingsState
> {
	constructor(props: any) {
		super(props);

		this.state = { key: '' };
	}

	render() {
		const { key } = this.state;

		return (
			<div id="vigenere-cipher">
				<div className="title">Cipher key</div>
				<input
					placeholder="Cipher key"
					value={key}
					onChange={evt => {
						const key = evt.target.value;

						if (this.validateKey(key)) {
							this.setState({ key: key });
							this.props.setKey(key);
						}
					}}
				/>
			</div>
		);
	}

	private validateKey(key: string) {
		return key.length === 0 || /[a-zA-Z]/.test(key);
	}
}
