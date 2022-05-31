import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export const { setNotification } = notificationSlice.actions

let tempout = null

export const createNotification = (notification, time) => {
  return dispatch => {
    dispatch(setNotification(notification))

    if (tempout) {
      clearTimeout(tempout)
    }
    
    tempout = setTimeout(() => {
      dispatch(setNotification(null))
    }, time * 1000)
  }
}

export default notificationSlice.reducer