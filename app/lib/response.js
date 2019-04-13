/* generate response */
const generate = (err, message, status, data) => {
  const response = {
    error: err,
    message,
    status,
    data
  };
  return response;
};

module.exports = { generate };
