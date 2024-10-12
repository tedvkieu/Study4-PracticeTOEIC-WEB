import HeaderBar from './HeaderUser/HeaderBar';
import './User.scss';

import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SideBarUser from './SideBar/SideBarUser';
import SideBarFlashCard from './SideBar/SideBarFlashCard';
import Breadcrumb from './Breadcrumb/Breadcrumb';

const User = (props) => {
    const [collapsed, setCollapsed] = useState(true);
    const location = useLocation();
    const isVocabularyList = location.pathname.includes('word');

    let breadcrumbItems = [];
    if (location.pathname === '/complete-toeic/learn') {
        breadcrumbItems = [
            { label: 'Complete TOEIC', path: '/complete-toeic/learn' },
        ];
    } else if (location.pathname === '/complete-toeic/vocabulary-list') {
        breadcrumbItems = [
            { label: 'Complete TOEIC', path: '/complete-toeic/learn' },
            { label: 'Từ vựng TOEIC', path: '/complete-toeic/vocabulary-list' },
        ];
    } else if (location.pathname.includes('/complete-toeic/vocabulary-list/')) {
        breadcrumbItems = [
            { label: 'Complete TOEIC', path: '/complete-toeic/learn' },
            { label: 'Từ vựng TOEIC', path: '/complete-toeic/vocabulary-list' },
            { label: 'List 1', path: '/complete-toeic/vocabulary-list/word/1' }, // Cập nhật theo id hoặc tên danh sách
        ];
    }
    return (
        <div className="user-container">
            <div className="user-content">
                <div className="header-sidebar">
                    <HeaderBar />
                </div>

                <div className="body-content">
                    <div className="sidebar-container">
                        {isVocabularyList ? (
                            <SideBarFlashCard
                                collapsed={!collapsed}
                                setCollapsed={setCollapsed}
                            />
                        ) : (
                            <SideBarUser
                                collapsed={!collapsed}
                                setCollapsed={setCollapsed}
                            />
                        )}
                    </div>

                    <div className="user-main">
                        <div className="learncourse-navigation">
                            <Breadcrumb items={breadcrumbItems} />
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
