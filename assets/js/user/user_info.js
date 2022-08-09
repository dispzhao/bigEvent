$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) return '昵称长度必须在1~6个字符之间！'
        }
    })
    initUserInfo()
    // 初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取用户信息失败')
                // 使用form.val()给表单快速赋值
                form.val('UserInfo', res.data)
            }
        })
    }
    // 重置按钮重置表单数据
    $('#userReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('提交失败')
                layer.msg('提交成功！')
                // 调用父页面方法，更新用户信息  chrome 5+中，window.parent无法在file://协议中运行，但是发布了之后http://协议下是可以运行的。
                window.parent.getUserInfo()
            }
        })
    })
})