const layer = layui.layer

$(function () {
    getUserInfo()

    // 点击退出按钮，确认时关闭页面，点击取消则不做任何操作
    $('#exit').on('click', function () {
        layer.confirm('确认退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = 'login.html'
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        }
    })
}

// 定义渲染用户头像和名称的函数
function renderAvatar(user) {
    var uname = user.nickname || user.username
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + uname)

    // 按需求渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let first = uname[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}