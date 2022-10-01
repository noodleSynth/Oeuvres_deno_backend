class ComponentPrimitive extends HTMLElement {
  constructor(root, refs) {
    super()


    this.$root = document.querySelector(root)
    if (!this.$root) return console.log(`Could not fine element '${root}'`)
    console.log(this.$root)
    const content = this.$root.innerHTML
    console.log(content)
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = content

    const buildRefs = (rs) => {

      const ret = {}

      Object.keys(rs).forEach(key => {
        const selector = rs[key]
        console.log(typeof (selector))
        if (typeof (selector) === 'string') {
          const element = shadowRoot.querySelector(selector)
          ret[key] = element
        } else {
          ret[key] = buildRefs(selector)
        }
      })

      return ret
    }

    this.$refs = buildRefs(refs)
  }
}



export class TestComponent extends ComponentPrimitive {
  constructor() {
    super('test-component', { 'p': 'p' })

    console.log(this.$refs)
    this.$refs.p.innerHTML = "Hello I am a component"
  }
}