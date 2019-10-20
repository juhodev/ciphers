import * as React from 'react';

import './Select.scss';
import { SelectOption } from '../Types';

export interface SelectProps {
    options: SelectOption[];
    selectedOption: SelectOption;
    onChange: (option: SelectOption) => void;
}

export default class Select extends React.Component<SelectProps> {
    constructor(props: any) {
        super(props);

        this.changePrevious = this.changePrevious.bind(this);
        this.changeNext = this.changeNext.bind(this);
    }

    changePrevious() {
        const { options, selectedOption, onChange } = this.props;

        const currentIndex: number = options.findIndex(
            s => s.id === selectedOption.id
        );

        const previousOption =
            currentIndex === 0
                ? options[options.length - 1]
                : options[currentIndex - 1];

        onChange(previousOption);
    }

    changeNext() {
        const { options, selectedOption, onChange } = this.props;

        const currentIndex: number = options.findIndex(
            s => s.id === selectedOption.id
        );

        const nextOption =
            currentIndex === options.length - 1
                ? options[0]
                : options[currentIndex + 1];

        onChange(nextOption);
    }

    render() {
        const { selectedOption } = this.props;

        return (
            <div className="select">
                <span className="select-previous" onClick={this.changePrevious}>
                    -
                </span>
                <span className="select-selected">
                    {selectedOption.displayName}
                </span>
                <span className="select-next" onClick={this.changeNext}>
                    +
                </span>
            </div>
        );
    }
}
