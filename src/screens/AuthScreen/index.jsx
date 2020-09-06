import React from 'react';
import styles from './index.module.scss';
import { FcGoogle } from 'react-icons/fc';
import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';
import { signInWithGoogle } from '../../firebase/firebase.utils';

const AuthScreen = () => {
    return (
        <div className={styles['auth']}>
            <Card className={styles['card']}>
                <div className={styles['body']}>
                    <h1>HOLA!!!</h1>
                    <h3>Welcome to PCON</h3>
                </div>
                <CustomButton className={styles['btn']} light onClick={signInWithGoogle}>
                    <FcGoogle className={styles['icon']} />
                    <span>SIGN IN WITH GOOGLE</span>
                </CustomButton>
            </Card>
        </div>
    );
};

export default AuthScreen;
