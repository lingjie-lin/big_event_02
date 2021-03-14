// 入口函数
$(function () {
    // 1.点击去注册账号,隐藏登录区域,显示注册区域
    $('#link-reg').on('click', function () {
        console.log(111);
        $('.login-box').hide();
        $('.reg-box').show();
    });

    // 2.点击去登录,隐藏注册区域,显示登录区域
    $('#link-login').on('click', function () {
        console.log(222);
        $('.reg-box').hide();
        $('.login-box').show();
    });

    // 3.定义密码登录规则
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码规则
        repwd: function (value) {
            // 选择器必须带空格,选择的是后代的input,name属性值为password的哪一个标签
            let pwd = $('.reg-box input[name=password]').val();
            if (value !== pwd) {
                return "两次输入的密码不一致!";
            }
        }
    });

    // 调用内置函数
    let layer = layui.layer;
    // 4.注册功能
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            type: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val(),
            },
            success: (res) => {
                console.log(res);
                // 判断
                // 不成功
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 成功
                layer.msg("注册成功!")
                // 手动切换到登录表单
                $('#link-login').click();
                // 重置form表单
                $('#form-reg')[0].reset();
            }
        });
    });

    // 5.登录功能
    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                // 判断
                // 不成功
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 成功,提示,保存token,跳转页面
                layer.msg("恭喜您,登录成功!")
                // 保存token,未来接口要使用
                localStorage.getItem('token', res.token);
                // 跳转页面
                location.href = '/index.html';
            }
        });
    })

})