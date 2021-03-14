
// 入口函数 
$(function () {
    // 调用函数
    getUserInfo();
})


// 因为后面会用到调用数据
// 所以封装到入口函数外面
function getUserInfo() {
    console.log(localStorage.getItem('token'));
    // 发送ajax请求数据
    $.ajax({
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || '',
        },
        success: (res) => {
            console.log(res);
            console.log('dddd');
            // 判断是否成功
            // 不成功,提示
            if (res.status != 0) {
                return layui.layer.msg(res.message);
            }
            // 成功,调用函数渲染头像
            renderAvatar(res.data)
        }
    });
}

function renderAvatar(user) {
    console.log(user);
    // 1.渲染名称(nickname优先,如果没有.就用username)
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp&nbsp' + name);
    // 2.渲染头像
    if (user.user_pic !== null) {
        // 有头像,修改路径
        console.log(1111);
        $('.layui-nav-img').show().attr('src', user.user_pic)
        // 隐藏文字头像
        $('.text-avatar').hide();
    }
    // 无头像
    else {
        console.log(222);
        // 隐藏相片头像
        $('.layui-nav-img').hide();
        // 显示文字头像,取文字的第一个字母并改成大写,隐藏图片头像
        let text = name[0].toUpperCase();
        $('.text-avatar').show().html(text)




    }
}