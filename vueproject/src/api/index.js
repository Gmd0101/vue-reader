import http from './public'
//注册
export const register = function (params) {
    return http.fetchPost('/users/register', params);
}
//登录
export const login = function (params) {
    return http.fetchPost('/users/login', params);
}
//查询个人信息
export const person = function (params) {
    return http.fetchPost('/users/person', params);
}
// 修改个人信息
export const upload = function (params) {
    return http.fetchPost('/users/upload', params);
}
//修改密码
export const editpsw = function (params) {
    return http.fetchPost('/users/pwd', params);
}
//获取文章类型
export const category = function (params) {
    return http.fetchGet('/users/cate', params);
}
//同一类型的文章
export const catelist = function (params) {
    return http.fetchPost('/users/categorylist', params);
}
//发表文章
export const article = function (params) {
    return http.fetchPost('/users/article', params);
}
//获取所有的文章
export const gainarticle = function (params) {
    return http.fetchGet('/users/gainarticle', params);
}
//文章详情
export const detail = function (params) {
    return http.fetchPost('/users/articledetail', params);
}
//收藏文章
export const collect = function (params) {
    return http.fetchPost('/users/articlecollect', params);
}
//查找收藏的文章
export const personalcollect = function (params) {
    return http.fetchPost('/users/personalcollect', params);
}
//查找发表的文章
export const userwrite = function (params) {
    return http.fetchPost('/users/userarticle', params);
}
//浏览次数
export const brower = function (params) {
    return http.fetchPost('/users/brower', params);
}
//修改信息
export const editmsg = function (params) {
    return http.fetchPost('/users/editmsg', params);
}
//评论
export const reply = function (params) {
    return http.fetchPost('/users/replies', params);
}
//显示评论
export const getreply = function (params) {
    return http.fetchPost('/users/getreplies', params);
}