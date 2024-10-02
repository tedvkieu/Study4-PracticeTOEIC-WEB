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
                        <div class="learncourse-navigation">
                            <div
                                class="learncourse-navigation-links"
                                id="learncourse-navigation-links">
                                <div class="learncourse-navigation-link">
                                    <a href="/courses/28/complete-toeic/learn/">
                                        Complete TOEIC
                                    </a>
                                </div>

                                <div class="learncourse-navigation-link">
                                    <span class="far fa-chevron-right mr-2 ml-2"></span>
                                    <a href="/courses/28/complete-toeic/learn/units/186/">
                                        Từ vựng TOEIC
                                    </a>
                                </div>
                            </div>

                            <div class="learncourse-navigation-actions">
                                <div class="learncourse-right-actions ml-1">
                                    <span
                                        class="learncourse-toggle jqtoggle"
                                        data-target="#learncourse-wrapper"
                                        data-toggle-class="is-right-toggled">
                                        <span class="fal fa-book-open"></span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <PerfectScrollbar>
                            <div className="learncourse-main-content">
                                <div class="content-header">
                                    <div class="sm-container">
                                        <h1
                                            class="font-600 learncourse-heading"
                                            id="complete-toeic">
                                            Complete TOEIC
                                        </h1>
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
