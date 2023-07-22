const axios = require('axios').default;

const ConfessionService = {
    submitConfession : (confessionData) => axios.post('/api/submit', confessionData).then(res => res.data),
    fetchConfessions : (pageNumber, filterBy) => axios.get(`/api/list/${filterBy}/${pageNumber}`).then(res => res.data),
    fetchPopular : () => axios.get(`/api/popular`).then(res => res.data),
    fetchSingleConfession : (confessionID) => axios.get(`/api/single/${confessionID}`).then(res => res.data),
    addComment : (newcomment) => axios.post('/api/comment', newcomment).then(res => res.data),
    addLike : (id) => axios.put(`/api/like/${id}`).then(res => res.data),
    removeLike : (id) => axios.put(`/api/confession/unliked&id=${id}`).then(res => res.data)
};

export default ConfessionService;