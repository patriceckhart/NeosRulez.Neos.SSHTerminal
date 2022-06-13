import React, {PureComponent} from 'react';
import {encode as base64_encode} from 'base-64';
import styles from '../styles.css';

class Row extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            command: false
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.fetchCommand = this.fetchCommand.bind(this);
    }

    fetchCommand(value) {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch('/sshterminal/command/send?command=' + base64_encode(value), requestOptions)
            .then(response => this.props.setResponse(response.json()))
            .catch(error => console.log('error', error));

        this.setState({command: value});
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.fetchCommand(e.target.value)
        }
    }

    render() {

        return (
            <li>
                <span>{this.props.fakeUser}:~$</span>
                <div className={styles.inputWrapper} >
                    {this.state.command &&
                        <div className={styles.freezedInput}>
                            {this.state.command}
                        </div>
                    }
                    {!this.state.command &&
                        <input id="commandInput" type="text" autoFocus={!!this.props.autoFocus} onKeyDown={this.handleKeyDown} defaultValue='' />
                    }
                </div>
            </li>
        );
    }
}

export default Row;
