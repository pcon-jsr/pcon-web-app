import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import ScreenTitle from '../../components/ScreenTitle';
import Grid from '../../components/Grid';
import { FaPlus } from 'react-icons/fa';
import { navigationRoutes } from '../../navigation/routes';
import AlumniCard from '../../components/AlumniCard';
import { alumniRef } from '../../firebase/firebase.utils';
import LoadingSpinner from '../../components/LoadingSpinner';

const AlumniScreen = () => {
    const [alumniList, setAlumniList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let listener = null;

        const fetchAlumniList = async () => {
            listener = alumniRef.on('value', listSnapshot => {

                const alumniData = [];

                listSnapshot.forEach(snapshot => {
                    alumniData.push({
                        id: snapshot.key,
                        ...snapshot.val()
                    });
                });

                setAlumniList(alumniData);
                setLoading(false);
            });
        }

        fetchAlumniList();

        return () => {
            if (listener) {
                alumniRef.off('value', listener);
            }
        };

    }, []);

    const renderedCards = alumniList.map(alumni => {
        return (
            <AlumniCard key={alumni.id} alumni={alumni} />
        );
    });

    return (
        <div className={styles['alumni-screen']}>
            <ScreenTitle>ALUMINI</ScreenTitle>
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

export default AlumniScreen;
