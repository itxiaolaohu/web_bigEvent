$(function () {

    const form = layui.form
    const layer = layui.layer
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // 自定义验证规则
    form.verify({
        username: function (value) {
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        },
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            const val = $('.reg-box [name=password]').val()
            if (value !== val) {
                return '两次密码不一致'
            }
        }
    })

    // 点击注册用户
    $('#reg-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: 'api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0)
                    return layer.msg('注册失败')

                layer.msg('注册成功')
                $('#link_login').click()
            }

        })
    })
    // 登录请求
    $('#login-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: 'api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0)
                    return layer.msg('登录失败')

                layer.msg('登录成功')

                localStorage.setItem('token', res.token)

                location.href = 'index.html'

            }
        })
    })
})