import React, { useContext, useState } from "react";
import styles from "./index.module.scss";

import { BsFillStopwatchFill } from "react-icons/bs";

import { GoVerified } from "react-icons/go";

import { AuthContext } from "../../contexts";

import {
    firebaseAuth,
    updateUserDetailsInInterviewDocument,
    updateUserProfileDocument,
} from "../../firebase/firebase.utils";

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_URL } from "../../utils/validators";
import { useForm } from "../../hooks/form-hook";
import { branchList } from './branchList';
import Card from "../../components/Card";
import Avatar from "../../components/Avatar";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorModal from "../../components/ErrorModal";

const INITIAL_VERIFICATION_FORM_STATE = {
    inputs: {
        registrationNum: {
            value: "",
            isValid: false,
        },
        branch: {
            value: "",
            isValid: false,
        },
        githubHandle: {
            value: "",
            isValid: false,
        },
        linkedinURL: {
            value: "",
            isValid: false,
        },
    },
    isValid: false,
};

const INITIAL_USER_DETAIL_UPDATE_FORM_STATE = {
    inputs: {
        githubHandle: {
            value: "",
            isValid: false,
        },
        linkedinURL: {
            value: "",
            isValid: false,
        },
    },
    isValid: false,
}

const ProfileScreen = () => {
    const auth = useContext(AuthContext);
    const verificationForm = useForm(INITIAL_VERIFICATION_FORM_STATE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const detailsUpdateForm = useForm(INITIAL_USER_DETAIL_UPDATE_FORM_STATE);
    const [success, setSuccess] = useState('');

    const logoutHandler = () => {
        firebaseAuth.signOut();
    };

    const verificationFormSubmitHandler = async (event) => {
        event.preventDefault();

        const { branch, registrationNum, githubHandle, linkedinURL } = verificationForm.formState.inputs;

        setLoading(true);

        try {
            await updateUserProfileDocument(user.id, {
                branch: branch.value,
                registrationNum: registrationNum.value?.toUpperCase(),
                githubHandle: githubHandle.value,
                linkedinURL: linkedinURL.value,
                appliedForVerification: true,
            });
        } catch (err) {
            setError(err.message);
        }

        setLoading(false);
    };

    const detailsUpdateFormSubmitHandler = async (event) => {
        event.preventDefault();

        const { githubHandle, linkedinURL } = detailsUpdateForm.formState.inputs;

        setLoading(true);

        try {
            await updateUserProfileDocument(user.id, {
                githubHandle: githubHandle.value,
                linkedinURL: linkedinURL.value,
            });

            const updatedUserData = {
                ...user,
                githubHandle: githubHandle.value,
                linkedinURL: linkedinURL.value,
            };

            delete updatedUserData.verified;
            delete updatedUserData.appliedForVerification;
            delete updatedUserData.createdAt;

            await updateUserDetailsInInterviewDocument(user.id, {
                ...updatedUserData,
            });

            setSuccess('Details Updated!');
        } catch (err) {
            setError(err.message);
        }

        setLoading(false);
    };

    const { user } = auth;

    let verificationContent = null;

    if (user.verified) {
        verificationContent = (
            <Card className={styles["verified-card"]}>
                <GoVerified className={styles["icon"]} />
                <h1>You're a Verified User !</h1>
                <h3>Update Details</h3>
                <form onSubmit={detailsUpdateFormSubmitHandler} className={styles['details-update-form']}>
                    <CustomInput
                        id="githubHandle"
                        type="text"
                        label="Github Username (Only username, NOT the url)"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText={"Required"}
                        getInput={detailsUpdateForm.inputHandler}
                        initialValue={user.githubHandle}
                        initialValidity={!!user.githubHandle}
                    />
                    <CustomInput
                        id="linkedinURL"
                        type="text"
                        label="Linkedin Profile URL"
                        validators={[VALIDATOR_URL()]}
                        errorText={"Invalid URL"}
                        getInput={detailsUpdateForm.inputHandler}
                        initialValue={user.linkedinURL}
                        initialValidity={!!user.linkedinURL}
                    />
                    {!loading && (
                        <CustomButton type="submit" disabled={!detailsUpdateForm.formState.isValid}>
                            UPDATE
                        </CustomButton>
                    )}
                    {
                        loading && (<LoadingSpinner/>)
                    }
                </form>
            </Card>
        );
    } else if (!user.verified && !user.appliedForVerification) {
        verificationContent = (
            <Card className={styles["form-card"]}>

                <h1 className={styles["title"]}>Unverified Account</h1>
                <h3 className={styles["sub-title"]}>Apply for verification</h3>
                <form
                    onSubmit={verificationFormSubmitHandler}
                    className={styles["verification-form"]}
                >

                    <CustomInput
                        id="registrationNum"
                        type="text"
                        label="College Registration Number"
                        validators={[VALIDATOR_MINLENGTH(10)]}
                        errorText={"Should be atleast 10 characters"}
                        getInput={verificationForm.inputHandler}
                    />
                    <CustomInput
                        element="select"
                        id="branch"
                        label="Branch"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText={"Required"}
                        getInput={verificationForm.inputHandler}
                        optionList={branchList}
                        initialValue={branchList[0].value}
                        initialValidity={true}
                    />
                    <CustomInput
                        id="githubHandle"
                        type="text"
                        label="Github Username (Only username, NOT the url)"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText={"Required"}
                        getInput={verificationForm.inputHandler}
                    />
                    <CustomInput
                        id="linkedinURL"
                        type="text"
                        label="Linkedin Profile URL"
                        validators={[VALIDATOR_URL()]}
                        errorText={"Invalid URL"}
                        getInput={verificationForm.inputHandler}
                    />
                    {!loading && (
                        <CustomButton type="submit" disabled={!verificationForm.formState.isValid}>
                            SUBMIT
                        </CustomButton>
                    )}
                    {loading && <LoadingSpinner />}
                </form>
            </Card>
        );
    } else if (!user.verified && user.appliedForVerification) {
        verificationContent = (
            <Card className={styles["under-review-card"]}>

                <BsFillStopwatchFill className={styles["icon"]} />
                <h2>Your Account is under review for verification</h2>
                <h3> {`Go fix some bugs till then; )`}</h3>
            </Card>
        );
    }

    const clearErrorHandler = () => {
        setError('');
    }

    const clearSuccessHandler = () => {
        setSuccess('');
    }

    return (
        <React.Fragment>
            <ErrorModal
                error={error}
                onClear={clearErrorHandler}
            />
            <ErrorModal
                success
                error={success}
                onClear={clearSuccessHandler}
            />
            <div className={styles["profile-screen"]}>
                <CustomButton className={styles["logout-btn"]} onClick={logoutHandler}>
                    LOGOUT
                </CustomButton>
                <section className={styles["profile-section"]}>
                    <Card className={styles["card"]}>
                        <Avatar src={user.photoURL} className={styles["avatar"]} />
                        <div className={styles["body"]}>
                            <div className={styles["main"]}>
                                <h1> {user.name}</h1> <h4> {user.email}</h4>
                            </div>
                            <span> Branch: {user.branch ? user.branch : "NA"}</span>
                            <span>
                                Reg No: {user.registrationNum ? user.registrationNum : "NA"}
                            </span>
                        </div>
                    </Card>
                </section>
                <section className={styles["verification-section"]}>
                    {verificationContent}
                </section>
            </div>
        </React.Fragment>
    );
};

export default ProfileScreen;