import api from "./index";

export const boardApi = {
    postFreeBoard: (data) => api.post("/freeboard", data),
    updateFreeBoard: (data) => api.put("/freeboard", data),
    deleteFreeBoard: (id) => api.delete(`/freeboard/${id}`),
    getFreeBoardList: (sort) => api.get("/freeboard", { params: { sort: sort } }),
    getFreeBoardDetail: (id) => api.get(`/freeboard/${id}`),
    getMyPostFreeBoardList: (sort) => api.get("/freeboard/my-post", { params: { sort: sort } }),
    getFreeBoardComments: (id, params) => api.get(`/freeboard/${id}/comment`, { params }),
    postFreeBoardComment: (id, data) => api.post(`/freeboard/${id}/comment`, data),
    updateFreeBoardComment: (id, data) => api.put(`/freeboard/${id}/comment`, data),
    deleteFreeBoardComment: (id) => api.delete(`/freeboard/${id}/comment`),
    getLikeFreeBoard: (id) => api.get(`/freeboard/${id}/like`),
    likeFreeBoard: (id) => api.post(`/freeboard/${id}/like`),
    unlikeFreeBoard: (id) => api.delete(`/freeboard/${id}/like`),

    getNoticeBoardList: () => api.get("/noticeboard"),
    getNoticeBoardDetail: (id) => api.get(`/noticeboard/${id}`),
    postNoticeBoard: (data) => api.post("/noticeboard", data),
    updateNoticeBoard: (data) => api.put("/noticeboard", data),
    deleteNoticeBoard: (id) => api.delete(`/noticeboard/${id}`),
    getNoticeBoardComments: (id, pageNo) => api.get(`/noticeboard/${id}/comment`, { params: { pageNo } }),
    postNoticeBoardComment: (id, data) => api.post(`/noticeboard/${id}/comment`, data),
    updateNoticeBoardComment: (id, data) => api.put(`/noticeboard/${id}/comment`, data),
    deleteNoticeBoardComment: (id) => api.delete(`/noticeboard/${id}/comment`),
}