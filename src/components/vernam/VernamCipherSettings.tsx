import * as React from 'react';
import { setVernamKey } from '../../store/vernam/Actions';

import './VernamCipherSettings.scss';

interface VernamCipherSettingsProps {
	setVernamKey: typeof setVernamKey;
}

interface VernamCipherSettingsState {
	key: string;
}

export default class VernamCipherSettings extends React.Component<
	VernamCipherSettingsProps,
	VernamCipherSettingsState
> {
	constructor(props: any) {
		super(props);

		this.state = { key: '' };
	}

	render() {
		const { key } = this.state;

		return (
			<div id="vernam-cipher">
				<div className="title">Cipher key</div>
				<textarea
					placeholder="Cipher key"
					value={key}
					rows={20}
					onChange={evt => {
						const key = evt.target.value.toUpperCase();
						if (this.validateKey(key)) {
							this.setState({ key });
							this.props.setVernamKey(key);
						}
					}}
				/>
			</div>
		);
	}

	private validateKey(key: string) {
		return key.length === 0 || /^\S*$/.test(key);
	}
}
