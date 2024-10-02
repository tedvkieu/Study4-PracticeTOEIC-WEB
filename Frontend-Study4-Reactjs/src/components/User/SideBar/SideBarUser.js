import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';

import {
    FaTachometerAlt,
    FaGem,
    FaList,
    FaGithub,
    FaRegLaughWink,
    FaHeart,
    FaCaretLeft,
    FaCaretRight,
} from 'react-icons/fa';

import { DiReact } from 'react-icons/di';
import { Link, useNavigate } from 'react-router-dom';
import './SideBarUser.scss';

const SideBarUser = (props) => {
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
                            onClick={() =>
                                navigate(
                                    '/user/complete-toeic/learn'
                                )
                            }>
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
                            Từ Vựng TOEIC
                            <Link to="/user/complete-toeic/vocabulary-list" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem>
                            Ngữ Pháp TOEIC
                            <Link to="/admin" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem>
                            Part 1: Photographs: Nghe Tranh
                            <Link to="/admin" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem>
                            Part 2: Question - Response - Hỏi - đáp
                            <Link to="/admin" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem>
                            Part 3: Conversations - Nghe hiểu đối thoại
                            <Link to="/admin" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem>
                            Part 4: Talks - Nghe hiểu bài nói
                            <Link to="/admin" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem>
                            Part 5: Incomplete Sentences - Điền từ vào câu
                            <Link to="/admin" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem>
                            Part 6: Text Completion - Điền từ vào đoạn văn
                            <Link to="/admin" />
                        </MenuItem>
                    </Menu>
                    {/* <Menu iconShape="circle">
                        <SubMenu icon={<FaGem />} title="Features">
                            <MenuItem>
                                Quan Ly Users
                                <Link to="/admin/manage-user" />
                            </MenuItem>
                            <MenuItem>
                                Quan Ly Bai Quiz
                                <Link to="/admin/manage-quizzes" />
                            </MenuItem>

                            <MenuItem>
                                {' '}
                                Quan Ly Cau Hoi
                                <Link to="/admin/manage-questions" />
                            </MenuItem>

                            <MenuItem>
                                {' '}
                                Quan Ly Cau Hoi
                                <Link to="#" />
                            </MenuItem>
                        </SubMenu>
                    </Menu> */}
                    <Menu iconShape="circle">
                        <MenuItem>
                            Part 7: Reading Comprehension - Đọc hiểu văn bản
                            <Link to="/admin" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem>
                            Gia hạn khóa học
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

export default SideBarUser;
