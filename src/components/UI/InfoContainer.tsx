import * as React from 'react';
import './InfoContainer.scss';

interface InfoContainerProps {
	info: string;
}

export default class InfoContainer extends React.Component<InfoContainerProps> {
	render() {
		return (
			<div className="info-container">
				<div className="title">Info</div>
				<div className="info-text">{this.props.info}</div>
			</div>
		);
	}
}
