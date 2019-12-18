import * as React from 'react';
import './Search.scss';
import { MACHINE_BASIC_INFO, BasicInfo } from './Types';

interface SearchProps {
	history: any;
}

interface SearchState {
	input: string;
}

export default class Search extends React.Component<SearchProps, SearchState> {
	constructor(props: any) {
		super(props);

		this.state = { input: '' };
	}

	render() {
		const { input } = this.state;

		return (
			<div className="search">
				<input
					placeholder="Search"
					onChange={e => {
						this.setState({ input: e.target.value });
					}}
				/>
				{this.renderSuggestions(this.findSuggestions(input))}
			</div>
		);
	}

	renderSuggestions(suggestions: BasicInfo[]): JSX.Element[] {
		return suggestions.map(suggestion => {
			return (
				<div className="suggestion">
					<span
						className="machine"
						onClick={() => this.props.history.push(suggestion.link)}
					>
						{suggestion.name}
					</span>
					<div className="suggestion-info">
						<span className="date">Date: {suggestion.date}</span>
						<span className="country">
							Country: {suggestion.country}
						</span>
					</div>
				</div>
			);
		});
	}

	findSuggestions(input: string): BasicInfo[] {
		const suggestions: BasicInfo[] = MACHINE_BASIC_INFO;

		if (input.length === 0) {
			return suggestions;
		}

		const lowerCaseInput: string = input.toLowerCase();

		// This might be the worst way to do this but don't have time to use something like this https://en.wikipedia.org/wiki/Levenshtein_distance
		const validSuggestions: BasicInfo[] = suggestions.filter(s =>
			s.name.toLowerCase().startsWith(lowerCaseInput),
		);

		return validSuggestions;
	}

	find(value: string) {
		switch (value.toLowerCase()) {
			case 'enigma':
				this.props.history.push('/enigma');
				break;

			case 'lorenz':
				this.props.history.push('/lorenz');
				break;

			case 'caesarcipher':
				this.props.history.push('/caesarcipher');
				break;

			default:
				console.log(`${value.toLowerCase()} not found`);
				break;
		}
	}
}
