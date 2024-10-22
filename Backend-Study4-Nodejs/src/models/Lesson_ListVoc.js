// models/User.js

const connection = require('../config/database'); // Giả sử bạn đã kết nối cơ sở dữ liệu

const getAll = async (user_id) => {
    const query = `SELECT  
                        lv.name AS list, 
                        l.name AS lesson,
                        llv.id,
                        llv.learned,
                        lv.total_words AS total,     
                        llv.learned_date,
                        llv.list_vocabulary_id as list_id, 
                        llv.lesson_id,
                        u.id as user
                    FROM 
                        lesson_list_vocabulary llv
                    JOIN 
                        lesson l ON llv.lesson_id = l.lesson_id
                    JOIN 
                        users u ON llv.user_id = u.id
                    JOIN 
                        list_vocabulary lv ON llv.list_vocabulary_id = lv.list_id
                    WHERE 
                        u.id =1
                    ORDER BY 
                        lv.list_id asc, llv.lesson_id ASC;`;

    let rs = connection.query(query, user_id);
    return rs;
};

const getALesson = async (user_id, list_id, lesson_id) => {
    const query = `SELECT  
                        lv.name AS list, 
                        l.name AS lesson,
                        llv.id,
                        llv.learned,
                        lv.total_words AS total,     
                        llv.learned_date,
                        llv.list_vocabulary_id as list_id, 
                        llv.lesson_id,
                        u.id as user
                    FROM 
                        lesson_list_vocabulary llv
                    JOIN 
                        lesson l ON llv.lesson_id = l.lesson_id
                    JOIN 
                        users u ON llv.user_id = u.id
                    JOIN 
                        list_vocabulary lv ON llv.list_vocabulary_id = lv.list_id
                    WHERE 
                        u.id =? and list_id = ${list_id} and llv.lesson_id = ${lesson_id}
                    ORDER BY 
                        lv.list_id asc, llv.lesson_id ASC;`;

    let rs = connection.query(query, user_id);
    return rs;
};

module.exports = { getAll, getALesson };
