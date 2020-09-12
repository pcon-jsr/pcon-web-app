import React from 'react';
import styles from './SideNavLinks.module.scss';
import { NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FaGithub } from 'react-icons/fa';
import { BsPeopleFill } from 'react-icons/bs';
import { SiSlack, SiMoleculer } from 'react-icons/si';

import { navigationRoutes } from './routes';

const SideNavLinks = () => {
    return (
        <IconContext.Provider value={{ className: styles['icon'] }}>
            <ul className={`${styles['nav-links']}`}>
                <li>

                    <NavLink exact to={navigationRoutes.PROJECTS} activeClassName={styles['active']}>
                        <SiMoleculer />
                        <p>PROJECTS</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to={navigationRoutes.TEAM} activeClassName={styles['active']}>
                        <BsPeopleFill />
                        <p>TEAM</p>
                    </NavLink>

                </li>
                {/* <li>
                    <NavLink exact to={navigationRoutes.GALLERY} activeClassName={styles['active']}>
                        <IoMdPhotos />
                        <p>GALLERY</p>
                    </NavLink>
                </li> */}
                <li>
                    <a target="_blank" rel="noopener noreferrer" href={`https://github.com/pcon-jsr`}>
                        <FaGithub />
                        <p>GITHUB</p>
                    </a>
                </li>
                <li>
                    <a target="_blank" rel="noopener noreferrer" href={`https://join.slack.com/t/pcon-nitjsr-workspace/shared_invite/enQtNDI4MTEwNTg1MzMzLTlhZGQ2YzA0Y2QwMzA4YTQzNmYxNWRjMmQ3MTIwYWI1MGQ0N2MwNTFkZmMxZjA1YTM4ZjUxZmZiN2MzZmFiYzI`}>
                        <SiSlack />
                        <p>SLACK</p>
                    </a>
                </li>
            </ul>
        </IconContext.Provider>
    );
};

export default SideNavLinks;
