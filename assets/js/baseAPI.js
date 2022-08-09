// 每次发起请求都会调用此函数，拿到ajax的配置对象，以此可以拼接url地址
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    // 统一为有权限的接口设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
        // 统一挂载complete回调函数
        options.complete = function (res) {
            // 不能没有登陆直接访问index页面
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token')
                location.href = '/code/login.html'
            }
        }
    }
})