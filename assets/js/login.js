$(function () {
    $('#link-reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link-login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    // 获取layuiform对象
    var form = layui.form;
    // 获取layer对象
    var layer = layui.layer;
    // 验证规则
    form.verify({
        // 自定义密码验证规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 两次密码验证
        repwd: function (value) {
            var pwds = $('.reg-box [name=password]').val()
            if (pwds != value) {
                return '两次输入密码不一致'
            }
        }
    })
    // 监听注册表单提交事件
    $('#reg-form').on('submit', function (e) {
        e.preventDefault()
        let data = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg(res.message);
            $('#link-login').click()
        })
    })
    // 监听登录表单提交事件
    $('#login-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('登录失败！')
                layer.msg('登录成功！')
                // 保存token到localstorage
                localStorage.setItem('token', res.token)
                // 跳转到主页
                location.href = './index.html'
            }
        })
    })
})