import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import ScreenTitle from '../../components/ScreenTitle';
import Grid from '../../components/Grid';
import AlumniCard from '../../components/AlumniCard';
import { alumniRef } from '../../firebase/firebase.utils';
import LoadingSpinner from '../../components/LoadingSpinner';

const isFromTechGiant = (alumn) => {
    return [
        'google',
        'microsoft',
        'amazon',
        'goldman sachs',
        'ge healthcare',
        'ge',
        'shopee',
        `lowe's india`,
    ].includes(alumn.company.toLowerCase());
}

const compareAlumn = (alumn1, alumn2) => {

    if (alumn1.batch === alumn2.batch) {
        if (isFromTechGiant(alumn1) && isFromTechGiant(alumn2)) {
            return (alumn1.name < alumn2.name ? -1 : 1);
        } else if (isFromTechGiant(alumn1) && !isFromTechGiant(alumn2)) {
            return -1;
        } else if (!isFromTechGiant(alumn1) && isFromTechGiant(alumn2)) {
            return 1;
        } else {
            return (alumn1.name < alumn2.name ? -1 : 1);
        }
    }

    return (alumn1.batch - alumn2.batch);
}

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

                alumniData.sort(compareAlumn);

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
            <ScreenTitle>ALUMNI</ScreenTitle>
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
