import * as React from 'react';
import './Plug.scss';
import { Plug as PlugType } from '../../store/enigma/Types';

export interface PlugProps {
    plug: PlugType;
    onRemove: () => void;
}

export default class Plug extends React.Component<PlugProps> {
    render() {
        const { plug, onRemove } = this.props;

        return (
            <div className="plug">
                <span className="plug-char">{plug.in}</span>
                <span className="plug-remove" onClick={onRemove}>
                    x
                </span>
                <span className="plug-char">{plug.out}</span>
            </div>
        );
    }
}
