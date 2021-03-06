import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";
import {
  loginsubmitfailed,
  loginsubmitsuccess,
  signUpPasswordSuccess,
  receiveApiData,
  pollSubmitSuccess,
  pollsReceiveApiData,
  pollidrecievedata,
  uservotesuccess,
  addtitlesuccess,
  deleteoptionsuccess,
  submitNewOptionValueSuccess,
  deletePollSuccess
} from "./action/LoginAction";

function* loginuser(action) {
  try {
    const response = yield axios
      .get(
        `https://secure-refuge-14993.herokuapp.com/login?username=${
          action.payload.username
        }&password=${action.payload.password}`
      )
      .then(response => {
        localStorage.setItem("token", response.data.token);
        return response;
      });
    if (response) {
      yield put(loginsubmitsuccess(response.data));
    }
  } catch (e) {
    yield put(loginsubmitfailed(e.response));
  }
}

function* signUpUser(action) {
  try {
    const response = yield axios
      .get(
        `https://secure-refuge-14993.herokuapp.com/add_user?username=${
          action.payload.userName
        }&password=${action.payload.passWord}&role=${action.payload.role}`
      )
      .then(response => {
        return response;
      });
    if (response) {
      yield put(signUpPasswordSuccess(response.data));
    }
  } catch (e) {
    yield;
  }
}

function* requestApiData(action) {
  try {
    const response = yield axios
      .get(`https://secure-refuge-14993.herokuapp.com/list_users`)
      .then(response => {
        return response;
      });
    if (response) {
      yield put(receiveApiData(response.data));
    }
  } catch (e) {
    yield;
  }
}

function* pollSubmit(action) {
  try {
    const response = yield axios
      .get(
        `https://secure-refuge-14993.herokuapp.com/add_poll?title=${
          action.payload.pollTitle
        }&options=${action.payload.option1}____${action.payload.option2}____${
          action.payload.option3
        }____${action.payload.option4}`
      )
      .then(response => {
        return response;
      });
    if (response) {
      yield put(pollSubmitSuccess(response.data));
    }
  } catch (e) {
    yield;
  }
}

function* pollsRequestApiData(action) {
  try {
    const response = yield axios
      .get(`https://secure-refuge-14993.herokuapp.com/list_polls`)
      .then(response => {
        return response;
      });
    if (response) {
      yield put(pollsReceiveApiData(response.data));
    }
  } catch (e) {
    yield;
  }
}

function* pollSetId(action) {
  try {
    const response = yield axios
      .get(
        `https://secure-refuge-14993.herokuapp.com/list_poll?id=${
          action.payload
        }`
      )
      .then(response => {
        return response;
      });
    if (response) {
      yield put(pollidrecievedata(response.data));
    }
  } catch (e) {
    yield;
  }
}

function* userdovote(action) {
  const headers = {
    access_token: localStorage.getItem("token")
  };

  try {
    const response = yield axios
      .post(
        `https://secure-refuge-14993.herokuapp.com/do_vote?id=${
          action.payload.id
        }&option_text=${action.payload.name}`,
        null,
        { headers }
      )
      .then(response => {
        return response;
      });
    if (response) {
      yield put(uservotesuccess(response.data));
    }
  } catch (e) {
    yield;
  }
}

function* addtitle(action) {
  try {
    const response = yield axios
      .get(
        `https://secure-refuge-14993.herokuapp.com/update_poll_title?id=${
          action.payload.pollId
        }&title=${action.payload.pollTitle}`
      )
      .then(response => {
        return response;
      });
    if (response) {
      yield put(addtitlesuccess(response.data));
    }
  } catch (e) {
    yield;
  }
}

function* deleteoption(action) {
  try {
    const response = yield axios
      .get(
        `https://secure-refuge-14993.herokuapp.com/delete_poll_option?id=${
          action.payload.pollId
        }&option_text=${action.payload.polloption}`
      )
      .then(response => {
        return response;
      });
    if (response) {
      yield put(deleteoptionsuccess(response.data));
    }
  } catch (e) {
    yield;
  }
}

function* submitNewOptionValue(action) {
  try {
    const response = yield axios
      .get(
        `https://secure-refuge-14993.herokuapp.com/add_new_option?id=${
          action.payload.id
        }&option_text=${action.payload.value}`
      )
      .then(response => {
        return response;
      });
    if (response) {
      yield put(submitNewOptionValueSuccess(response.data));
    }
  } catch (e) {
    yield;
  }
}

function* deletePoll(action) {
  console.log('--------------------',action.payload)
  try {
    const response = yield axios.get(`https://secure-refuge-14993.herokuapp.com/delete_poll?id=${action.payload}`)
    .then(response => {
      return response;
    });
    if(response) {
      yield put(deletePollSuccess(response.data));
    } 
  }catch (e) {
      yield
    }
  }


function* watchAction() {
  yield takeLatest("LOG_SUBMIT", loginuser);
  yield takeLatest("SIGN_SUBMIT", signUpUser);
  yield takeLatest("REQUEST_API_DATA", requestApiData);
  yield takeLatest("SUBMIT_POLL", pollSubmit);
  yield takeLatest("POLLS_REQUEST_API_DATA", pollsRequestApiData);
  yield takeLatest("POLL_SET_ID", pollSetId);
  yield takeLatest("SUBMIT_VOTE", userdovote);
  yield takeLatest("ADD_UPDATE_TITLE", addtitle);
  yield takeLatest("DELETE_POLL_OPTION", deleteoption);
  yield takeLatest("SUBMIT_NEW_OPTION", submitNewOptionValue);
  yield takeLatest('DELETE_POLL', deletePoll);
}

export default function* mySaga() {
  yield watchAction();
}
