import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import ScreenTitle from '../../components/ScreenTitle';
import Grid from '../../components/Grid';
import AlumniCard from '../../components/AlumniCard';
import { alumniRef } from '../../firebase/firebase.utils';
import LoadingSpinner from '../../components/LoadingSpinner';
import CustomInput from '../../components/CustomInput';
import { useForm } from '../../hooks/form-hook';
import Card from '../../components/Card';

const companyRankMap = {
    'google': 1,
    'microsoft': 2,
    'amazon': 3,
    'goldman sachs': 4,
    'ge': 5,
    'ge healthcare': 6,
    'shopee': 7,
    "lowe's india": 8,
}

const compareByCompany = (alumn1, alumn2) => {
    const company1 = alumn1.company.toLowerCase();
    const company2 = alumn2.company.toLowerCase();
    if (companyRankMap[company1] && companyRankMap[company2]) {
        if (companyRankMap[company1] === companyRankMap[company2]) {
            return (alumn1.name < alumn2.name ? -1 : 1);
        }
        return companyRankMap[company1] - companyRankMap[company2];
    } else if (companyRankMap[company1]) {
        return -1;
    } else if (companyRankMap[company2]) {
        return 1;
    } else {
        return (alumn1.name < alumn2.name ? -1 : 1);
    }
}

const compareAlumn = (alumn1, alumn2) => {

    if (alumn1.batch === alumn2.batch) {
        return compareByCompany(alumn1, alumn2);
    }

    return (alumn1.batch - alumn2.batch);
}

const INITIAL_SEARCH_STATE = {
    inputs: {
        search: {
            value: "",
            isValid: true,
        },
    },
    isValid: true,
}

const AlumniScreen = () => {
    const [alumniList, setAlumniList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { formState, inputHandler } = useForm(INITIAL_SEARCH_STATE);

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


    const searchValue = formState.inputs.search.value.trim().toLowerCase();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [searchValue]);

    const renderedCards = alumniList.filter(alumn => {

        return (
            alumn.name.toLowerCase().includes(searchValue)
            || alumn.company.toLowerCase().includes(searchValue)
            || alumn.batch.toString().toLowerCase().includes(searchValue)
        );
    }).map(alumni => {
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
                <Card className={styles['search-card']}>
                    <form className={styles['search-form']}>
                        <CustomInput
                            id="search"
                            type="text"
                            label="Search"
                            validators={[]}
                            getInput={inputHandler}
                            placeholder={`search by name or company`}
                            initialValidity={true}
                        />
                    </form>
                </Card>
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
