import HeaderBar from './HeaderUser/HeaderBar';
import './User.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SideBarUser from './SideBar/SideBarUser';

const User = (props) => {
    const [collapsed, setCollapsed] = useState(true);
    return (
        <div className="user-container">
            <div className="user-content">
                <div className="header-sidebar">
                    <HeaderBar />
                </div>

                <div className="body-content">
                    <div className="sidebar-container">
                        <SideBarUser
                            collapsed={!collapsed}
                            setCollapsed={setCollapsed}
                        />
                    </div>

                    <div className="user-main">
                        <div className="learncourse-navigation">
                            <div
                                className="learncourse-navigation-links"
                                id="learncourse-navigation-links">
                                <div className="learncourse-navigation-link">
                                    <a href="/courses/28/complete-toeic/learn/">
                                        Complete TOEIC
                                    </a>
                                </div>

                                <div className="learncourse-navigation-link">
                                    <span className="far fa-chevron-right mr-2 ml-2"></span>
                                    <a href="/courses/28/complete-toeic/learn/units/186/">
                                        Từ vựng TOEIC
                                    </a>
                                </div>
                            </div>

                            <div className="learncourse-navigation-actions">
                                <div className="learncourse-right-actions ml-1">
                                    <span
                                        className="learncourse-toggle jqtoggle"
                                        data-target="#learncourse-wrapper"
                                        data-toggle-classname="is-right-toggled">
                                        <span className="fal fa-book-open"></span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <PerfectScrollbar>
                            <div className="learncourse-main-content">
                                <div className="content-header">
                                    <div className="sm-container">
                                        <div className="main-block">
                                            <Outlet />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </PerfectScrollbar>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default User;
