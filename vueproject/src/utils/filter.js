export function formatDate(createTime) {
    var Year = createTime.getFullYear();
    var Month = createTime.getMonth() < 10 ? '0' + createTime.getMonth() : createTime.getMonth();
    var Day = createTime.getDate() < 10 ? '0' + createTime.getDate() : createTime.getDate();
    var Hour = createTime.getHours() < 10 ? '0' + createTime.getHours() : createTime.getHours();
    var Seconds = createTime.getSeconds() < 10 ? '0' + createTime.getSeconds() : createTime.getSeconds();
    var Minutes = createTime.getMinutes() < 10 ? '0' + createTime.getMinutes() : createTime.getMinutes();
    return Year + '-' + Month + '-' + Day + ' ' + Hour + ':' + Seconds + ':' + Minutes;
}