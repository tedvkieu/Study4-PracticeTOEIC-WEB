import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import './SlideFlashcard.scss';
import { handleGetAListWord } from '../../../services/apiServices';
import { ImVolumeHigh } from 'react-icons/im';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { FaRegSmileBeam, FaRegMeh, FaRegDizzy } from 'react-icons/fa';
import { TbPlayerTrackNext } from 'react-icons/tb';

const SlideFlashcard = () => {
    const [flashCardState, setFlashCardState] = useState(false);
    const [listWord, setListWord] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState({});
   const [statusStudy, setStatusStudy] = useState(false);

    const params = useParams();
    const wordId = params.id;
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
        // setAudioFile(currentWord.audio_uk_url);
        if (audioRef.current) {
            // audioRef.current = currentWord.audio_uk_url;
            console.log(audioRef);
            // audioRef.current.play();
            audioRef.current.play().catch((error) => {
                console.error('Error playing audio:', error);
            });
        }
    };

    const handleClickFlashcard = () => {
        setFlashCardState(!flashCardState);
    };

    const getAllListWord = async () => {
        try {
            const res = await handleGetAListWord(wordId); // Giả sử bạn lấy dữ liệu từ API
            console.log('Dữ liệu từ API: ', res);

            // Kiểm tra xem res có tồn tại và là mảng không
            if (Array.isArray(res) && res.length > 0) {
                setListWord(res); // Thiết lập state nếu res là mảng và có ít nhất một phần tử
                setCurrentWord(res[0]);
            } else {
                console.log('Không có từ vựng nào được trả về.');
            }
        } catch (error) {
            console.error('Lỗi khi lấy từ vựng: ', error);
        }
    };

    useEffect(() => {
        getAllListWord();
    }, []);

    return (
        <div className="flashcards-container">
            <div className="completion-bar">
                <span>Hoàn thành bài học!</span>
            </div>
            <div
                className={`content-block-wrapper ${
                    flashCardState ? 'flipped' : ''
                }`}
                onClick={handleClickFlashcard}>
                <div className="content-block main-flash before-content">
                    <div className="word-main">
                        <div className="word-text mb-1" id={currentWord.word}>
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
                                    <div className="font-500">Định nghĩa:</div>
                                    <div className="prewrap mb-2">
                                        {currentWord.definition}
                                    </div>
                                    <div className="mb-2">
                                        <div className="font-500">Ví dụ:</div>
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
