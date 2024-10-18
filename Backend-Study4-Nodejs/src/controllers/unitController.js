const {
    getAllVocabularyService,
    createVocabularyService,
    updateVocabularyService,
} = require('../services/unitService');

const getAllListVocabulary = async (req, res) => {
    let result = await getAllVocabularyService();

    return res.status(200).json({
        EC: 0,
        EM: 'Get all user Success',
        DT: result,
    });
};

const createAVocabulary = async (req, res) => {
    const data = [
        req.body.word,
        req.body.pronunciation,
        req.body.definition,
        req.body.example,
        req.body.image_url,
        req.body.hint,
        req.body.word_type,
        req.body.learned,
        req.body.remembered,
        req.body.need_review,
        req.body.audio_uk_url,
        req.body.audio_us_url,
        req.body.list_id,
    ];

    let result = await createVocabularyService(data);
    if (result === 1) {
        return res.send({
            EC: -1,
            EM: 'List Vocabulary is full!! Please... Pick another List',
            DT: null,
        });
    } else {
        return res.send({
            EC: 0,
            EM: `This Word is added into List ${req.body.list_id}`,
            DT: result,
        });
    }
};

const updateAVocabulary = async (req, res) => {
    const data = [
        req.body.id,
        req.body.list_id,
        req.body.word,
        req.body.pronunciation,
        req.body.definition,
        req.body.example,
        req.body.image_url,
        req.body.hint,
        req.body.word_type,
        req.body.learned,
        req.body.remembered,
        req.body.need_review,
        req.body.audio_uk_url,
        req.body.audio_us_url,
    ];
    let result = await updateVocabularyService(data);
    if (result === 1) {
        return res.send({
            EC: -1,
            EM: 'Do not find any word',
            DT: null,
        });
    } else {
        return res.send({
            EC: 0,
            EM: `This Word is updated in List ${req.body.list_id}`,
            DT: result,
        });
    }
};

module.exports = {
    getAllListVocabulary,
    createAVocabulary,
    updateAVocabulary,
};
