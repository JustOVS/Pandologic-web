import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects'
import wretch from 'wretch'
import { appActions } from './dataReducer'
import { all, call } from 'typed-redux-saga'
import { IJob, IRequestModel } from '../types';

export function* rootSaga() {
  yield all([appSaga()])
}

function* appSaga() {
  yield takeEvery(appActions.getData.type, getData)
}

function* getData(action: PayloadAction<IRequestModel>) {
  try {
    const response = yield* call(apiGetData, action.payload);
    yield put(appActions.setJobs(response));
  } catch (e) {
    console.error(e)
  }
}

async function apiGetData(sdata: IRequestModel): Promise<IJob[]> {
  return wretch(`http://localhost:9250/job-statistics?from=${sdata.from}&to=${sdata.to}`)
    .get()
    .json()
}