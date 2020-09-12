import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import ScreenTitle from '../../components/ScreenTitle';
import Grid from '../../components/Grid';
import Card from '../../components/Card';
import LoadingSpinner from '../../components/LoadingSpinner';
import { achievementsRef } from '../../firebase/firebase.utils';

function compareAchievements(achievement1, achievement2) {

    const date1 = new Date(`${achievement1.month} ${achievement1.year}`);
    const date2 = new Date(`${achievement2.month} ${achievement2.year}`);

    if (date1 > date2) {
        return -1;
    } else if (date1 < date2) {
        return 1;
    } else {
        return 0;
    }
}

const AchievementsScreen = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let listener = null;

        const fetchAchievementList = async () => {
            listener = achievementsRef.on('value', listSnapshot => {

                const achievementList = [];

                listSnapshot.forEach(snapshot => {
                    achievementList.push({
                        id: snapshot.key,
                        ...snapshot.val()
                    });
                });

                achievementList.sort(compareAchievements);

                setAchievements(achievementList);
                setLoading(false);
            });
        }

        fetchAchievementList();

        return () => {
            if (listener) {
                achievementsRef.off('value', listener);
            }
        };

    }, []);

    const renderedCards = achievements.map(ach => {
        return (
            <Card key={ach.id} className={styles['achievement-card']}>
                <h3 className={styles['title']}>{ach.title}</h3>
                <div className={styles['info']}>
                    <span className={styles['date']}>{ach.month} {ach.year}</span>
                    <span className={styles['location']}>{ach.location}</span>
                </div>
                <p className={styles['content']}>{ach.content}</p>
            </Card>
        );
    });

    return (
        <div className={styles['achievements-screen']}>
            <ScreenTitle>ACHIEVEMENTS</ScreenTitle>
            {loading && (
                <LoadingSpinner asOverlay />
            )}
            {!loading && (
                <Grid className={styles['grid']}>
                    {renderedCards}
                </Grid>
            )}
        </div>
    );
};

export default AchievementsScreen;
