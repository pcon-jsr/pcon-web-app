import React, { useState, useEffect, useContext } from 'react';
import styles from './index.module.scss';
import Grid from '../../components/Grid';
import Card from '../../components/Card';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { navigationRoutes } from '../../navigation/routes';
import { interviewsCollectionRef } from '../../firebase/firebase.utils';
import LoadingSpinner from '../../components/LoadingSpinner';
import Avatar from '../../components/Avatar';
import CustomButton from '../../components/CustomButton';
import { getLocalDateFromFirebaseTimestamp } from '../../utils/dates';
import { AuthContext } from '../../contexts/auth-context';

const InterviewsScreen = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useContext(AuthContext);

    useEffect(() => {
        const unsubscribeInterviews = interviewsCollectionRef.where('verified', '==', true).onSnapshot(snapshot => {
            const interviewsList = snapshot.docs.map(interviewDoc => ({
                id: interviewDoc.id,
                ...interviewDoc.data(),
            }));

            setInterviews(interviewsList);
            setLoading(false);
        });

        return () => {
            unsubscribeInterviews();
        };
    }, []);

    const renderedInterviews = interviews.map(interview => {
        const localDate = getLocalDateFromFirebaseTimestamp(interview.createdAt);
        return (
            <Card key={interview.id} className={styles['interview-card']}>
                <div className={styles['header']}>
                    <h2>{interview.companyName}</h2>
                    <span>{localDate}</span>
                </div>
                <div className={styles['content']}>
                    <Avatar src={interview.user?.photoURL} />
                    <span className={styles['name']}>{interview.user?.name}</span>
                    <span className={styles['email']}>{interview.user?.email}</span>
                    <span className={styles['regNum']}>{interview.user?.registrationNum}</span>
                    <span className={styles['branch']}>{interview.user?.branch}</span>
                </div>
                <div className={styles['footer']}>
                    <CustomButton to={`${navigationRoutes.INTERVIEW_EXPERIENCES}/${interview.id}`}>
                        VIEW
                    </CustomButton>
                </div>
            </Card>
        );
    });
    return (
        <div className={styles['interviews-screen']}>
            <h3 className={styles['screen-title']}>INTERVIEW EXPERIENCES</h3>
            {loading && <LoadingSpinner />}
            {!loading && !interviews.length && <h4>No interviews found!</h4>}
            <Grid className={styles['grid']}>
                {renderedInterviews}
            </Grid>
            {auth.user && (
                <Link to={navigationRoutes.CREATE_INTERVIEW_EXPERIENCES} className={styles['add-btn']}>
                    <FaPlus className={styles['icon']} />
                </Link>
            )}
        </div>
    );
};

export default InterviewsScreen;
