import * as actionType from './actionType';

export function userlogin(payload) {
    return { type: actionType.FILL_USERNAME, payload}
}
  
export function passwordlogin(payload) {
    return { type: actionType.FILL_PASSWORD, payload}
}

export function loginsubmit(payload) {
    return { type: actionType.LOG_SUBMIT, payload }
}

export function loginsubmitsuccess(payload) { 
    return { type: actionType.LOG_SUBMIT_SUCCESS, payload }
}

export function loginsubmitfailed(payload) {
    return {type: actionType.LOG_SUBMIT_FAILED, payload }
}

