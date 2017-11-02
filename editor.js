function cvsEditer (options) {
  this.cvs = document.createElement('canvas')
  this.ctx = this.cvs.getContext('2d')
  this.cvs.width = options.width
  this.cvs.height = options.height
  this.ctx.save()
  this.ctx.fillStyle = options.background
  this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height)
  this.ctx.restore()
  this.task = []
  this.asyncCount = 0
  this.font = function (data, param) {
    var self = this
    self.ctx.save()
    self.ctx.fillStyle = param.color
    self.ctx.font = [
      param.fontStyle,
      param.fontWeight,
      param.fontSize + 'px',
      param.fontFamily
    ].join(' ')
    self.ctx.textAlign = param.textAlign
    self.ctx.textBaseline = param.textBaseline
    self.ctx.fillText(data, param.left, param.top)
    self.ctx.restore()
    self.trigger()
    return self
  }
  this.path = function (data, param) {
    var self = this
    self.ctx.save()
    self.ctx.beginPath()
    self.ctx.strokeStyle = param.color
    self.ctx.lineWidth = param.width
    self.ctx.moveTo(data.sx, data.sy)
    self.ctx.lineTo(data.ex, data.ey)
    self.ctx.closePath()
    self.ctx.stroke()
    self.ctx.restore()
    self.trigger()
    return self
  }
  this.image = function (data, param, cb) {
    var self = this
    var img = new Image()
    img.async = false
    img.src = data
    if (img.complete) {
      handle()
      self.trigger()
      cb && cb()
    } else {
      self.asyncCount++
      img.onload = function () {
        handle()
        self.asyncCount--
        self.trigger()
        cb && cb()
      }
    }
    function handle () {
      self.ctx.save()
      self.ctx.globalAlpha = param.opacity
      if (param.circle) {
        self.ctx.translate(param.left, param.top)
        self.ctx.beginPath()
        self.ctx.arc(param.width / 2, param.width / 2, param.width / 2, 0, 2 * Math.PI)
        self.ctx.clip()
        self.ctx.closePath()
        self.ctx.drawImage(img, 0, 0, param.width, param.height)
      } else {
        if (param.origin === 'normal') {
          self.ctx.translate(param.left, param.top)
          self.ctx.rotate(param.angle * Math.PI / 180)
          self.ctx.drawImage(img, 0, 0, param.width, param.height)
        } else if (param.origin === 'centre') {
          // just device width
          if (window.screen.width >= 370) {
            param.height = param.height - 60
          }
          var center = {
            x: param.left + param.width / 2,
            y: param.top + param.height / 2
          }
          self.ctx.translate(center.x, center.y)
          self.ctx.rotate(param.angle * Math.PI / 180)
          self.ctx.translate(-param.width / 2, -param.height / 2)
          self.ctx.drawImage(img, 0, 0, param.width, param.height)
        }
      }
      self.ctx.restore()
    }
    return this
  }

  this.toDataURL = function (param) {
    return this.cvs.toDataURL(param.type, param.quality)
  }

  this.clear = function () {
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height)
    return this
  }

  this.trigger = function () {
    var isEnd = this.asyncCount === 0
    for (var i in this.task) {
      this.task[i].call(this, isEnd)
    }
    return this
  }

  this.watch = function (cb) {
    this.task.push(cb)
    this.trigger()
    return this
  }
}

cvsEditer.loadImages = function (sources, callback) {
  var imgNum = sources.length
  for (var src in sources) {
    var img = new Image()
    img.onload = function () {
      if (--imgNum === 0) {
        callback()
      }
    }
    img.src = sources[src]
  }
}


function data2Blob (data, mime) {
  let dataStr
  dataStr = data.split(',')[1]
  dataStr = window.atob(dataStr)
  let ia = new Uint8Array(dataStr.length)
  for (let i; i < dataStr.length; i++) {
    ia[i] = dataStr.charCodeAt(i)
  }
  return new Blob([ia], {
    type: mime
  })
}

function downloadFile (fileName, content) {
  let aLink = document.createElement('a')
  document.body.appendChild(aLink)
  aLink.style = 'display: none'
  let blob = data2Blob(content, 'image/jpeg')
  let evt = document.createEvent('HTMLEvents')
  evt.initEvent('click', false, false)
  aLink.download = fileName
  aLink.href = URL.createObjectURL(blob)
  aLink.click()
  aLink.dispatchEvent(evt)
}

export {
  cvsEditer as CvsEditer,
  data2Blob as Data2Blob,
  downloadFile as DownloadFile
}
