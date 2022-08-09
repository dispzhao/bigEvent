
$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    // 点击上传图片
    $('#btnFiles').on('click', function () {
        $('#file').click()
    })
    // 监听文件上传change事件
    $('#file').on('change', function (e) {
        var fileList = e.target.files
        if (fileList.length === 0) return layui.layer.msg('请上传图片！')
        // 拿到选择的文件
        var file = e.target.files[0]
        // 根据选择的文件创建对应的url地址
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    // 为确定按钮绑定点击事件
    $('#btnUpload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg('更换头像失败！')
                layui.layer.msg('更换成功！')
                // 重新渲染用户信息
                window.parent.getUserInfo()
            }
        })
    })
})