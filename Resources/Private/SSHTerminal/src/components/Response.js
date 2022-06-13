import React, {PureComponent} from 'react';
import styles from '../styles.css';

class Response extends React.Component {

    render() {

        return (
            <li>
                <div className={styles.response}>
                    <span dangerouslySetInnerHTML={{__html: this.props.response}} />
                </div>
            </li>
        );
    }
}

export default Response;
