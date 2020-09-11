import React from 'react';
import styles from './index.module.scss';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import { SiLinkedin } from 'react-icons/si';

const AlumniCard = (props) => {
    const { alumni } = props;

    return (
        <div className={styles['alumni-item']}>
            <Card className={styles['alumni-card']}>
                <Avatar src={alumni.photoURL} className={styles['avatar']} />
                <div className={styles['body']}>
                    <span className={styles['name']}>{alumni.name}</span>
                    <span className={styles['batch']}>{`Class of ${alumni.batch}`}</span>
                    <span className={styles['company']}>{alumni.company}</span>

                </div>
                <div className={styles['footer']}>
                    <a target="_blank" rel="noopener noreferrer" href={alumni.linkedinURL}>
                        <SiLinkedin className={styles['linkedin-icon']} />
                    </a>
                </div>
            </Card>
        </div>
    );
};

export default AlumniCard;
