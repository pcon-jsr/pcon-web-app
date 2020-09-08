import React, { useContext } from 'react';
import styles from './index.module.scss';
import { AuthContext } from '../../contexts/auth-context';
import { navigationRoutes } from '../../navigation/routes';
import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';

const CreateInterviewScreen = () => {
    const auth = useContext(AuthContext);

    if (!auth.user.verified) {
        return (
            <div className={styles['create-interview-screen']}>
                <Card className={styles['verification-card']}>
                    <h2>Verify Account!</h2>
                    <h4>Only verified users can share interview experiences</h4>
                    <CustomButton to={navigationRoutes.PROFILE}>
                        VERIFY NOW
                    </CustomButton>
                </Card>
            </div>
        );
    }

    return (
        <div className={styles['create-interview-screen']}>

        </div>
    );
};

export default CreateInterviewScreen;
