export const RECORD_USER_DATA = 'RECORD_USER_DATA';

export const recordUserData = (payload) => ({
  type: RECORD_USER_DATA,
  userData: payload,
});
