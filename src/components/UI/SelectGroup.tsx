import * as React from 'react';
import Select, { SelectProps } from './Select';
import './SelectGroup.scss';
import { randomString } from '../../machines/enigma/Utils';

interface SelectGroupProps {
    title: string;
    group: SelectProps[];
}

export default class SelectGroup extends React.Component<SelectGroupProps> {
    render() {
        const { title, group } = this.props;

        const selectOptions = group.map(selectProp => {
            return (
                <Select
                    key={randomString()}
                    options={selectProp.options}
                    selectedOption={selectProp.selectedOption}
                    onChange={selectProp.onChange}
                />
            );
        });

        return (
            <div className="select-group">
                <div className="title">{title}</div>
                <div className="select-container">{selectOptions}</div>
            </div>
        );
    }
}
