import React from 'react';
import styles from './NavLinks.module.scss';
import { NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { SiMoleculer } from 'react-icons/si';
import { BsFillStarFill, BsCalendarFill } from 'react-icons/bs';
import { FaUserGraduate } from 'react-icons/fa';

import { navigationRoutes } from './routes';

const MainNavLinks = () => {
    return (
        <IconContext.Provider value={{ className: styles['icon'] }}>
            <ul className={styles['nav-links']}>
                <li>
                    <p>EVENTS</p>
                    <NavLink exact to={navigationRoutes.EVENTS} activeClassName={styles['active']}>
                        <BsCalendarFill />
                    </NavLink>
                </li>
                <li>
                    <p>PROJECTS</p>
                    <NavLink exact to={navigationRoutes.PROJECTS} activeClassName={styles['active']}>
                        <SiMoleculer />
                    </NavLink>
                </li>
                <li>
                    <p>ACHIEVEMENTS</p>
                    <NavLink exact to={navigationRoutes.ACHIEVEMENTS} activeClassName={styles['active']}>
                        <BsFillStarFill />
                    </NavLink>

                </li>
                <li>
                    <p>ALUMINI</p>
                    <NavLink exact to={navigationRoutes.ALUMINI} activeClassName={styles['active']}>
                        <FaUserGraduate />
                    </NavLink>
                </li>
            </ul>
        </IconContext.Provider>
    );
};

export default MainNavLinks;
