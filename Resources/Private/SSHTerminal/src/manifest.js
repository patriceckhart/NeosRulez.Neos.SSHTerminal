import React, {PureComponent} from 'react';
import manifest from '@neos-project/neos-ui-extensibility';
import Terminal from "./Terminal";
import styles from './styles.css';

manifest('NeosRulez.Neos.SSHTerminal:Terminal', {}, (globalRegistry, {frontendConfiguration}) => {
    const containerRegistry = globalRegistry.get('containers');
    const settings = frontendConfiguration['NeosRulez.Neos.SSHTerminal:Terminal:Settings'];
    console.log(settings)
    containerRegistry.set('PrimaryToolbar/Right/SSHTerminal', SSHTerminal(settings));
});

const SSHTerminal = (settings) => {
    return class sshTerminal extends PureComponent {

        constructor(props) {
            super(props);
            this.state = {
                isToggleOn: false,
            };
            this.handleClick = this.handleClick.bind(this);
        }

        handleClick() {
            this.setState(prevState => ({
                isToggleOn: !prevState.isToggleOn
            }));
        }

        render() {
            return (
                <div>
                    <div className={styles.terminalButton} >
                        <svg style={{width: '14px', marginRight:'0.8rem'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M257.981 272.971L63.638 467.314c-9.373 9.373-24.569 9.373-33.941 0L7.029 444.647c-9.357-9.357-9.375-24.522-.04-33.901L161.011 256 6.99 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L257.981 239.03c9.373 9.372 9.373 24.568 0 33.941zM640 456v-32c0-13.255-10.745-24-24-24H312c-13.255 0-24 10.745-24 24v32c0 13.255 10.745 24 24 24h304c13.255 0 24-10.745 24-24z"/></svg>
                        SSH Terminal
                    </div>
                    <button type="button" className={styles.terminalButtonToggler} onClick={this.handleClick}>
                        {!this.state.isToggleOn &&
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down"
                                 className="neos-svg-inline--fa neos-fa-chevron-down fa-w-14 fa-sm style__icon___3acxC reset__reset___2e25U chevron-down style__dropDown__chevron___3wN4N reset__reset___2e25U"
                                 role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor"
                                      d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                            </svg>
                        }
                        {this.state.isToggleOn &&
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-up"
                                 className="neos-svg-inline--fa neos-fa-chevron-up fa-w-14 fa-sm style__icon___3acxC reset__reset___2e25U chevron-up style__dropDown__chevron___3wN4N reset__reset___2e25U"
                                 role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor"
                                      d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path>
                            </svg>
                        }
                    </button>
                    {/*<Terminal fakeUser={settings.fakeUser} splashScreen={settings.splashScreen} />*/}
                    {this.state.isToggleOn &&
                        <Terminal fakeUser={settings.fakeUser} splashScreen={settings.splashScreen} safeMode={settings.safeMode} />
                    }
                </div>
            );
        }
    }
};
