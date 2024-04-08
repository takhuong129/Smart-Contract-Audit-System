import axios from 'axios';

const sendDataToBackend = (apiEndpoint, data, onSuccess, onError) => {
  axios.post(apiEndpoint, data)
    .then(response => {
      if (onSuccess) {
        onSuccess(response.data);
      }
    })
    .catch(error => {
      if (onError) {
        onError(error);
      }
    });
};
export {sendDataToBackend}