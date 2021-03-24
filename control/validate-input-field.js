var inputReading = function (data) {
  if (!data.deviceId || typeof data.deviceId == undefined || data.deviceId == null  || data.deviceId <= 0 ) {
    return false;
  }

  if (!data.messageId || typeof data.messageId === undefined || data.messageId === null || data.messageId <= 0 ) {
    return false;
  }

  if (!data.timestamp || typeof data.timestamp === undefined || data.timestamp === null || data.timestamp <= 0) {
    return false;
  }

  return true;
}

module.exports = { "Reading": inputReading };
