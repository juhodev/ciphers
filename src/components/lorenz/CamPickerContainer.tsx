import * as React from 'react';
import './CamPickerContainer.scss';

interface CamPickerContainerProps {
	camPickers: JSX.Element[];
	wheelName: string;
}

export default class CamPickerContainer extends React.Component<
	CamPickerContainerProps
> {
	render() {
		const { camPickers, wheelName } = this.props;

		return (
			<div className="cam-picker-container">
				<div className="wheel-name">{wheelName}</div>
				<div className="wheels">{camPickers}</div>
			</div>
		);
	}
}
