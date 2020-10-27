import React, { useEffect, useState, useContext } from 'react';
import styles from './index.module.scss';
import { withRouter } from 'react-router-dom';
import Linkify from 'react-linkify';
import { getInterviewDocument } from '../../firebase/firebase.utils';
import LoadingSpinner from '../../components/LoadingSpinner';
import Grid from '../../components/Grid';
import Card from '../../components/Card';
import { getLocalDateFromFirebaseTimestamp } from '../../utils/dates';
import Avatar from '../../components/Avatar';
import ErrorModal from '../../components/ErrorModal';
import { AuthContext } from '../../contexts/auth-context';
import CustomButton from '../../components/CustomButton';
import { navigationRoutes } from '../../navigation/routes';
import ScreenTitle from '../../components/ScreenTitle';
import { GrGithub, GrLinkedin } from 'react-icons/gr';

const InterviewDetailScreen = (props) => {
    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const auth = useContext(AuthContext);

    const interviewId = props.match.params.interviewId;
    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const interviewData = await getInterviewDocument(interviewId);
                setInterview(interviewData);
            } catch (err) {
                setError(err.message);
            }

            setLoading(false);
        };

        fetchInterview();

    }, [interviewId]);

    const clearErrorHandler = () => {
        setError('');
    }

    if (!loading && !interview) {
        return (
            <React.Fragment>
                <ErrorModal
                    error={error}
                    onClear={clearErrorHandler}
                />
                <div className={styles['interivew-detail-screen']}>
                    <h2>Interview Not Found!</h2>
                </div>
            </React.Fragment>
        );
    }

    if (loading) {
        return (
            <React.Fragment>
                <ErrorModal
                    error={error}
                    onClear={clearErrorHandler}
                />
                <div className={styles['interivew-detail-screen']} style={{ justifyContent: 'center' }}>
                    <LoadingSpinner asOverlay />
                </div>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <ErrorModal
                error={error}
                onClear={clearErrorHandler}
            />
            <Linkify>
                <div className={styles['interivew-detail-screen']}>
                    <ScreenTitle>INTERVIEW EXPERIENCE</ScreenTitle>
                    <Grid className={styles['grid']}>
                        <Card className={styles['company-card']}>
                            <h2>{interview.companyName}</h2>
                            <h5>{interview.type}</h5>
                            <h4>{interview.year}</h4>
                        </Card>
                        <Card className={styles['author-card']}>
                            <h4>Author</h4>
                            <div className={styles['content']}>
                                <Avatar src={interview.user.photoURL} className={styles['avatar']} />
                                <div className={styles['details']}>
                                    <h2>{interview.user.name}</h2>
                                    <small>{getLocalDateFromFirebaseTimestamp(interview.createdAt)}</small>
                                    <span>{interview.user.email}</span>
                                    <span>{interview.user.registrationNum}</span>
                                    <span>{interview.user.branch}</span>
                                    <div className={styles['social-links']}>
                                        {
                                            interview.user.githubHandle && (
                                                <a target="_blank" rel="noopener noreferrer" href={`https://github.com/${interview.user.githubHandle}`}>
                                                    <GrGithub className={styles['github']} />
                                                </a>
                                            )
                                        }
                                        {
                                            interview.user.linkedinURL && (
                                                <a target="_blank" rel="noopener noreferrer" href={`${interview.user.linkedinURL}`}>
                                                    <GrLinkedin className={styles['linkedin']} />
                                                </a>
                                            )
                                        }
                                    </div>
                                    {
                                        auth.user && auth.user.id === interview.user.id && !interview.user.githubHandle && !interview.user.linkedinURL && (
                                            <div className={styles['alert']}>
                                                <p>Update your profile to connect linkedin and github account</p>
                                                <CustomButton to={navigationRoutes.PROFILE}>
                                                    UPDATE
                                            </CustomButton>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </Card>
                        <Card className={styles['rounds-card']}>
                            <p className={styles['question']}>
                                How many rounds were there? Describe briefly.
                    </p>
                            <p className={styles['answer']}>{interview.roundsDescription}</p>
                        </Card>
                        <Card className={styles['questions-card']}>
                            <p className={styles['question']}>
                                What questions were asked? Describe briefly.
                    </p>
                            <p className={styles['answer']}>{interview.questionsDescription}</p>
                        </Card>
                        <Card className={styles['advice-card']}>
                            <p className={styles['question']}>
                                Any advice for future aspirants?
                    </p>
                            <p className={styles['answer']}>{interview.advice || `No specific advice`}</p>
                        </Card>
                    </Grid>
                    {
                        auth.user && auth.user.id === interview.user.id && (
                            <CustomButton to={`${navigationRoutes.EDIT_INTERVIEW}/${interviewId}`}>
                                EDIT
                            </CustomButton>
                        )
                    }
                </div>
            </Linkify>
        </React.Fragment>
    );
}

export default withRouter(InterviewDetailScreen);
