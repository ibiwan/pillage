import { all, put, takeEvery } from 'redux-saga/effects'
import { ACTION_BLAH } from './actions'

const blah = function* () {
  console.log("TOOK BLAH")
}

const watchBlah = function* () {
  yield takeEvery(ACTION_BLAH, blah)
}

export default function* rootSaga() {
  yield all([
    watchBlah()
  ])
}
