const connection = require('../config/database');

const getAllVocabularyService = async () => {
    try {
        let [result] = await connection.query('select * from vocabulary');

        return result;
    } catch (error) {
        return error;
    }
};

const createVocabularyService = async (data) => {
    const query = `
        INSERT INTO vocabulary (list_id, word, pronunciation, definition, example, image_url, hint, word_type, learned, remembered, need_review, audio_uk_url, audio_us_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
        let checkTotalWord = await getTotalWordsByListId(data[0]);

        console.log('check total: ', checkTotalWord);
        if (checkTotalWord === null) {
            return 1;
        }
        let [result, fields] = await connection.query(query, data);

        return result;
    } catch (error) {
        console.error('Error inserting vocabulary:', error);
        throw error;
    }
};

const updateVocabularyService = async (data) => {
    const query = `
        UPDATE vocabulary 
        SET list_id = ?, word = ?, pronunciation = ?, definition = ?, example = ?, image_url = ?, hint = ?, word_type = ?, learned = ?, remembered = ?, need_review = ?, audio_uk_url = ?, audio_us_url = ?
        WHERE id = ?
    `;

    try {
        // Chèn dữ liệu vào câu lệnh query
        let [result, fields] = await connection.query(query, data);

        console.log('check update result:', result);

        return result;
    } catch (error) {
        console.error('Error updating vocabulary:', error);
        return error;
    }
};

const getTotalWordsByListId = async (listId) => {
    const query = `SELECT total_words FROM list_vocabulary WHERE list_id = ?`;
    const wordsQuery = `SELECT word FROM vocabulary WHERE list_id = ?`;

    try {
        const [rows] = await connection.query(query, [listId]);
        const [totalRows] = await connection.query(wordsQuery, [listId]);

        let currentRow = rows[0].total_words;
        console.log('check roww:', currentRow);
        console.log('check totalroww:', totalRows.length);

        if (totalRows.length === currentRow || totalRows.length > currentRow) {
            return null;
        }
        return;
    } catch (error) {
        console.error('Error fetching total words:', error);
        throw error; // Ném lại lỗi để controller có thể xử lý
    }
};
module.exports = {
    getAllVocabularyService,
    createVocabularyService,
    updateVocabularyService,
};
