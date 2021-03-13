import { all, put, takeEvery } from 'redux-saga/effects'

const blah = function* () {
  console.log("TOOK BLAH")
}

const watchBlah = function* () {
  yield takeEvery('BLAH', blah)
}

export default function* rootSaga() {
  yield all([
    watchBlah()
  ])
}
