$.ajaxPrefilter(function (options) {
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

  if (options.url.includes('/my/')) {
    options.headers = {
      Authorization: localStorage.token || '',
    };

    options.complete = function (response) {
      if (
        response.responseJSON.status === 1 &&
        response.responseJSON.message === '身份认证失败！'
      ) {
        // 说明没有权限
        location.href = '/login.html';
      }
    };
  }
});

// index
// 本地仓库
// 远程仓库
// 切换main
// 合并index
// push main
