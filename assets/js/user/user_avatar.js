$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image');
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,

    // 指定预览区域
    preview: '.img-preview',
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  $('#chooseImg').on('click', function () {
    // 触发input的点击事件
    $('#file').click();
  });

  $('#file').on('change', function (e) {
    const [file] = e.target.files;
    // debugger;
    // const file = e.target.files[0]
    if (!file) return layer.msg('请请选择文件!');

    // 文件存在
    const imgUrl = URL.createObjectURL(file);

    // 插件里面的方法
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgUrl) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });
  // const
  $('#btnUpload').on('click', function () {
    // 获取图片
    const dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL('image/png');

    $.ajax({
      type: 'post',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL,
      },
      success(res) {
        if (res.status !== 0) {
          return layer.msg('上传失败');
        }
        layer.msg('上传成功');
        window.parent.gerUserInfo();
      },
    });
  });
});

// 函数式编程
// 函数柯里化
// 闭包

// base64 图片
// 用字符串表示的图片
// 优点：减少网络请求
// 缺点：文件的体积变大，
// 推荐：小图片使用base64
