import React from 'react';
import styles from './index.module.scss';
import { ReactComponent as PconLogo } from '../../assets/pcon_logo.svg';
import Card from '../../components/Card';

const SplashScreen = () => {
    return (
        <div className={styles['splash-screen']}>
            <Card className={styles['card']}>
                <PconLogo className={styles['logo']} />
            </Card>
        </div>
    );
};

export default SplashScreen;
