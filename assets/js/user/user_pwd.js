$(function () {
    var form = layui.form
    var layer = layui.layer
    // 定义密码校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) return '新旧密码不能相同！'
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) return '两次密码不一致！'
        }
    })
    // 监听提交事件 发起ajax请求获取密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('修改密码失败')
                layer.msg('修改密码成功，即将跳转到登录界面！')
                setTimeout(() => {
                    localStorage.removeItem('token')
                    window.parent.location.href = '/code/login.html'
                }, 2000);
            }
        })
    })


})