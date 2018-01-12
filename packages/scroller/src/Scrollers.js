import { proxy } from './Proxy'
const noop = () => {

}
const assign = (source, target) => {
  if (target == void (0)) {
    throw new TypeError('[scroller]:Target should be an object.')
  }
  const tempTarget = Object(target)
  for (const key in tempTarget) {
    if (key in source) {
      source[key] = tempTarget[key]
    }
  }
  return source
}
const addEvent = (el, type, fn, capture) => {
  el.addEventListener(type, fn, { passive: false, capture: !!capture })
}
const removeEvent = (el, type, fn, capture) => {
  el.removeEventListener(type, fn, { passive: false, capture: !!capture })
}
const defaultOptions = {
  threshold: 0.3,
  percentage: 0,
  container: null,
  enablePullDown: false,
  touchStartFn: noop,
  touchMoveFn: noop,
  touchEndFn: noop,
  scrollFn: noop
}
let scrollers = {
  list: []
}
scrollers = proxy(scrollers, 'scroll', ['list'], 'sessionStorage')

export default class Scroller {
  constructor (options) {
    this.options = assign(defaultOptions, options)
    this.container = this.options.container
    if (!(options.container instanceof HTMLElement)) {
      throw new Error('[scroller]:Container should be a html element!')
    }
    this.isGlobal = this.options.container === window
    this.screenHeight = window.screen.height
    this.isInTouchStatus = false

    this.refreshFlag = false

    this.isThresholded = false
    this.destroyed = false
    this.movingDirection = 'none'
    this.startPageY = 0
    this.prePageY = 0
    this.attachEvent()
    this.watchRefreshFlag()
  }
  /**
 * Add scroller to scrollers,
 * if the scroller value is extis, then remove old value, and add new.
 * @param {String} path      - $route path, or fullPath
 * @param {String} name      - Scroller name
 * @param {Number} [top=0]   - scrollTop
 * @param {Number} [left=0]  - scrollLeft
 */
  addScroller (path, name, top = 0, left = 0) {
    // this.removeScroller(path, name)
    let index = -1
    index = scrollers.list.findIndex(s => s.path === path && s.name === name)
    if (index < 0) {
      scrollers.list.push({ path, name, top, left })
    } else {
      scrollers.list[index] = { path, name, top, left }
    }

    // this.scrollers.push({ path, name, top, left })
  }
  /**
 * Find scroller storage by path and name
 * @param  {String} path      - $route path, or fullPath
 * @param  {String} name      - Scroller name
 * @return {Object|null}
 */
  findScroller (path, name) {
    // const findeds = this.scrollers.filter(item => {
    //   return item.path === path && item.name === name
    // })
    // return findeds.length > 0 ? findeds[0] : null
    let index = -1
    index = scrollers.list.findIndex(s => s.path === path && s.name === name)
    return index < 0 ? null : scrollers.list[index]
  }
  /**
 * Remove scroller by path and name
 * @param  {String} path      - $route path, or fullPath
 * @param  {String} name      - Scroller name
 */
  removeScroller (path, name) {
    let index = scrollers.list.findIndex(s => s.path === path && s.name === name)
    index >= 0 && scrollers.list.splice(index, 1)
    // const finded = this.findScroller(path, name)

    // // If finded, remove its old value
    // if (finded) {
    //   this.scrollers.splice(this.scrollers.indexOf(finded), 1)
    // }
  }
  /**
 * Get scroller top and left,
 * if can't find the scroller, then return default top and left.
 * @param  {String} path      - $route path, or fullPath
 * @param  {String} name      - Scroller name
 * @param  {Number} [top=0]   - Default top value
 * @param  {Number} [left=0]  - Default left value
 * @return {Object}           - { top, left }
 */
  getScroller (path, name, top = 0, left = 0) {
    let index = scrollers.list.findIndex(s => s.path === path && s.name === name)
    if (index >= 0) {
      let { top, left } = scrollers.list[index]
      return { top, left }
    } else {
      return {
        top, left
      }
    }
  }
  isTop () {
    return this.isGlobal ? this.container.pageYOffset <= 0 : this.container.scrollTop <= 1
  }
  watchRefreshFlag () {
    if (typeof Object.defineProperty !== 'function') {
      return
    }
    let refreshFlag = false
    Object.defineProperty(this, 'refreshFlag', {
      get () {
        return refreshFlag
      },
      set (newVal) {
        refreshFlag = newVal
        this.isInTouchStatus = false
      }
    })
  }
  attachEvent () {
    const target = this.options.container
    addEvent(target, 'touchstart', this)
    addEvent(target, 'touchmove', this)
    addEvent(target, 'touchend', this)
    addEvent(target, 'touchcancel', this)
    addEvent(target, 'scroll', this)
  }
  destroy () {
    this.destroyed = true
    this.destroyEvent()
  }
  destroyEvent () {
    const target = this.options.container
    removeEvent(target, 'touchstart', this)
    removeEvent(target, 'touchmove', this)
    removeEvent(target, 'touchend', this)
    removeEvent(target, 'touchcancel', this)
    removeEvent(target, 'scroll', this)
  }
  handleEvent (event) {
    if (!(event instanceof Event)) return
    switch (event.type) {
      case 'touchstart':
      case 'mousedown':
        return this.touchStart(event)
      case 'touchmove':
        return this.touchMove(event)
      case 'touchcancel':
      case 'touchend':
        return this.touchEnd(event)
      case 'scroll':
        return this.scroll(event)
      default:
        break
    }
  }
  scroll (event) {
    return this.options.scrollFn(event)
  }
  touchStart (event) {
    const { touches } = event
    this.handleMovingDirection(touches[0].pageY)
    this.startPageY = this.prePageY = touches[0].pageY
    this.isInTouchStatus = true
    this.options.touchStartFn(event)
  }
  touchMove (event) {
    if (!this.isInTouchStatus || this.refreshFlag) return
    const { touches } = event
    const pageY = touches[0].pageY
    this.percentage = (this.startPageY - pageY) / this.screenHeight
    this.handleMovingDirection(pageY)
    if (this.movingDirection === 'none') {
      event.preventDefault()
    }
    if (this.isTop() && this.movingDirection === 'down' && this.options.enablePullDown) {
      event.preventDefault()
      this.isThresholded = Math.abs(this.percentage) >= this.options.threshold
      if (this.isThresholded) {
        this.refreshFlag = true
      }

      this.options.touchMoveFn(event, this.handleThreshold())
    }
  }
  handleMovingDirection (pageY) {
    const distanceY = pageY - this.prePageY
    if (distanceY < 0) {
      this.movingDirection = 'up'
    } else if (distanceY > 0) {
      this.movingDirection = 'down'
    }
  }
  handleThreshold () {
    return Math.min(Math.abs(this.percentage) / this.options.threshold, 1)
  }
  touchEnd (event) {
    this.refreshFlag = false
    this.isThresholded = false
    this.isInTouchStatus = false
    this.movingDirection = 'none'
    this.options.touchEndFn(event, this.handleThreshold())
  }
  resetRefreshingStatusFn (status) {
    this.refreshFlag = status
  }
}
