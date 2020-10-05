import React, { useState, useContext, useEffect } from 'react';
import styles from './index.module.scss';
import { useHistory, useParams } from 'react-router-dom';
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
import { getInterviewDocument, updateInterviewDocument } from '../../firebase/firebase.utils';
import ScreenTitle from '../../components/ScreenTitle';

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
        type: {
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

const interviewType = [
    {
        key: 'FULL TIME',
        value: 'FULL TIME'
    },
    {
        key: 'INTERNSHIP',
        value: 'INTERNSHIP'
    },
];

const unauthorizedErrorText = `You are not authorized!`;

const EditInterviewScreen = () => {
    const auth = useContext(AuthContext);
    const [interview, setInterview] = useState();
    const { formState, inputHandler, setFormDataHandler } = useForm(INITIAL_FORM_STATE);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const history = useHistory();
    const { interviewId } = useParams();

    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const interviewData = await getInterviewDocument(interviewId);

                if (interviewData) {
                    console.log(interviewData);

                    if (interviewData.user.id !== auth.user.id) {
                        throw Error(unauthorizedErrorText);
                    }

                    setInterview(interviewData);
                    setFormDataHandler({
                        inputs: {
                            companyName: {
                                value: interviewData.companyName,
                                isValid: true,
                            },
                            year: {
                                value: interviewData.year,
                                isValid: true,
                            },
                            type: {
                                value: interviewData.type,
                                isValid: true,
                            },
                            roundsDescription: {
                                value: interviewData.roundsDescription,
                                isValid: true,
                            },
                            questionsDescription: {
                                value: interviewData.questionsDescription,
                                isValid: true,
                            },
                            advice: {
                                value: interviewData.advice,
                                isValid: true,
                            },
                        },
                        isValid: true,
                    });
                }

            } catch (err) {
                setError(err.message);
            }

            setLoading(false);
        };

        fetchInterview();
    }, [interviewId, auth.user.id, setFormDataHandler]);

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        setUpdating(true);

        const {
            companyName,
            year,
            type,
            roundsDescription,
            questionsDescription,
            advice,
        } = formState.inputs;

        const interviewData = {
            companyName: companyName.value,
            year: year.value,
            type: type.value,
            roundsDescription: roundsDescription.value,
            questionsDescription: questionsDescription.value,
            advice: advice.value,
            verified: false,
        };

        const userData = {
            id: auth.user.id,
            name: auth.user.name,
            email: auth.user.email,
            photoURL: auth.user.photoURL,
            branch: auth.user.branch,
            registrationNum: auth.user.registrationNum,
            githubHandle: auth.user.githubHandle || '',
            linkedinURL: auth.user.linkedinURL || '',
        };

        try {
            await updateInterviewDocument(interviewId, userData, interviewData);
            setSuccess('Your "Edited" Post is under review and once verified, it will be published!');
        } catch (err) {
            setError(err.message);
        }

        setUpdating(false);
    }

    const clearErrorHandler = () => {
        setError('');
        if (error === unauthorizedErrorText) {
            history.push(navigationRoutes.INTERVIEW_EXPERIENCES);
        }
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
            {
                !interview && loading && (
                    <LoadingSpinner asOverlay />
                )
            }
            {
                (!loading && interview && error !== unauthorizedErrorText) && (
                    <div className={styles['edit-interview-screen']}>
                        <ScreenTitle>EDIT INTERVIEW EXPERIENCE</ScreenTitle>
                        <Card className={styles["form-card"]}>
                            <form
                                onSubmit={formSubmitHandler}
                                className={styles["edit-interview-form"]}
                            >
                                <CustomInput
                                    id="companyName"
                                    type="text"
                                    label="Name of the COMPANY"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText={"Required"}
                                    getInput={inputHandler}
                                    initialValue={interview.companyName}
                                    initialValidity={true}
                                />
                                <CustomInput
                                    element="select"
                                    id="year"
                                    label="Year of Interview"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText={"Required"}
                                    getInput={inputHandler}
                                    optionList={yearList}
                                    initialValue={interview.year}
                                    initialValidity={true}
                                />
                                <CustomInput
                                    element="select"
                                    id="type"
                                    label="Type"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText={"Required"}
                                    getInput={inputHandler}
                                    optionList={interviewType}
                                    initialValue={interview.type}
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
                                    initialValue={interview.roundsDescription}
                                    initialValidity={true}
                                />
                                <CustomInput
                                    element="textarea"
                                    rows={12}
                                    id="questionsDescription"
                                    label="Briefly describe the QUESTIONS asked"
                                    validators={[VALIDATOR_MINLENGTH(150), VALIDATOR_MAXLENGTH(2400)]}
                                    errorText={"Should be atleast 150 characters and atmost 2400 characters"}
                                    getInput={inputHandler}
                                    initialValue={interview.questionsDescription}
                                    initialValidity={true}
                                />
                                <CustomInput
                                    element="textarea"
                                    rows={6}
                                    id="advice"
                                    label="Advice for Aspirants (OPTIONAL)"
                                    validators={[VALIDATOR_MAXLENGTH(400)]}
                                    errorText={"Should be atmost 400 characters"}
                                    getInput={inputHandler}
                                    initialValue={interview.advice}
                                    initialValidity={true}
                                />
                                {!updating && (
                                    <CustomButton type="submit" disabled={!formState.isValid}>
                                        UPDATE
                                    </CustomButton>
                                )}
                                {updating && <LoadingSpinner />}
                            </form>
                        </Card>
                    </div>
                )
            }
        </React.Fragment>
    );
}

export default EditInterviewScreen;
