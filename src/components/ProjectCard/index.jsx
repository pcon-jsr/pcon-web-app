import React from 'react';
import styles from './index.module.scss';
import Card from '../Card';
import CustomButton from '../CustomButton';

const ProjectCard = ({ project }) => {
    
    return (
        <React.Fragment>
            <Card key={project.id} className={styles['project-card']}>
                <h3 className={styles['title']}>{project.title}</h3>
                <h5>Tech Stack / Domain</h5>
                <p className={styles['content']}>{project.techStack}</p>
                <a target="_blank" rel="noopener noreferrer" href={project.link}>
                    <CustomButton>VIEW PROJECT</CustomButton>
                </a>
            </Card>
        </React.Fragment>
    );
};

export default ProjectCard;
