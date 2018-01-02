const REG = /(Android)|(iPhone)|(iPad)|(iPod)|(Windows Phone)|(Symbian)|(BlackBerry)/i

const ANIMATE_NAME = {
  FADE_IN: ['fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInUp', 'fadeInUpBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig']
}

function isPhone () {
  return REG.test(window.navigator.userAgent)
}

function getRandomAnimate () {
  return `${ANIMATE_NAME.FADE_IN[parseInt(Math.random() * (ANIMATE_NAME.FADE_IN.length - 1))]} animated`
}
export {
  isPhone,
  getRandomAnimate
}
