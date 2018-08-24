import React from 'react';
import PropTypes from 'prop-types';

class TextField extends React.Component {
    render() {
        const errorText = this.props.errorText;
        return (
            <div>
                <input className={errorText ? "input-error" : "input-ok"}
                    name={this.props.name}
                    type={this.props.type}
                    defaultValue={this.props.defaultValue}
                    placeholder={this.props.placeholder}
                    onChange={e => this.props.onChange(e)} />
                <div className="error-form"><span className="error-text-content">{errorText}</span>
                </div>
            </div>
        )
    }
}

export default TextField;
TextField.propTypes = {
    name:PropTypes.string,
    type: PropTypes.string,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    errorText: PropTypes.string

}