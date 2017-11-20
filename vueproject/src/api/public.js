import axios from 'axios';

axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
// axios.defaults.headers.post['Expect'] ='100-continue'’Content-Type’为’multipart/form-data’。
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'

export default {
    fetchGet(url, params = {}) {
        return new Promise(function (resolve, reject) {
            axios.get(url, params).then(function (res) {
                resolve(res.data);
            }).catch(function (error) {
                reject(error);
            });
        })
    },
    fetchPost(url, params = {}) {
        return new Promise(function (resolve, reject) {
            axios.post(url, params).then(function (res) {
                resolve(res.data);
            }).catch(function (error) {
                reject(error);
            });
        });
    }
}