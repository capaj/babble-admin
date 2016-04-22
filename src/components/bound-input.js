import React, {PropTypes} from 'react'
import {observer} from 'mobservable-react'
import _ from 'lodash'
const boundToProps = new WeakMap()

const BoundInput = (props) => {
  if (!props.source && !props.parent) {
    throw new Error('missing property source on the BoundInput')
  }
  let {source} = props
  const {name, validation, onChange} = props
  if (!source) {
    source = {}
    source[name] = props.parent.state[name]
  }
  let cln = ''
  if (validation) {
    const validRes = validation(source[name])
    if (validRes === false) {
      cln = 'has-error'
    }
    if (typeof validRes === 'object') {
      cln = 'has-error'
      // todo show hint
    }
  }
  const prefixPropName = boundToProps.get(props) || props.boundPrefix
  let stateObj = null
  if (props.parent) {
    stateObj = props.parent.state
  }
  let defVal
  if (prefixPropName) {
    defVal = stateObj[prefixPropName][name]
  } else {
    defVal = source[name]
  }
  var propsToPass = _.omit(props, 'onChange')

  return <input className={cln} autoComplete={props.autocomplete} value={defVal} defaultValue={defVal} onChange={(ev) => {
    const {value} = ev.target
    if (value || value === '') {  // onChange gets triggered even when invalid key is pressed(for example 'a' key on an input of type number)
      if (stateObj) {
        if (prefixPropName) {
          stateObj[prefixPropName][name] = value
        } else {
          stateObj[name] = value
        }
        props.parent.setState(stateObj)
      } else {
        source[name] = value
      }
    }
    if (onChange) {
      onChange(ev)
    }
  }} {...propsToPass}/>
}

BoundInput.propTypes = {
  name: PropTypes.string,
  validation: PropTypes.func,
  autocomplete: PropTypes.string,
  boundPrefix: PropTypes.string,
  onChange: PropTypes.func,
  source: PropTypes.object,
  parent: PropTypes.object
}

export const BoundTo = (props) => {
  const {children} = props
  if (Array.isArray(children)) {
    children.forEach((input) => {
      if (typeof input.props === 'object') {
        boundToProps.set(input.props, props.prop)
      }
    })
  } else {
    boundToProps.set(children.props, props.prop)
  }

  return <div>
    {props.children}
  </div>
}
BoundTo.propTypes = {
  prop: PropTypes.string,
  children: PropTypes.node
}

export default observer(BoundInput)
