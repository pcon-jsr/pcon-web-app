import React from 'react';
import styles from './index.module.scss';
import Grid from '../../components/Grid';
import Card from '../../components/Card';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { navigationRoutes } from '../../navigation/routes';

const InterviewsScreen = () => {

    const renderedInterviews = [...Array(8).keys()].map(interview => (
        <Card key={interview} className={styles['interview-card']}>

        </Card>
    ));
    return (
        <div className={styles['interviews-screen']}>
            <h3 className={styles['screen-title']}>INTERVIEW EXPERIENCES</h3>
            <Grid className={styles['grid']}>
                {renderedInterviews}
            </Grid>
            <Link to={navigationRoutes.CREATE_INTERVIEW_EXPERIENCES} className={styles['add-btn']}>
                <FaPlus className={styles['icon']} />
            </Link>
        </div>
    );
};

export default InterviewsScreen;
