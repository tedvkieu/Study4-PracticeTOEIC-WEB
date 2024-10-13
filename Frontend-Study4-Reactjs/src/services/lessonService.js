import axios from '../utils/axiosCustomize';

const handleGetAllUnit = () => {
    return axios.get(`/api/unit/get-all-list-unit`);
};

export { handleGetAllUnit };
