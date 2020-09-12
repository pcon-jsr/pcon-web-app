import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import ScreenTitle from '../../components/ScreenTitle';
import Grid from '../../components/Grid';
import Card from '../../components/Card';
import LoadingSpinner from '../../components/LoadingSpinner';
import { eventsRef } from '../../firebase/firebase.utils';
import CustomButton from '../../components/CustomButton';

const EventsScreen = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let listener = null;

        const fetchAlumniList = async () => {
            listener = eventsRef.on('value', listSnapshot => {

                const eventsData = [];

                listSnapshot.forEach(snapshot => {
                    eventsData.push({
                        id: snapshot.key,
                        ...snapshot.val()
                    });
                });

                setEvents(eventsData);
                setLoading(false);
            });
        }

        fetchAlumniList();

        return () => {
            if (listener) {
                eventsRef.off('value', listener);
            }
        };
    }, []);

    const renderedCards = events.map(ev => {
        return (
            <Card key={ev.id} className={styles['event-card']}>
                <h3 className={styles['title']}>{ev.title}</h3>
                <div className={styles['info']}>
                    <span className={styles['date']}>{ev.month} {ev.year}</span>
                </div>
                <p className={styles['content']}>{ev.content}</p>
                <a target="_blank" rel="noopener noreferrer" href={ev.link}>
                    <CustomButton>VIEW MORE</CustomButton>
                </a>
            </Card>
        );
    });

    return (
        <div className={styles['events-screen']}>
            <ScreenTitle>EVENTS</ScreenTitle>
            {loading && (
                <LoadingSpinner asOverlay />
            )}
            {!loading && (
                <Grid className={styles['grid']}>
                    {renderedCards}
                </Grid>
            )}
            {!loading && !events.length && (
                <Card className={styles['empty-message']}>
                    <h1>More events will be added soon, stay tuned!</h1>
                </Card>
            )}
        </div>
    );
};

export default EventsScreen;
