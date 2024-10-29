import { useEffect, useState } from 'react';
import './MultipleChoice.scss';
import Switch from 'react-js-switch';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import {
    handleChangeStatusStudy,
    handleGetAllLesson,
    handleGetListAnswer,
} from '../../../../services/apiServices';
import { useNavigate } from 'react-router-dom';

const MultipleChoice = (props) => {
    const { listWord, lesson, getAllListLesson } = props;
    const [listAnswer, setListAnswer] = useState([]);
    const [currentWord, setCurrentWord] = useState({});
    const [isSwitchOn, setIsSwitchOn] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [autoNextQuestion, setAutoNextQuestion] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [statusStudy, setStatusStudy] = useState(true);

    console.log('check lesson: ', lesson);

    const navigate = useNavigate();

    const switch_onChange_handle = () => {
        setIsSwitchOn(!isSwitchOn);
        setAutoNextQuestion(!autoNextQuestion);
    };
    const handleClick = (index, isCorrect) => {
        setSelectedIndex(index);
        if ((isCorrect && autoNextQuestion) === true) {
            setTimeout(() => {
                handleNextWord();
            }, 1000);
        }
    };

    const serviceGetListAnswer = async () => {
        let res = await handleGetListAnswer(currentWord.vocabulary_id);
        console.log('check answer: ', res);
        setListAnswer(res);
    };

    const handleNextWord = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex =
                prevIndex < listWord.length - 1
                    ? prevIndex + 1
                    : listWord.length - 1;
            setCurrentWord(listWord[newIndex]);
            return newIndex;
        });
        setSelectedIndex(null);
    };
    const handlePreviousWord = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex > 0 ? prevIndex - 1 : 0;
            setCurrentWord(listWord[newIndex]);
            return newIndex;
        });
        setSelectedIndex(null);
    };

    const handleClickCurrentQuestion = (id) => {
        setCurrentIndex(id);
        setCurrentWord(listWord[id]);
        setSelectedIndex(null);
    };

    const changeStatusStudy = async () => {
        let res = await handleChangeStatusStudy(
            lesson.user,
            lesson.lesson_id,
            lesson.list_id
        );

        if (res.EC === 0) {
            getAllListLesson();
            navigate(-1);
        }
    };

    useEffect(() => {
        if (listWord.length > 0) {
            setCurrentWord(listWord[0]);
        }
    }, [listWord]);
    useEffect(() => {
        if (currentWord) {
            serviceGetListAnswer();
        }
    }, [currentWord]);

    useEffect(() => {
        if (lesson) {
            setStatusStudy(lesson.learned);
        }
    }, [lesson]);

    return (
        <>
            {statusStudy === 0 ? (
                <div className="completion-bar" onClick={changeStatusStudy}>
                    <span>Hoàn thành bài học!</span>
                </div>
            ) : (
                <></>
            )}
            <div className="content-block">
                <div className="exercise" id="exercise">
                    <div id="playGround">
                        <div id="questionParent">
                            <div id="question">
                                <h1 className="questionTitle">
                                    {currentWord.word}
                                </h1>{' '}
                                <p id="hint">Hint {currentWord.hint}</p>
                                {listAnswer.map((item, index) => {
                                    const isSelected = selectedIndex === index;
                                    const divStyle = {
                                        backgroundColor: isSelected
                                            ? item.correct_answer
                                                ? 'green'
                                                : 'red'
                                            : 'transparent', // Màu nền trong suốt nếu chưa được chọn
                                    };

                                    return (
                                        <div
                                            key={index} // Nên sử dụng giá trị duy nhất làm key
                                            id="variantjedna"
                                            variant="jedna"
                                            className="variant jedna"
                                            style={divStyle} // Áp dụng style động
                                            onClick={() =>
                                                handleClick(
                                                    index,
                                                    item.correct_answer
                                                )
                                            } // Gọi hàm khi nhấp vào
                                        >
                                            {item.answer}
                                        </div>
                                    );
                                })}
                            </div>
                            <div id="sound">
                                <audio src="" hidden></audio>
                            </div>
                            {/* <div className="next">Další</div> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="problem-set-controls">
                <div
                    className="problem-set-control-btn problem-set-prev"
                    onClick={handlePreviousWord}>
                    <GrFormPrevious size={'13px'} />
                    Câu trước
                </div>

                <div className="problem-set-autonext-timer mt-2">
                    <div className="custom-control custom-switch">
                        <Switch
                            value={isSwitchOn}
                            onChange={switch_onChange_handle}
                        />
                        <label className="custom-control-label">
                            Tự động chuyển câu
                        </label>
                    </div>
                </div>

                <div
                    className="problem-set-control-btn problem-set-next"
                    onClick={handleNextWord}>
                    Câu sau
                    <GrFormNext size={'13px'} />
                </div>
            </div>

            <div className="content-block">
                <h5 className="title-question">Danh sách bài tập:</h5>
                <div className="problemset-change-problem">
                    {Array.isArray(listWord) &&
                        listWord.map((item, index) => (
                            <div
                                key={index}
                                className={`problemset-problem-number jqchange-problem ${
                                    currentIndex === index ? 'active' : ''
                                }`}
                                onClick={() =>
                                    handleClickCurrentQuestion(index)
                                }>
                                {index + 1}
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default MultipleChoice;
