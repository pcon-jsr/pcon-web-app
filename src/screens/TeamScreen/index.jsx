import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import ScreenTitle from '../../components/ScreenTitle';
import Grid from '../../components/Grid';
import { teamRef } from '../../firebase/firebase.utils';
import LoadingSpinner from '../../components/LoadingSpinner';
import TeamCard from '../../components/TeamCard';

const heirarchyMap = {
    'President': 1,
    'General Secretary': 2,
    'Technical Secretary': 3,
    'Treasurer': 4,
    'Member': 5,
};

function comapareFinalYearGuys(member1, member2) {
    if (member1.role === 'Member' && member2.role === 'Member') {
        return member1.name < member2.name ? -1 : 1;
    } else {
        return heirarchyMap[member1.role] - heirarchyMap[member2.role];
    }
}

function compareTeamMembers(member1, member2) {
    if (member1.type === 'Faculty') {
        return -1;
    } else if (member1.type === 'Final Year' && member2.type === 'Pre-Final Year') {
        return -1;
    } else if (member1.type === 'Final Year' && member2.type === 'Final Year') {
        return comapareFinalYearGuys(member1, member2);
    } else {
        return member1.name < member2.name ? -1 : 1;
    }
}

const TeamScreen = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let listener;

        const fetchTeamMembers = async () => {
            listener = teamRef.on('value', listSnapshot => {
                const teamList = [];

                listSnapshot.forEach(snapshot => {
                    teamList.push({
                        id: snapshot.key,
                        ...snapshot.val()
                    });
                });

                teamList.sort(compareTeamMembers);

                setTeamMembers(teamList);
                setLoading(false);
            });
        }

        fetchTeamMembers();

        return () => {
            if (listener) {
                teamRef.off('value', listener);
            }
        };
    }, []);

    const renderedFacultyMembers = teamMembers.filter(member => member.type === "Faculty").map(member => {
        return (
            <TeamCard key={member.id} teamMember={member} />
        );
    });

    const renderedFinalYearMembers = teamMembers.filter(member => member.type === "Final Year").map(member => {
        return (
            <TeamCard key={member.id} teamMember={member} />
        );
    });

    const renderedPreFinalYearMembers = teamMembers.filter(member => member.type === "Pre-Final Year").map(member => {
        return (
            <TeamCard key={member.id} teamMember={member} />
        );
    });

    return (
        <div className={styles['team-screen']}>
            <ScreenTitle>TEAM</ScreenTitle>
            {loading && (
                <LoadingSpinner />
            )}
            {!loading && (
                <Grid className={styles['grid-faculty']}>
                    {renderedFacultyMembers}
                </Grid>
            )}
            {!loading && (renderedFinalYearMembers.length > 0) && (
                <>
                    <ScreenTitle>Final Year</ScreenTitle>
                    <Grid className={styles['grid']}>
                        {renderedFinalYearMembers}
                    </Grid>
                </>
            )}
            {!loading && (renderedPreFinalYearMembers.length > 0) && (
                <>
                    <ScreenTitle>Pre-Final Year</ScreenTitle>
                    <Grid className={styles['grid']}>
                        {renderedPreFinalYearMembers}
                    </Grid>
                </>
            )}
        </div>
    );
};

export default TeamScreen;
