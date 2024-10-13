import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import './SlideFlashcard.scss';
import {
    handleChangeStatusStudy,
    handleGetAllLesson,
} from '../../../../services/apiServices';
import { ImVolumeHigh } from 'react-icons/im';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { FaRegSmileBeam, FaRegMeh, FaRegDizzy } from 'react-icons/fa';
import { TbPlayerTrackNext } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { setListLesson } from '../../../../redux/action/userAction';

const SlideFlashcard = (props) => {
    const [flashCardState, setFlashCardState] = useState(false);
    const { listWord, lesson } = props;
    const [statusStudy, setStatusStudy] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const audioRef = useRef(null);

    const handleNextWord = () => {
        setFlashCardState(false);
        setCurrentIndex((prevIndex) => {
            const newIndex =
                prevIndex < listWord.length - 1 ? prevIndex + 1 : 0;
            console.log('checck index: ', newIndex);
            setCurrentWord(listWord[newIndex]); // Sử dụng giá trị mới cập nhật
            return newIndex;
        });
    };

    const handlePlayAudio = (event) => {
        event.stopPropagation();
        if (audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.error('Error playing audio:', error);
            });
        }
    };

    const handleClickFlashcard = () => {
        setFlashCardState(!flashCardState);
    };

    console.log('check wordid: ', lesson.lesson_id);
    const changeStatusStudy = async () => {
        let res = await handleChangeStatusStudy(lesson.lesson_id);

        if (res.EC === 0) {
            let updatedLessonList = await handleGetAllLesson(1);
            dispatch(setListLesson(updatedLessonList));
            navigate(-1);
        }
    };
    useEffect(() => {
        if (lesson) {
            setStatusStudy(lesson.status_study);
        }
    }, [lesson]);

    useEffect(() => {
        if (listWord.length > 0) {
            setCurrentWord(listWord[0]);
        }
    }, [listWord]);

    return (
        <div className="flashcards-container">
            {statusStudy === 0 ? (
                <div className="completion-bar" onClick={changeStatusStudy}>
                    <span>Hoàn thành bài học!</span>
                </div>
            ) : (
                <></>
            )}

            {currentWord ? (
                <div
                    className={`content-block-wrapper ${
                        flashCardState ? 'flipped' : ''
                    }`}
                    onClick={handleClickFlashcard}>
                    <div className="content-block main-flash before-content">
                        <div className="word-main">
                            <div
                                className="word-text mb-1"
                                id={currentWord.word}>
                                {currentWord.word} &nbsp;
                            </div>
                            <span className="jq-audio-player mr-3">
                                <audio
                                    id={currentWord.word}
                                    ref={audioRef}
                                    src={currentWord.audio_uk_url}></audio>
                                <span className="jq-audio-btn audio-btn">
                                    UK&nbsp;
                                    <ImVolumeHigh
                                        style={{
                                            color: '#0c6ff9',
                                            backgroundColor: '#e8f2ff',
                                            padding: '10px',
                                            borderRadius: '50px',
                                        }}
                                        size={'35px'}
                                        onClick={handlePlayAudio}
                                    />
                                </span>
                            </span>
                            <span className="jq-audio-player ml-3">
                                <audio
                                    id={currentWord.word}
                                    ref={audioRef}
                                    src={currentWord.audio_us_url}></audio>
                                <span className="jq-audio-btn audio-btn">
                                    US&nbsp;
                                    <ImVolumeHigh
                                        style={{
                                            color: '#0c6ff9',
                                            backgroundColor: '#e8f2ff',
                                            padding: '10px',
                                            borderRadius: '50px',
                                        }}
                                        size={'35px'}
                                        onClick={handlePlayAudio}
                                    />
                                </span>
                            </span>
                        </div>

                        <div className="info-word">
                            <span className="word-type title-3">
                                {currentWord.word_type}
                            </span>
                            <span className="pronoun-word title-3">
                                {currentWord.pronunciation}
                            </span>
                        </div>
                    </div>
                    <div className="content-block main-flash after-content">
                        <div className="row">
                            <div className="flash-back-left">
                                <PerfectScrollbar>
                                    <div className="flashcard-back-content">
                                        <div className="font-500">
                                            Định nghĩa:
                                        </div>
                                        <div className="prewrap mb-2">
                                            {currentWord.definition}
                                        </div>
                                        <div className="mb-2">
                                            <div className="font-500">
                                                Ví dụ:
                                            </div>
                                            <ul className="termlist-item-examples">
                                                <li>{currentWord.example}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </PerfectScrollbar>
                            </div>

                            <div className="flash-back-right">
                                <div className="termlist-item-images">
                                    <img
                                        data-src={currentWord.image_url}
                                        src={currentWord.image_url}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}

            <div className="content-block static-content">
                <div className="flashcard-action-controls">
                    <div className="controls text-success">
                        <FaRegSmileBeam size={'24px'} />
                        <div className="mt-2 text-state">Dễ</div>
                    </div>
                    <div className="controls text-warning">
                        <FaRegMeh size={'24px'} />
                        <div className="mt-2 text-state">Trung Bình</div>
                    </div>
                    <div className="controls text-danger">
                        <FaRegDizzy size={'24px'} />
                        <div className="mt-2 text-state">Khó</div>
                    </div>
                    <div
                        className="controls control-1"
                        onClick={handleNextWord}>
                        <TbPlayerTrackNext size={'24px'} />
                        <div className="mt-2 text-state">Next</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlideFlashcard;
