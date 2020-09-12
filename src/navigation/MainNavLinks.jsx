import React from 'react';
import styles from './NavLinks.module.scss';
import { NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { BsFillStarFill, BsCalendarFill } from 'react-icons/bs';
import { FaUserGraduate, FaUserTie } from 'react-icons/fa';

import { navigationRoutes } from './routes';

const MainNavLinks = () => {
    return (
        <IconContext.Provider value={{ className: styles['icon'] }}>
            <ul className={styles['nav-links']}>
                <li>
                    <NavLink exact to={navigationRoutes.EVENTS} activeClassName={styles['active']}>
                        <BsCalendarFill />
                        <p>EVENTS</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to={navigationRoutes.INTERVIEW_EXPERIENCES} activeClassName={styles['active']}>
                        <FaUserTie />
                        <p>INTERVIEWS</p>
                    </NavLink>

                </li>
                <li>

                    <NavLink exact to={navigationRoutes.ACHIEVEMENTS} activeClassName={styles['active']}>
                        <BsFillStarFill />
                        <p>ACHIEVEMENTS</p>
                    </NavLink>

                </li>
                <li>

                    <NavLink exact to={navigationRoutes.ALUMNI} activeClassName={styles['active']}>
                        <FaUserGraduate />
                        <p>ALUMNI</p>
                    </NavLink>
                </li>
            </ul>
        </IconContext.Provider>
    );
};

export default MainNavLinks;
