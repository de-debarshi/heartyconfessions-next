const axios = require('axios').default;
//const apiUrl = 'https://www.heartyconfessions.com/';
// const apiUrl = 'http://192.168.29.241:3000/';
const apiUrl = 'http://localhost:3000/';

const ConfessionService = {
    submitConfession : (confessionData) => axios.post(apiUrl+'api/submit', confessionData).then(res => res.data),
    fetchConfessions : (pageNumber, filterBy) => axios.get(`${apiUrl}api/list/${filterBy}/${pageNumber}`).then(res => res.data),
    fetchSingleConfession : (confessionID) => axios.get(`${apiUrl}api/single/${confessionID}`).then(res => res.data),
    addComment : (newcomment) => axios.post(apiUrl+'api/comment', newcomment).then(res => res.data),
    addLike : (id) => axios.put(`${apiUrl}api/like/${id}`).then(res => res.data),
    removeLike : (id) => axios.put(`${apiUrl}api/confession/unliked&id=${id}`).then(res => res.data)
};

export default ConfessionService;