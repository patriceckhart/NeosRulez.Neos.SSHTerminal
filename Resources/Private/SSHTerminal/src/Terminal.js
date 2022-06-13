import React, {PureComponent} from 'react';
import styles from './styles.css';
import Row from "./components/Row";
import Response from "./components/Response";
import Splash from "./components/Splash";

class Terminal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: false,
        };
        this.setResponse = this.setResponse.bind(this);
        this.updateResponose = this.updateResponose.bind(this);
        this.focusCommandInput = this.focusCommandInput.bind(this);
    }

    updateResponose(result) {
        this.setState({
            response: [...this.state.response, result.result]
        });
    }

    setResponse(response) {
        response.then((result) => {
            this.updateResponose(result);
        });
    }

    focusCommandInput() {
        if(document.getElementById('commandInput')) {
            document.getElementById('commandInput').focus();
        }
    }

    render() {

        return (
            <div id="sshTerminal" className={styles.sshTerminal} onClick={this.focusCommandInput} >
                <ul className={styles.interfaceUl} >
                    {this.props.splashScreen &&
                        <Splash safeMode={this.props.safeMode} />
                    }
                    <Row autoFocus={true} fakeUser={this.props.fakeUser} setResponse={(p) => this.setResponse(p)} />
                    {this.state.response &&
                        <div>
                            {this.state.response.map(responseItem =>
                                <div>
                                    <div>
                                        {responseItem !== '' &&
                                            <Response response={responseItem} />
                                        }
                                        <Row autoFocus={true} fakeUser={this.props.fakeUser} setResponse={(p) => this.setResponse(p)} />
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                </ul>
            </div>
        );
    }
}

export default Terminal;
