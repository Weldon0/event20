$(function () {
  // $
  // 校验规则
  // nickname
  const { form } = layui;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称不能超过6位';
      }
    },
  });
  initUserInfo();

  // 初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！');
        }
        console.log(res);

        form.val('formUserInfo', res.data);
      },
    });
  }

  $('#btnReset').on('click', function (e) {
    e.preventDefault();
    initUserInfo();
  });

  $('.layui-form').on('submit', function (e) {
    e.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }

        layer.msg('更新成功');
        console.log(window.parent.location.href);
        console.log(location.href);

        window.parent.gerUserInfo();

        // 成功
      },
    });
  });
});
