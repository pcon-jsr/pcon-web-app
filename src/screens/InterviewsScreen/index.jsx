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
import CustomInput from '../../components/CustomInput';
import { useForm } from '../../hooks/form-hook';
import ToggleButton from 'react-toggle-button';

// const companyRankMap = {
//     'google': 1,
//     'microsoft': 2,
//     'amazon': 3,
//     'goldman sachs': 4,
//     'arcesium': 5,
//     'ge': 6,
//     'ge healthcare': 7,
//     'shopee': 8,
//     "lowe's india": 9,
//     'samsung': 10,
// }

// const compareByCompany = (company1, company2) => {
//     if (companyRankMap[company1] && companyRankMap[company2]) {
//         return companyRankMap[company1] - companyRankMap[company2];
//     } else if (companyRankMap[company1]) {
//         return -1;
//     } else if (companyRankMap[company2]) {
//         return 1;
//     } else {
//         return (company1 < company2 ? -1 : 1);
//     }
// }

// const compareInterviews = (interview1, interview2) => {
//     // if (interview1.year === interview2.year) {
//     //     return compareByCompany(interview1.companyName, interview2.companyName);
//     // }

//     // return interview1.year > interview2.year ? -1 : 1;
//     return compareByCompany(interview1.companyName, interview2.companyName);
// }

const INITIAL_SEARCH_STATE = {
    inputs: {
        search: {
            value: "",
            isValid: true,
        },
    },
    isValid: true,
}

const InterviewsScreen = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useContext(AuthContext);
    const { formState, inputHandler } = useForm(INITIAL_SEARCH_STATE);
    const [onlyInternship, setOnlyInternship] = useState(true);
    const [onlyFullTime, setOnlyFullTime] = useState(true);
    const [scrollY, setScrollY] = useState(0);
    const [onlyMine, setOnlyMine] = useState(false);

    useEffect(() => {
        const unsubscribeInterviews = interviewsCollectionRef.where("verified", "==", true).orderBy('createdAt', "desc").onSnapshot(snapshot => {
            const interviewsList = snapshot.docs.map(interviewDoc => ({
                id: interviewDoc.id,
                ...interviewDoc.data(),
            }));

            // interviewsList.sort(compareInterviews);
            setInterviews(interviewsList);
            setLoading(false);
        });

        return () => {
            unsubscribeInterviews();
        };
    }, []);

    const searchValue = formState.inputs.search.value.trim().toLowerCase();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [searchValue, onlyFullTime, onlyInternship]);

    const renderedInterviews = interviews.filter(interview => {
        return (
            interview.user?.name.toLowerCase().includes(searchValue)
            || interview.companyName.toLowerCase().includes(searchValue)
            || interview.user?.branch.toLowerCase().includes(searchValue)
        ) && (
                (
                    interview.type === 'FULL TIME' && onlyFullTime
                ) || (
                    interview.type === 'INTERNSHIP' && onlyInternship
                )
            ) && (
                onlyMine ? onlyMine && interview.user.id === auth.user.id : true
            );
    }).map(interview => {
        const localDate = getLocalDateFromFirebaseTimestamp(interview.createdAt);
        return (
            <Card key={interview.id} className={styles['interview-card']}>
                <div className={styles['header']}>
                    <h2>{interview.companyName}</h2>
                    <span className={styles['type']}>{interview.type}</span>
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
                    {
                        auth.user && auth.user.id === interview.user.id && (
                            <CustomButton to={`${navigationRoutes.EDIT_INTERVIEW}/${interview.id}`}>
                                EDIT
                            </CustomButton>
                        )
                    }
                </div>
            </Card>
        );
    });

    useEffect(() => {
        const onScroll = () => {
            setScrollY(window.scrollY);
        }
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <div className={styles['interviews-screen']}>
            <h3 className={styles['screen-title']}>INTERVIEW EXPERIENCES</h3>
            {loading && <LoadingSpinner asOverlay />}
            {!loading && !interviews.length && <h4>No interviews found!</h4>}
            {!loading && interviews.length > 0 && (
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
                            initialValue={formState.inputs.search.value}
                            className={`${styles['search-input']} ${(scrollY > 200) && styles['fixed']}`}
                        />
                        <div className={styles['toggle-input']}>
                            <label>FULL TIME</label>
                            <ToggleButton
                                colors={{
                                    activeThumb: {
                                        base: '#fff',
                                    },
                                    inactiveThumb: {
                                        base: '#fff',
                                    },
                                    active: {
                                        base: '#02aca6',
                                    },
                                    inactive: {
                                        base: '#4A4A4C',
                                    }
                                }}
                                value={onlyFullTime || false}
                                onToggle={(value) => {
                                    setOnlyFullTime(!value);
                                }}
                            />
                        </div>
                        <div className={styles['toggle-input']}>
                            <label>INTERNSHIP</label>
                            <ToggleButton
                                colors={{
                                    activeThumb: {
                                        base: '#fff',
                                    },
                                    inactiveThumb: {
                                        base: '#fff',
                                    },
                                    active: {
                                        base: '#02aca6',
                                    },
                                    inactive: {
                                        base: '#4A4A4C',
                                    }
                                }}
                                value={onlyInternship || false}
                                onToggle={(value) => {
                                    setOnlyInternship(!value);
                                }}
                            />
                        </div>
                        {
                            auth.user && (
                                <div className={styles['toggle-input']}>
                                    <label>MY EXPERIENCES</label>
                                    <ToggleButton
                                        colors={{
                                            activeThumb: {
                                                base: '#fff',
                                            },
                                            inactiveThumb: {
                                                base: '#fff',
                                            },
                                            active: {
                                                base: '#02aca6',
                                            },
                                            inactive: {
                                                base: '#4A4A4C',
                                            }
                                        }}
                                        value={onlyMine || false}
                                        onToggle={(value) => {
                                            setOnlyMine(!value);
                                        }}
                                    />
                                </div>
                            )
                        }
                    </form>
                </Card>
            )}
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
