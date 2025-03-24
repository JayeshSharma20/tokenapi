import axios from "axios";

function axiosInstance(token) {
    if (token) 
      {
        return axios.create({
          baseURL: "http://18.158.81.67:8080/api",
          headers: { Authorization: "Bearer " + token },
        });
      } else {
        return axios.create({
          baseURL: "http://18.158.81.67:8080/api",
        });
      }
}

function handleResponse(response) {
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 204
    ) {
      if (response.status === 204) {
        return { success: true };
      } else {
        return response.data;
      }
    } else if (response.status === 401) {
      return {error: true}
    }
  }
  
  function handleError(error) {
    if (error?.response?.status === 401) {
      return {error: true}
    } else if (error?.response?.status === 409) {
      let string = error.response.data.error.message.split("(");
      let string2 = string[1].split(")");
      return {
        success: false,
        conflict: true,
        message: string2[0],
      };
    }
    return error?.response?.data;
   
  }

export {axiosInstance, handleError, handleResponse}