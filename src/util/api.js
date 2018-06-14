import * as API from '@/store/contains/api'
import * as ACT from '@/store/contains/actions' 

import 'es6-promise'
import Axios from 'axios'

const METHODS = {
	PUT: 'put',
	DELETE: 'delete',
	POST: 'post',
	GET: 'get'
}

const request = (url, params = {}, headers = {}, method = METHODS.GET) => {
  let options = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      ...headers,
    },
    method: method
  }
  if (method === METHODS.POST || method === METHODS.PUT) {
    options.data = params
  } else if (method === METHODS.GET || method === METHODS.DELETE) {
    options.params = {...params, _t: Math.random()}
  }
  return Axios({url, ...options})
}

const post = (url, params, headers) => request(url, params, headers, METHODS.POST)

export const createAction = (type, payloadCreator, metaCreator) => {
  const identity = (...args) => args[0]
  const isFunc = (fn) => typeof(fn) === 'function'
  const isPromise = obj => typeof(obj) === 'object' && isFunc(obj.then)
  const finalPayloadCreator = isFunc(payloadCreator) ? payloadCreator : identity
  
  return ({commit, dispatch}, ...args) => {
    const payload = finalPayloadCreator(...args)
    const action = {type, payload}
  
    if (isFunc(metaCreator)) {
      action.meta = metaCreator(...args);
    }
  
    if (isPromise(payload)) {
      return payload.then(result => {
        commit(type, Object.assign(action, {payload: result}))
        return result
      }).catch(error => {
        return Promise.reject(error)
      })
    }
    return commit(type, Object.assign(action, {payload}))
  }
}

export default {
	[ACT.LOGIN.hump]: params => request(API.LOGIN, params),
	[ACT.LOGIN.hump]: params => post(API.LOGIN, params)
}


