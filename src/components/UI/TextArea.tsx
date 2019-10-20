import * as React from 'react';
import './TextArea.scss';

interface TextAreaProps {
    title: string;
    value: string;
    placeholder?: string;
    readOnly?: boolean;
    onChange?: (e: string) => void;
}

export default class TextArea extends React.Component<TextAreaProps> {
    render() {
        const { title, value, placeholder, readOnly, onChange } = this.props;

        return (
            <div className="textarea-container">
                <div className="textarea">
                    <div className="textarea-title">{title}</div>
                    <textarea
                        value={value}
                        placeholder={placeholder}
                        readOnly={readOnly}
                        rows={20}
                        onChange={e => onChange(e.target.value)}
                    />
                </div>
            </div>
        );
    }
}
