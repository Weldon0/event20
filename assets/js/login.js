$(function () {
  // 登录注册按需切换
  $('#link_reg').on('click', function () {
    // 去注册按钮的点击事件
    $('.login-box').hide();
    $('.reg-box').show();
  });

  $('#link_login').on('click', function () {
    // 去登陆盒子的点击效果
    $('.login-box').show();
    $('.reg-box').hide();
  });

  // 定义校验规则
  const { form } = layui;
  // const form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码不符合规则'],
    repwd: function (value) {
      // value ||= 234;
      const pwd = $('.reg-box [name=password]').val();

      if (value !== pwd) {
        return '两次密码不一致';
      }
    },
  });
  // 监听注册表单提交事件
  $('#reg-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: 'http://api-breakingnews-web.itheima.net/api/reguser',
      data: {
        username: $('.reg-box [name=username]').val(),
        password: $('.reg-box [name=password]').val(),
      },

      success(res) {
        if (res.status !== 0) {
          return console.log(res.message);
        }
        console.log('注册成功');
      },
    });
  });
});
