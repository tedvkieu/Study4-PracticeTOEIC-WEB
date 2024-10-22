const connection = require('../config/database');
const { getAll, getALesson } = require('../models/Lesson_ListVoc');

const getAllUsers = async () => {
    let [results, fields] = await connection.query('select * from Users');
    return results;
};

const getUserByID = async (userId) => {
    let [results, fields] = await connection.query(
        'select * from Users where id = ?',
        [userId]
    );
    let user = results && results.length > 0 ? results[0] : {};

    return user;
};

const updateUserById = async (userId, email, name, city) => {
    let [results, fields] = await connection.query(
        `UPDATE Users SET email = ?, name = ?, city = ? where id = ?`,
        [email, name, city, userId]
    );
};

const deleteUserById = async (id) => {
    let [results, fields] = await connection.query(
        `delete from Users where id = ?`,
        [id]
    );
};

const handleGetList = async () => {
    let [results, fields] = await connection.query(
        'select * from list_vocabulary'
    );

    console.log('check rs: ', results);

    return JSON.stringify(results);
};

const handleGetAlistVoc = async (list_id) => {
    try {
        let [results, fields] = await connection.query(
            'SELECT f.*, l.* FROM vocabulary f JOIN list_vocabulary l ON f.list_id = l.list_id WHERE f.list_id = ?',
            [list_id]
        );

        if (results.length === 0) {
            return {
                statusCode: 404,
                message: `Không tìm thấy danh sách từ vựng với list_id = ${list_id}.`,
            };
        }

        return {
            statusCode: 200,
            message: 'Lấy danh sách từ vựng thành công.',
            data: results,
        };
    } catch (error) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', error);
        return {
            statusCode: 500,
            message: 'Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu.',
        };
    }
};

const handleGetListAnswer = async (vocabulary_id) => {
    try {
        console.log('chekc id: ', vocabulary_id);
        const [results, fields] = await connection.query(
            'SELECT * FROM practice_answer_voc WHERE vocabulary_id = ?',
            [vocabulary_id]
        );

        console.log(results);

        return results;
    } catch (error) {
        console.error('Error executing query:', error);
        return 'Database query failed';
    }
};

const handleGetListLesson = async (userid, listid, lessonid) => {
    // const [results, fields] = await connection.query(
    //     'SELECT * FROM lesson WHERE unit_id = ?',
    //     [id]
    // );

    if (lessonid) {
        const [results, fields] = await getALesson(userid, listid, lessonid);
        console.log('xem: ', results);
        return results;
    } else {
        const [results, fields] = await getAll(userid);
        console.log('xem: ', results);
        return results;
    }
};

const handleChangeStatusStudy = async (id) => {
    try {
        await connection.query(
            'UPDATE lesson_list_vocabulary SET learned = 1, learned_date = NOW() WHERE id = ?',
            [id]
        );
        return 'Update Success';
    } catch (e) {
        return 'Failed Update';
    }
};

module.exports = {
    getAllUsers,
    getUserByID,
    updateUserById,
    deleteUserById,
    handleGetList,
    handleGetAlistVoc,
    handleGetListAnswer,
    handleGetListLesson,
    handleChangeStatusStudy,
};
