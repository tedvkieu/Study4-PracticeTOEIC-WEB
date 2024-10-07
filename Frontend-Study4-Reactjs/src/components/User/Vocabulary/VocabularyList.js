import './VocabularyList.scss';
import { useEffect, useState } from 'react';
import { getAllListVoc } from '../../../services/apiServices';
import { RiCheckboxCircleFill } from 'react-icons/ri';

const VocabularyList = () => {
    const [listVoc, setListVoc] = useState([]);

    const handleGetAllListVoc = async () => {
        let res = await getAllListVoc();

        setListVoc(res);
        console.log(res);
    };

    useEffect(() => {
        handleGetAllListVoc();
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

            {listVoc && listVoc.length > 0 ? (
                listVoc.map((item, index) => (
                    <div className="content-block" key={item.list_id}>
                        <div className="card-header">
                            <h4 className="learncourse-heading mb-2">
                                {item.name}
                            </h4>
                        </div>
                        <div className="learncourse-unit-lesson-content">
                            <a href={`/complete-toeic/vocabulary-list/word/${item.list_id}`}>
                                <div className="learncourse-unit-lesson-activity">
                                    <div className="learncourse-activity-title">
                                        <div className="learncourse-activity-icon-wrapper">
                                            <RiCheckboxCircleFill
                                                style={{
                                                    fontSize: '22px',
                                                    alignItems: 'center',
                                                    justifyItems: 'center',
                                                    color: '#3cb46e',
                                                }}
                                            />
                                            {/* <span className="learncourse-activity-icon fas fa-check completed"></span> */}
                                        </div>
                                        <div className="learncourse-activity-title-content">
                                            <div>
                                                <strong>Từ vựng: </strong>
                                                Flashcards
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a href="/courses/28/complete-toeic/learn/activities/6784/">
                                <div className="learncourse-unit-lesson-activity">
                                    <div className="learncourse-activity-title">
                                        <div className="learncourse-activity-icon-wrapper">
                                            <RiCheckboxCircleFill
                                                style={{
                                                    fontSize: '22px',
                                                    alignItems: 'center',
                                                    justifyItems: 'center',
                                                    color: '#3cb46e',
                                                }}
                                            />
                                            {/* <span className="learncourse-activity-icon fas fa-check completed"></span> */}
                                        </div>
                                        <div className="learncourse-activity-title-content">
                                            <div>
                                                <strong>Luyện tập: </strong>
                                                Trắc nghiệm từ vựng
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a href="/courses/28/complete-toeic/learn/activities/6784/">
                                <div className="learncourse-unit-lesson-activity">
                                    <div className="learncourse-activity-title">
                                        <div className="learncourse-activity-icon-wrapper">
                                            <RiCheckboxCircleFill
                                                style={{
                                                    fontSize: '22px',
                                                    alignItems: 'center',
                                                    justifyItems: 'center',
                                                    color: '#3cb46e',
                                                }}
                                            />
                                            {/* <span className="learncourse-activity-icon fas fa-check completed"></span> */}
                                        </div>
                                        <div className="learncourse-activity-title-content ml-1">
                                            <div>
                                                <strong>Luyện tập: </strong>
                                                Tìm cặp
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a href="/courses/28/complete-toeic/learn/activities/6784/">
                                <div className="learncourse-unit-lesson-activity">
                                    <div className="learncourse-activity-title">
                                        <div className="learncourse-activity-icon-wrapper">
                                            <RiCheckboxCircleFill
                                                style={{
                                                    fontSize: '22px',
                                                    alignItems: 'center',
                                                    justifyItems: 'center',
                                                    color: '#3cb46e',
                                                }}
                                            />
                                            {/* <span className="learncourse-activity-icon fas fa-check completed"></span> */}
                                        </div>
                                        <div className="learncourse-activity-title-content ml-1">
                                            <div>
                                                <strong>Luyện tập: </strong>
                                                Nghe từ vựng
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="/courses/28/complete-toeic/learn/activities/6784/">
                                <div className="learncourse-unit-lesson-activity">
                                    <div className="learncourse-activity-title">
                                        <div className="learncourse-activity-icon-wrapper">
                                            <RiCheckboxCircleFill
                                                style={{
                                                    fontSize: '22px',
                                                    alignItems: 'center',
                                                    justifyItems: 'center',
                                                    color: '#3cb46e',
                                                }}
                                            />
                                            {/* <span className="learncourse-activity-icon fas fa-check completed"></span> */}
                                        </div>
                                        <div className="learncourse-activity-title-content ml-1">
                                            <div>
                                                <strong>Luyện tập: </strong>
                                                Dịch Nghĩa
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a href="/courses/28/complete-toeic/learn/activities/6784/">
                                <div className="learncourse-unit-lesson-activity">
                                    <div className="learncourse-activity-title">
                                        <div className="learncourse-activity-icon-wrapper">
                                            <RiCheckboxCircleFill
                                                style={{
                                                    fontSize: '22px',
                                                    alignItems: 'center',
                                                    justifyItems: 'center',
                                                    color: '#3cb46e',
                                                }}
                                            />
                                            {/* <span className="learncourse-activity-icon fas fa-check completed"></span> */}
                                        </div>
                                        <div className="learncourse-activity-title-content ml-1">
                                            <div>
                                                <strong>Luyện tập: </strong>
                                                Nghe chính tả
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading...</p> // Thêm phần thông báo khi chưa có dữ liệu
            )}
        </>
    );
};

export default VocabularyList;
