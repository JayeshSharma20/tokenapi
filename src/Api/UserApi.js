import { axiosInstance, handleError, handleResponse } from './axiosInstance'

export const userList = async (token, data) =>
    await axiosInstance(token)
        .get(`Users/${data}`)
        .then(handleResponse)
        .catch(handleError);

export const addUser = async (token, data) =>
    await axiosInstance(token)
        .post(`Users`, data)
        .then(handleResponse)
        .catch(handleError);

export const editUser = async (token, uId, data) =>
    await axiosInstance(token)
        .patch(`Users(${uId})`, data)
        .then(handleResponse)
        .catch(handleError);

export const userRolesList = async (token) =>
    await axiosInstance(token)
        .get(`UserRoles`)
        .then(handleResponse)
        .catch(handleError);


export const getTestingOffice = async (token, params) =>
    await axiosInstance(token)
        .get(`TestingOffice${params}`)
        .then(handleResponse)
        .catch(handleError);


export const userGroupList = async (token) =>
    await axiosInstance(token)
        .get(`UserGroup`)
        .then(handleResponse)
        .catch(handleError);

export const getUserById = async (token, uId) =>
    await axiosInstance(token)
        .get(`Users(${uId})`)
        .then(handleResponse)
        .catch(handleError);

export const countryList = async (token, params) =>
    await axiosInstance(token)
        .get(`Country${params}`)
        .then(handleResponse)
        .catch(handleError);