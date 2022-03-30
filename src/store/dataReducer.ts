import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IJob, IRequestModel } from '../types'
import type { RootState } from './store'

interface DataState {
  jobs: IJob[]
}

const initialState: DataState = {
  jobs: []
}

export const dataSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<IJob[]>) => {
      state.jobs = action.payload
    },
  },
})

const GET_DATA = 'GET_DATA';

export const appActions = {
  ...dataSlice.actions,
  getData: createAction<IRequestModel>(GET_DATA)
}

const selectJobs = (state: RootState) => state.data.jobs;

export const appSelectors = { selectJobs }

export default dataSlice.reducer