import './VocabularyList.scss';
import { useEffect, useState } from 'react';
import {
    getAllListVoc,
    handleGetAllLesson,
} from '../../../services/apiServices';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { FaRegCircle } from 'react-icons/fa';

import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { setListVoc, setListLesson } from '../../../redux/action/userAction';

const VocabularyList = () => {
    //const [listVoc, setListVoc] = useState([]);
    //const [listLesson, setListLesson] = useState([]);
    const [routeLink] = useState(['word/', 'practice/multiple-choice/']);
    const dispatch = useDispatch();
    const listVoc = useSelector((state) => state.user.listVoc);
    const listLesson = useSelector((state) => state.user.listLesson);

    const handleGetAllListVoc = async () => {
        let res = await getAllListVoc();
        console.log('check list voc: ', res);

        dispatch(setListVoc(res));
        console.log(res);
    };
    const getAllLesson = async () => {
        try {
            let res = await handleGetAllLesson(1);

            console.log('chekc list lesson: ', res);

            //setListLesson(res);
            dispatch(setListLesson(res));
        } catch (err) {
            console.log('check err: ', err);
        }
    };

    useEffect(() => {
        handleGetAllListVoc();
        getAllLesson();
    }, []);

    return (
        <>
            <div className="content-block">
                <div className="card-header">
                    <h4 className="learncourse-heading mb-2">
                        Tiến độ học tập
                    </h4>
                </div>
                <div className="card-body">
                    <div className="learncourse-progressbar">
                        <span className="progress-percent">53%</span>
                        <div className="progress my-1">
                            <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{
                                    width: '53%',
                                }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {listVoc && listVoc.length > 0 && listLesson ? (
                listVoc.map((item, index) => (
                    <div className="content-block" key={item.list_id}>
                        <div className="card-header">
                            <h4 className="learncourse-heading mb-2">
                                {item.name}
                            </h4>
                        </div>
                        <div className="learncourse-unit-lesson-content">
                            {listLesson &&
                                listLesson.map((lesson, index) => (
                                    <a
                                        key={index}
                                        href={`/complete-toeic/vocabulary-list/${
                                            routeLink[index % routeLink.length]
                                        }${item.list_id}`}>
                                        <div className="learncourse-unit-lesson-activity">
                                            <div className="learncourse-activity-title">
                                                <div className="learncourse-activity-icon-wrapper">
                                                    {lesson.status_study ===
                                                    1 ? (
                                                        <RiCheckboxCircleFill
                                                            style={{
                                                                fontSize:
                                                                    '22px',
                                                                alignItems:
                                                                    'center',
                                                                justifyItems:
                                                                    'center',
                                                                color: '#3cb46e',
                                                            }}
                                                        />
                                                    ) : (
                                                        <FaRegCircle
                                                            style={{
                                                                fontSize:
                                                                    '20px',
                                                                alignItems:
                                                                    'center',
                                                                justifyItems:
                                                                    'center',
                                                                color: '#3cb46e',
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                                <div className="learncourse-activity-title-content">
                                                    <div>
                                                        <strong>
                                                            Từ vựng:{' '}
                                                        </strong>
                                                        {lesson.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading...</p> // Thêm phần thông báo khi chưa có dữ liệu
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VocabularyList);
