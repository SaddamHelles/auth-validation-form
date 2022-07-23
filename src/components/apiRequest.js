const apiRequest = async (url = "", optionsObj, errMsg = null) => {
  try {
    const response = await fetch(url, optionsObj);
    if (!response.ok) throw Error("Please reload the app");
  } catch (err) {
    errMsg = err.message;
  } finally {
    return errMsg;
  }
};
export const API_URL = "http://localhost:3500/users";
export default apiRequest;
