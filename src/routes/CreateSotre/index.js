import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'store',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const StoreContainer = require('./containers/StoreContainer').default
      const reducer = require('./modules/Store').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'store', reducer })

      /*  Return getComponent   */
      cb(null, StoreContainer)

    /* Webpack named bundle   */
    }, 'store')
  }
})
