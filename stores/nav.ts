// import {
//     createStore
// } from 'harlem';
const STATE = {
    header: {},
    footer: {},
    product: {},
  }
  
  export const { state, getter, mutation, computeState, ...store } = createStore('nav', STATE)

//   export const fullName = getter('fullName', state => {
//     return `${state.firstName} ${state.lastName}`
//   })
  
  export const setHeader = mutation<string>('setHeader', (state, payload) => {
    state.header = payload
  })
  
  export const setFooter = mutation<string>('setFooter', (state, payload) => {
    state.footer = payload
  })
  
  export const setProduct = mutation<string>('setProduct', (state, payload) => {
    state.product = payload
  })