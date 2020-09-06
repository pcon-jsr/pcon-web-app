import React from 'react';
import styles from './index.module.scss';
import ReactTypingEffect from 'react-typing-effect';

import PconLogo from '../../assets/pcon_logo.png';

const HomeScreen = () => {
    return (
        <div className={styles['home']}>
            <header className={styles['header']}>
                <div className={styles['logo-container']}>
                    <img alt="PCON Logo" src={PconLogo} />
                </div>
                <div className={styles['text-container']}>
                    <h2>Programming Club of NIT Jamshedpur</h2>
                    <ReactTypingEffect
                        className={styles['animated-text']}
                        eraseDelay={1000}
                        text={["BUILD. BREAK. CODE."]}
                    />
                </div>
            </header>
        </div>
    );
};

export default HomeScreen;
