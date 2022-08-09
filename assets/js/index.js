$(function () {
    getUserInfo();
    // 获取用户信息函数
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg('获取用户信息失败')
                //渲染用户信息
                readerAvatar(res.data);
            }
        })
    }
    // 渲染函数
    function readerAvatar(user) {
        // 1.获取用户昵称
        let names = user.nickname || user.username
        $('.welcome').html('欢迎&nbsp;&nbsp;' + names);
        // 2.获取用户头像
        if (user.user_pic == null) {
            // 渲染文字头像
            $('.layui-nav-img').hide()
            let first = names[0].toUpperCase()
            $('.text-avatar').html(first).show()
        } else {
            // 渲染图片头像
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        }
    }
    // 为退出按钮绑定点击事件
    $('#btn-loginout').on('click', function () {
        //提示用户是否退出提示框
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //清空local中的token
            localStorage.removeItem('token')
            location.href = '/code/login.html'
            layer.close(index);
        });
    })













})