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
  const { form, layer } = layui;
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
      url: '/api/reguser',
      data: {
        username: $('.reg-box [name=username]').val(),
        password: $('.reg-box [name=password]').val(),
      },

      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg('注册成功');
        $('#link_login').click();
      },
    });
  });

  // 监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    // debugger;
    // 阻止默认提交行为
    e.preventDefault();
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！');
        }
        layer.msg('登录成功！');
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token);
        // 跳转到后台主页
        location.href = '/index.html';
      },
    });
  });
});

// github
// login 提交本地仓库
// login 提交远程仓库 ？
// login合并到main(主分支)
// master提交到远程仓库
// index
