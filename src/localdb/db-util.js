
export const onerror = (e) => {
  // handle error
  let errMsg = 'Database error: ' + e.target.error.message
  console.error(errMsg)
  Notification.error({
    title: 'error',
    message: errMsg
  })
}

export const process = (resolve, reject, err, result) => {
  if (err) {
    onerror(err)
    reject(err)
  } else {
    resolve(result)
  }
}
