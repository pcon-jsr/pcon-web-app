import React, { useContext, useCallback, useReducer } from 'react';
import styles from './index.module.scss';
import { AuthContext } from '../../contexts';
import { firebaseAuth } from '../../firebase/firebase.utils';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validators';
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

const formActionTypes = {
    INPUT_CHANGE: 'INPUT_CHANGE',
}

const formReducer = (state, action) => {
    switch (action.type) {
        case formActionTypes.INPUT_CHANGE:
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid },
                },
                isValid: formIsValid,
            };

        default:
            return state;
    }
};

const ProfileScreen = () => {
    const auth = useContext(AuthContext);

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
    const [formState, dispatch] = useReducer(formReducer, INITIAL_FORM_STATE);

    const logoutHandler = () => {
        firebaseAuth.signOut();
    }

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: formActionTypes.INPUT_CHANGE,
            value: value,
            isValid: isValid,
            inputId: id,
        });
    }, [dispatch]);

    const verificationFormSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState);
    }

    const { user } = auth;

    let verificationContent = null;
    if (user.verified) {
        verificationContent = <h1>VERFIFIED!</h1>;
    } else {
        verificationContent = (
            <Card className={styles['card']}>
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
                    <CustomButton
                        type="submit"
                        disabled={!formState.isValid}
                    >
                        SUBMIT
                    </CustomButton>
                </form>
            </Card>
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
