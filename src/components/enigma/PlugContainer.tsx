import * as React from 'react';
import Plug, { PlugProps } from './Plug';
import { Plug as PlugType } from '../../store/enigma/Types';
import { removePlug, addPlug } from '../../store/enigma/Actions';
import { randomString } from '../../ciphers/enigma/Utils';
import './PlugContainer.scss';
import { string } from 'prop-types';

interface PlugContainerProps {
    plugs: Map<string, string>;
    removePlug: typeof removePlug;
    addPlug: typeof addPlug;
}

interface PlugContainerState {
    plugIn: string;
    plugOut: string;
}

export default class PlugContainer extends React.Component<
    PlugContainerProps,
    PlugContainerState
> {
    constructor(props: any) {
        super(props);

        this.state = { plugIn: '', plugOut: '' };
    }

    createPlugs(): JSX.Element[] {
        const props: PlugProps[] = [];
        if (this.props.plugs === undefined) {
            return [];
        }

        for (let [key, value] of this.props.plugs.entries()) {
            if (
                props.find(p => p.plug.in === key || p.plug.out === key) ===
                undefined
            ) {
                props.push({
                    plug: { in: key, out: value },
                    onRemove: () => {
                        this.props.removePlug({ in: key, out: value });
                    },
                });
            }
        }

        return props.map(prop => {
            return (
                <Plug
                    key={randomString()}
                    plug={prop.plug}
                    onRemove={prop.onRemove}
                />
            );
        });
    }

    render() {
        const { plugIn, plugOut } = this.state;

        return (
            <div className="plugboard">
                <div className="title">Plugboard</div>
                <div className="add-plug">
                    <input
                        value={plugIn}
                        onChange={e => {
                            const letter: string =
                                e.target.value[e.target.value.length - 1];

                            if (/[a-zA-Z]/g.test(letter)) {
                                this.setState({ plugIn: letter.toUpperCase() });
                            }
                        }}
                    />
                    -
                    <input
                        value={plugOut}
                        onChange={e => {
                            const letter: string =
                                e.target.value[e.target.value.length - 1];

                            if (/[a-zA-Z]/g.test(letter)) {
                                this.setState({
                                    plugOut: letter.toUpperCase(),
                                });
                            }
                        }}
                    />
                    <button
                        onClick={() => {
                            const { plugIn, plugOut } = this.state;

                            if (plugIn.length > 0 && plugOut.length > 0) {
                                this.setState({ plugIn: '', plugOut: '' });
                                this.props.addPlug({
                                    in: plugIn,
                                    out: plugOut,
                                });
                            }
                        }}
                    >
                        Add
                    </button>
                </div>
                <div className="plugs-container">{this.createPlugs()}</div>
            </div>
        );
    }
}
