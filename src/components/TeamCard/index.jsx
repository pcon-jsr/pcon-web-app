import React from 'react';
import styles from './index.module.scss';
import Card from '../Card';
import Avatar from '../Avatar';
import { SiLinkedin, SiGithub } from 'react-icons/si';
import CustomButton from '../CustomButton';

const TeamCard = (props) => {
    const { teamMember } = props;

    const {
        name,
        role,
        linkedinURL,
        githubURL,
        facultyURL,
        photoURL,
    } = teamMember;
    return (
        <div className={styles['team-item']}>
            <Card className={styles['team-card']}>
                <Avatar src={photoURL} className={styles['avatar']} />
                <div className={styles['body']}>
                    <span className={styles['name']}>{name}</span>
                    <span className={styles['role']}>{`${role}`}</span>
                    <div className={styles['profile-links']}>

                    </div>
                </div>
                <div className={styles['footer']}>
                    {linkedinURL && (
                        <a target="_blank" rel="noopener noreferrer" href={linkedinURL}>
                            <SiLinkedin className={styles['linkedin-icon']} />
                        </a>
                    )}
                    {githubURL && (
                        <a target="_blank" rel="noopener noreferrer" href={githubURL}>
                            <SiGithub className={styles['github-icon']} />
                        </a>
                    )}
                    {facultyURL && (
                        <a target="_blank" rel="noopener noreferrer" href={facultyURL}>
                            <CustomButton>VIEW PROFILE</CustomButton>
                        </a>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default TeamCard;
