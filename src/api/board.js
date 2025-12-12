import api from "./index";

export const boardApi = {
    postFreeBoard: (data) => api.post("/freeboard", data),
    updateFreeBoard: (data) => api.put("/freeboard", data),
    deleteFreeBoard: (id) => api.delete(`/freeboard/${id}`),
    getFreeBoardList: (sort) => api.get("/freeboard", { params: { sort: sort } }),
    getFreeBoardDetail: (id) => api.get(`/freeboard/${id}`),
    getMyPostFreeBoardList: (sort) => api.get("/freeboard/my-post", { params: { sort: sort } }),

    getNoticeBoardList: () => api.get("/noticeboard"),
    getNoticeBoardDetail: (id) => api.get(`/noticeboard/${id}`),
    postNoticeBoard: (data) => api.post("/noticeboard", data),
    updateNoticeBoard: (data) => api.put("/noticeboard", data),
    deleteNoticeBoard: (id) => api.delete(`/noticeboard/${id}`),
}