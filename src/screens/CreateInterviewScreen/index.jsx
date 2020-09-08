import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.scss';
import { AuthContext } from '../../contexts/auth-context';
import { navigationRoutes } from '../../navigation/routes';
import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';
import { useForm } from '../../hooks/form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH } from '../../utils/validators';
import CustomInput from '../../components/CustomInput';
import LoadingSpinner from '../../components/LoadingSpinner';
import { yearList } from '../../utils/yearList';
import ErrorModal from '../../components/ErrorModal';
import { createInterviewDocument } from '../../firebase/firebase.utils';

const INITIAL_FORM_STATE = {
    inputs: {
        companyName: {
            value: "",
            isValid: false,
        },
        year: {
            value: "",
            isValid: false,
        },
        roundsDescription: {
            value: "",
            isValid: false,
        },
        questionsDescription: {
            value: "",
            isValid: false,
        },
        advice: {
            value: "",
            isValid: false,
        },
    },
    isValid: false,
};

const CreateInterviewScreen = () => {
    const auth = useContext(AuthContext);
    const { formState, inputHandler } = useForm(INITIAL_FORM_STATE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const history = useHistory();

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        const {
            companyName,
            year,
            roundsDescription,
            questionsDescription,
            advice,
        } = formState.inputs;

        const interviewData = {
            companyName: companyName.value,
            year: year.value,
            roundsDescription: roundsDescription.value,
            questionsDescription: questionsDescription.value,
            advice: advice.value,
        };

        const userData = {
            id: auth.user.id,
            name: auth.user.name,
            email: auth.user.email,
            branch: auth.user.branch,
            registrationNum: auth.user.registrationNum,
        };

        try {
            await createInterviewDocument(userData, interviewData);
            setSuccess('Your Post is under review and once verified, it will be published!');
        } catch (err) {
            setError(err.message);
        }

        setLoading(false);
    }

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

    const clearErrorHandler = () => {
        setError('');
    }

    const clearSuccessHandler = () => {
        setSuccess('');
        history.push(navigationRoutes.INTERVIEW_EXPERIENCES);
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
            <div className={styles['create-interview-screen']}>
                <h2 className={styles["title"]}>Share your Interview Experience</h2>
                <Card className={styles["form-card"]}>
                    <form
                        onSubmit={formSubmitHandler}
                        className={styles["create-interview-form"]}
                    >
                        <CustomInput
                            id="companyName"
                            type="text"
                            label="Name of the COMPANY"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText={"Required"}
                            getInput={inputHandler}
                        />
                        <CustomInput
                            element="select"
                            id="year"
                            label="Year of Interview"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText={"Required"}
                            getInput={inputHandler}
                            optionList={yearList}
                            initialValue={yearList[0].value}
                            initialValidity={true}
                        />
                        <CustomInput
                            element="textarea"
                            rows={8}
                            id="roundsDescription"
                            label="Briefly describe the number and type of ROUNDS"
                            validators={[VALIDATOR_MINLENGTH(40), VALIDATOR_MAXLENGTH(600)]}
                            errorText={"Should be atleast 40 characters and atmost 600 characters"}
                            getInput={inputHandler}
                        />
                        <CustomInput
                            element="textarea"
                            rows={12}
                            id="questionsDescription"
                            label="Briefly describe the QUESTIONS asked"
                            validators={[VALIDATOR_MINLENGTH(150), VALIDATOR_MAXLENGTH(2400)]}
                            errorText={"Should be atleast 150 characters and atmost 2400 characters"}
                            getInput={inputHandler}
                        />
                        <CustomInput
                            element="textarea"
                            rows={6}
                            id="advice"
                            label="Advice for Aspirants (OPTIONAL)"
                            validators={[VALIDATOR_MAXLENGTH(400)]}
                            errorText={"Should be atmost 400 characters"}
                            getInput={inputHandler}
                            initialValidity={true}
                        />
                        {!loading && (
                            <CustomButton type="submit" disabled={!formState.isValid}>
                                SUBMIT
                            </CustomButton>
                        )}
                        {loading && <LoadingSpinner />}
                    </form>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default CreateInterviewScreen;
