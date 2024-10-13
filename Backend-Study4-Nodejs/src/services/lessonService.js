const connection = require('../config/database');

const handleGetAllUnit = async () => {
    try {
        let [result, fields] = await connection.query('select * from unit');

        console.log('res: ', result);

        return result;
    } catch (e) {
        return 'Failed Get';
    }
};

module.exports = {
    handleGetAllUnit,
};
