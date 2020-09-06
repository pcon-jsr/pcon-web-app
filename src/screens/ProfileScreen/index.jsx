import React, { useContext } from 'react';
import styles from './index.module.scss';
import { AuthContext } from '../../contexts';
import { firebaseAuth } from '../../firebase/firebase.utils';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import CustomButton from '../../components/CustomButton';

const ProfileScreen = () => {
    const auth = useContext(AuthContext);

    const logoutHandler = () => {
        firebaseAuth.signOut();
    }

    const { user } = auth;
    return (
        <div className={styles['profile-screen']}>
            <CustomButton
                className={styles['logout-btn']}
                onClick={logoutHandler}
            >
                LOGOUT
            </CustomButton>
            <section className={styles['profile-section']}>
                <Card className={styles['card']}>
                    <Avatar src={user.photoURL} className={styles['avatar']} />
                    <div className={styles['body']}>
                        <div className={styles['main']}>
                            <h1>{user.name}</h1>
                            <h4>{user.email}</h4>
                        </div>
                        <span>
                            Branch: {user.branch ? user.branch : 'NA'}
                        </span>
                        <span>
                            Reg No: {user.registrationNum ? user.registrationNum : 'NA'}
                        </span>
                    </div>
                </Card>
            </section>
            <section className={styles['verification-section']}>

            </section>
        </div>
    );
};

export default ProfileScreen;
