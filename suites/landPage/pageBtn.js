export default {
  name: 'landPage__btn',
  props: {
    renderPageBtn: {
      type: Function
    }
  },
  render (h) {
    return <div>
      {this.renderPageBtn(h)}
    </div>
  }
}
