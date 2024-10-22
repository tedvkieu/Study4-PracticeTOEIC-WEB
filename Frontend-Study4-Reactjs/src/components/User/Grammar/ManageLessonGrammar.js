import { useParams } from 'react-router-dom';
import SlideFlashcard from './Lesson/SlideFlashcard';
import MultipleChoice from './Lesson/MultipleChoice';
import { useEffect, useState } from 'react';
import {
    handleGetAListWord,
    handleGetAllLesson,
    getAllListVoc,
} from '../../../services/apiServices';
import './ManageLessonVocabulary.scss';
import FindPairVocabulary from './Lesson/FindPairVocabulary';
import { useSelector } from 'react-redux';

const lessonComponents = {
    1: SlideFlashcard,
    2: MultipleChoice,
    3: FindPairVocabulary,
};

const ManageLessonVocabulary = () => {
    //--------------------------------------------Config State----------------------------------------
    const { list_id, lesson_id } = useParams();
    const userId = useSelector((state) => state.user.account.id);
    
    const [listVocabulary, setListVocabulary] = useState([]);
    const [listWord, setListWord] = useState([]);
    const [listLesson, setListLesson] = useState([]);
    const [currentLesson, setCurrentLesson] = useState({});
    const LessonComponent = lessonComponents[lesson_id];

    // ------------------------------------------- Get Data ------------------------------------------
    const getAListWord = async () => {
        try {
            const res = await handleGetAListWord(list_id);
            console.log('Dữ liệu từ API: ', res);

            if (Array.isArray(res) && res.length > 0) {
                setListWord(res);
            } else {
                console.log('Không có từ vựng nào được trả về.');
            }
        } catch (error) {
            console.error('Lỗi khi lấy từ vựng: ', error);
        }
    };
    const getAllListLesson = async () => {
        try {
            let res = await handleGetAllLesson(1);

            setListLesson(res);
            setCurrentLesson(res[lesson_id - 1]);
        } catch (err) {
            console.log('check err: ', err);
        }
    };
    const getAllListWord = async () => {
        try {
            let res = await getAllListVoc();
            console.log('chekc list vocba: ', res);
            setListVocabulary(res);
        } catch (err) {
            console.log('check err: ', err);
        }
    };

    // ------------------------------------------------- BreadCrums---------------------------------------
    const breadcrumbs = [
        { label: 'Complete TOEIC', path: '/complete-toeic/learn' },
        { label: 'Từ vựng TOEIC', path: '/complete-toeic/vocabulary' },
    ];
    listVocabulary.forEach((list) => {
        listLesson.forEach((lesson) => {
            breadcrumbs.push({
                label: list.name,
                path: `/complete-toeic/vocabulary/list/${list.list_id}/lesson/${lesson.lesson_id}`,
            });
        });
    });

    // ------------------------------------------------- React DOM ---------------------------------------
    useEffect(() => {
        getAListWord();
        getAllListWord();
        getAllListLesson();
    }, []);

    useEffect(() => {
        console.log('chekc lesson: ', currentLesson);
    }, [currentLesson]);

    useEffect(() => {
        if (lesson_id) {
            getAllListLesson();
        }
    }, [lesson_id]);

    // --------------------------------------------------- Render Component -------------------------------
    return (
        <>
            <LessonComponent
        
                listWord={listWord}
                lesson={currentLesson}
                getAllListLesson={getAllListLesson}
            />
        </>
    );
};

export default ManageLessonVocabulary;
