import React from 'react';
import styles from './index.module.scss';
import Grid from '../../components/Grid';
import Card from '../../components/Card';

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
        </div>
    );
};

export default InterviewsScreen;
