$(function () {
  gerUserInfo();
  // renderAvatar

  // 绑定点击事件
  $('#btn_logOut').on('click', function () {
    // 弹出框
    layer.confirm('确定退出?', { icon: 3, title: '提示' }, function (index) {
      // 退出功能
      localStorage.removeItem('token');
      location.href = '/login.html';

      // 关闭弹出框
      layer.close(index);
    });
  });
});
// 请求数据
function gerUserInfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    // data
    // headers: {
    //   Authorization: localStorage.token,
    // },
    success(res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message);
      }
      renderAvatar(res.data);
    },
    // complete:
  });
}

function renderAvatar(user) {
  // 获取用户名
  const name = user.nickname || user.username;

  $('#welcome').html(`欢迎` + name);

  // 处理文字头像和图片头像
  if (user.user_pic) {
    // 图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    // 文字头像
    $('.layui-nav-img').hide();

    // 渲染文字头像
    const first = name[0].toUpperCase();

    $('.text-avatar').html(first).show;
  }
}
