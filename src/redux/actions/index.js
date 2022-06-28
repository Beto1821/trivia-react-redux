export const RECORD_USER_DATA = 'RECORD_USER_DATA';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const recordUserData = (payload) => ({
  type: RECORD_USER_DATA,
  userData: payload,
});

const saveToken = (payload) => ({
  type: SAVE_TOKEN,
  userToken: payload,
});

export const requestToken = () => (dispatch) => {
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((data) => {
      dispatch(saveToken(data));
      localStorage.setItem('token', data.token);
    });
};