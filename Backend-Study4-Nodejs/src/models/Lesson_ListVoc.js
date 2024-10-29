// models/User.js

const connection = require('../config/database'); // Giả sử bạn đã kết nối cơ sở dữ liệu

const getAll = async (user_id) => {
    const query = `SELECT  
                        lv.name AS list,
                        l.name,
                        llv.learned,
                        lv.total_words AS total,     
                        llv.learned_date,
                        llv.list_id,
                        llv.lesson_id,
                        u.id as user
                    FROM 
                        lesson_vocabulary llv
                    JOIN 
                        lesson l ON llv.lesson_id = l.lesson_id
                    JOIN 
                        users u ON llv.user_id = u.id
                    JOIN 
                        list_vocabulary lv ON llv.list_id = lv.list_id 
                    WHERE 
                        u.id =? 
                    ORDER BY 
                        lv.list_id asc, llv.lesson_id ASC;`;

    let rs = connection.query(query, user_id);
    return rs;
};

const getALesson = async (user_id, list_id, lesson_id) => {
    const query = `SELECT  
                        lv.name AS list,
                        l.name,
                        llv.learned,
                        lv.total_words AS total,     
                        llv.learned_date,
                        llv.list_id,
                        llv.lesson_id,
                        u.id as user
                    FROM 
                        lesson_vocabulary llv
                    JOIN 
                        lesson l ON llv.lesson_id = l.lesson_id
                    JOIN 
                        users u ON llv.user_id = u.id
                    JOIN 
                        list_vocabulary lv ON llv.list_id = lv.list_id 
                    WHERE 
                        u.id =${user_id} and llv.list_id = ${list_id} and llv.lesson_id = ${lesson_id}
                    ORDER BY 
                        lv.list_id asc, llv.lesson_id ASC;`;

    let rs = connection.query(query);
    return rs;
};

const setUpStateLearned = async (id) => {
    try {
        // Truy vấn danh sách lesson và vocabulary
        let [listLesson] = await connection.query(
            `SELECT * FROM lesson WHERE unit_id = 1`
        );
        let [listVoc] = await connection.query(`SELECT * FROM list_vocabulary`);

        console.log('Check list lesson:', listLesson);
        console.log('Check list vocabulary:', listVoc);

        // Chèn dữ liệu vào bảng lesson_list_vocabulary
        for (let i = 0; i < listVoc.length; i++) {
            for (let j = 0; j < listLesson.length; j++) {
                await connection.query(
                    `INSERT INTO lesson_vocabulary (lesson_id, list_id, user_id, learned) VALUES (?, ?, ?, 0)`,
                    [listLesson[j].lesson_id, listVoc[i].list_id, id]
                );
            }
        }

        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error setting up state learned:', error);
    }
};

module.exports = { getAll, getALesson, setUpStateLearned };
