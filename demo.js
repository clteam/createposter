function canvasImage () {
  const editer = new CvsEditer({
    width: 689,
    height: 1240,
    background: '#fff'
  })

  editer.image(data.bg, {
    left: 0,
    top: 0,
    width: 689,
    height: 1240,
    origin: 'normal',
    angle: 0,
    opacity: 1,
    circle: false
  }, function () {
    editer.image(data.wxImg, {
      left: 255,
      top: 560,
      width: 180,
      height: 180,
      origin: 'normal',
      angle: 0,
      opacity: 1,
      circle: false
    })
    editer.image(data.vImg, {
      left: 66,
      top: 900,
      width: 44,
      height: 44,
      origin: 'normal',
      angle: 0,
      opacity: 1,
      circle: false
    })
    editer.font(data.name || '', {
      left: 120,
      top: 890,
      color: '#ffffff',
      fontFamily: 'Microsoft YaHei,-apple-system-font,Arial',
      fontSize: 46,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textAlign: 'left',
      textBaseline: 'top'
    })
    editer.font(data.address, {
      left: 66,
      top: 958,
      color: '#ffffff',
      fontFamily: 'Microsoft YaHei,-apple-system-font,Arial',
      fontSize: 26,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textAlign: 'left',
      textBaseline: 'top'
    })
    editer.font(data.tel, {
      left: 66,
      top: 1000,
      color: '#ffffff',
      fontFamily: 'Microsoft YaHei,-apple-system-font,Arial',
      fontSize: 26,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textAlign: 'left',
      textBaseline: 'top'
    })
    editer.font(data.price, {
      left: 330,
      top: 400,
      color: '#ea592e',
      fontFamily: 'PingFang SC, Microsoft YaHei,-apple-system-font,Arial',
      fontSize: 100,
      fontWeight: 'bold',
      fontStyle: 'italic',
      textAlign: 'left',
      textBaseline: 'top'
    })
  })
  editer.watch(function () {
    cb && cb(this.toDataURL({type: 'image/jpeg', quality: 1}))
  })
}

let params = {}

canvasImage(params, (url) => {
  console.log(url)
})
