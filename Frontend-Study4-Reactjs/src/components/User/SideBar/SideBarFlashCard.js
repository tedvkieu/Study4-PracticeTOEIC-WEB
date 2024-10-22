import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';

import { FaGithub, FaCaretLeft, FaCaretRight } from 'react-icons/fa';

import { DiReact } from 'react-icons/di';
import { Link, useNavigate } from 'react-router-dom';
import './SideBarUser.scss';

const SideBarFlashCard = (props) => {
    const navigate = useNavigate();
    const { collapsed, setCollapsed, toggled, handleToggleSidebar } = props;

    const handleClickToggle = () => {
        setCollapsed((prev) => {
            console.log('Current collapsed state:', prev); // Xem trạng thái hiện tại
            return !prev; // Đảo ngược trạng thái
        });
    };

    return (
        <>
            <ProSidebar
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
                style={{
                    height: 'auto',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Đổ bóng
                    backgroundColor: '#13395e', // Màu nền
                }}>
                <SidebarHeader>
                    <div
                        style={{
                            padding: '10px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}>
                        <DiReact size={'3em'} color={'00bfff'} />
                        <span
                            className="title-course"
                            onClick={() => navigate('/complete-toeic/learn')}>
                            COMPLETE TOEIC
                        </span>
                        <div
                            style={{
                                display: 'flex',
                                float: 'right',
                                alignItems: 'center',
                            }}>
                            {collapsed ? (
                                <FaCaretRight
                                    onClick={handleClickToggle}
                                    size={'2em'}
                                    style={{ cursor: 'pointer' }}
                                />
                            ) : (
                                <FaCaretLeft
                                    onClick={handleClickToggle}
                                    size={'2em'}
                                    style={{ cursor: 'pointer' }}
                                />
                            )}
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem>
                            List 1
                            <Link to="/complete-toeic/vocabulary" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem>
                            List 2
                            <Link to="/admin" />
                        </MenuItem>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}>
                        <a
                            href="https://github.com/tedvkieu"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer">
                            <FaGithub />
                            <span
                                style={{
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                }}>
                                &#165; Duong Van Kieu
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    );
};

export default SideBarFlashCard;
