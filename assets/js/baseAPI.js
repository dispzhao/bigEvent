// 每次发起请求都会调用此函数，拿到ajax的配置对象，以此可以拼接url地址
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url;
})