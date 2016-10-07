import React from 'react'

export const Store = (props) => (
  <div style={{ margin: '0 auto' }} >
    <h2>store: {props.storeList.length}</h2>
    <button className='btn btn-default' onClick={props.save}>
      SAVE
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.back}>
      BACK
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.cancel}>
      CANCEL
    </button>
  </div>
)

Store.propTypes = {
  // counter     : React.PropTypes.number.isRequired,
  // doubleAsync : React.PropTypes.func.isRequired,
  // increment   : React.PropTypes.func.isRequired
}

export default Store