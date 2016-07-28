window.WebFontConfig = {
  google: { families: [ 'Open+Sans:400:latin', 'Khula:400,300,600,700:latin', 'Roboto+Mono:400,500:latin' ] }
}
var wf = document.createElement('script')
wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js'
wf.type = 'text/javascript'
wf.async = 'true'
var s = document.getElementsByTagName('script')[0]
s.parentNode.insertBefore(wf, s)
