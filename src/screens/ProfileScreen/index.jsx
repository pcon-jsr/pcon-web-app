import React, { useContext, useState } from 'react';
import styles from './index.module.scss';
import { AuthContext } from '../../contexts';
import { firebaseAuth, updateUserProfileDocument } from '../../firebase/firebase.utils';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validators';
import { useForm } from '../../hooks/form-hook';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

const branchList = [
    {
        key: 1,
        value: 'CSE',
    },
    {
        key: 2,
        value: 'ECE',
    },
    {
        key: 3,
        value: 'EEE',
    },
    {
        key: 4,
        value: 'ME',
    },
    {
        key: 5,
        value: 'CE',
    },
    {
        key: 6,
        value: 'MME',
    },
    {
        key: 7,
        value: 'PIE',
    },
    {
        key: 8,
        value: 'MCA',
    },
    {
        key: 9,
        value: 'MTECH',
    },
    {
        key: 10,
        value: 'BSC',
    },
];

const INITIAL_FORM_STATE = {
    inputs: {
        registrationNum: {
            value: '',
            isValid: false,
        },
        branch: {
            value: '',
            isValid: false,
        },
    },
    isValid: false,
};

const ProfileScreen = () => {
    const auth = useContext(AuthContext);
    const { formState, inputHandler } = useForm(INITIAL_FORM_STATE);
    const [loading, setLoading] = useState(false);

    const logoutHandler = () => {
        firebaseAuth.signOut();
    }

    const verificationFormSubmitHandler = async (event) => {
        event.preventDefault();
        const { branch, registrationNum } = formState.inputs;

        setLoading(true);
        await updateUserProfileDocument(user.id, {
            branch: branch.value,
            registrationNum: registrationNum.value?.toUpperCase(),
            appliedForVerification: true,
        });
        setLoading(false);
    }

    const { user } = auth;

    let verificationContent = null;
    if (user.verified) {
        verificationContent = <h1>VERFIFIED!</h1>;
    } else if (!user.verified && !user.appliedForVerification) {
        verificationContent = (
            <Card className={styles['card']}>
                <h1 className={styles['title']}>Unverified Account</h1>
                <h3 className={styles['sub-title']}>Apply for verification</h3>
                <form onSubmit={verificationFormSubmitHandler} className={styles['verification-form']}>
                    <CustomInput
                        id="registrationNum"
                        type="text"
                        label="College Registration Number"
                        validators={[VALIDATOR_MINLENGTH(10)]}
                        errorText={"Should be atleast 10 characters"}
                        getInput={inputHandler}
                    />
                    <CustomInput
                        element="select"
                        id="branch"
                        label="Branch"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText={"Required"}
                        getInput={inputHandler}
                        optionList={branchList}
                        initialValue={branchList[0].value}
                        initialValidity={true}
                    />
                    {
                        !loading && (
                            <CustomButton
                                type="submit"
                                disabled={!formState.isValid}
                            >
                                SUBMIT
                            </CustomButton>
                        )
                    }
                    {
                        loading && (
                            <h4>Please wait...</h4>
                        )
                    }
                </form>
            </Card>
        );
    } else if (!user.verified && user.appliedForVerification) {
        verificationContent = (
            <h3>Your Account is under review for verification</h3>
        );
    }

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
                {verificationContent}
            </section>
        </div>
    );
};

export default ProfileScreen;
