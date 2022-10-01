import { TestComponent } from './Component.js'

customElements.define('test-component', TestComponent)


// const instances = Components.map(c => {
//   return new ComponentPrimitive(c)
//   // const {root, refs, setup } = c

//   // const rootEl = document.querySelector(root)
//   // if (!root) return console.log(`Could not fine element '${root}'`)



//   // const buildRefs = (rs) => {

//   //   const ret = {}

//   //   Object.keys(rs).forEach(key => {
//   //     const selector = rs[key]
//   //     const element = document.querySelector(selector)

//   //     ret[key] = element
//   //   })

//   //   return ret
//   // }


//   // const instance = buildRefs(refs)

//   // return { component: c, instance }
// })





// console.log(instances)