import * as React from 'react';
import './Search.scss';
import { Sigaba } from '../machines/sigaba/Sigaba';

interface SearchProps {
	history: any;
}

export default class Search extends React.Component<SearchProps> {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {
		const sigaba: Sigaba = new Sigaba();
		sigaba.encryptString();
	}

	render() {
		return (
			<div className="search">
				<input
					placeholder="Search"
					onChange={e => {
						this.find(e.target.value);
					}}
				/>
			</div>
		);
	}

	find(value: string) {
		switch (value.toLowerCase()) {
			case 'enigma':
				this.props.history.push('/enigma');
				break;

			case 'lorenz':
				this.props.history.push('/lorenz');
				break;

			default:
				console.log(`${value.toLowerCase()} not found`);
				break;
		}
	}
}
