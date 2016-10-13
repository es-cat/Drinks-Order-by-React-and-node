import React from 'react'

export const Store = (props) => (
  <div style={{ margin: '0 auto' }} >
    <h2>store: {props.storeList.join(',')}</h2>
    <h2>prossing: {props.processing + ''}</h2>
    <button className='btn btn-default' onClick={props.save}>
      SAVE
    </button>
    {' '}
    <button className='btn btn-default'>
      BACK
    </button>
    {' '}
    <button className='btn btn-default'>
      CANCEL
    </button>
  </div>
)

Store.propTypes = {
  storeList     : React.PropTypes.array.isRequired,
  save          : React.PropTypes.func.isRequired,
  processing    : React.PropTypes.bool.isRequired
}

export default Store
