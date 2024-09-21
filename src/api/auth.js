import { url } from "./configuration";


export const register = async (body) => {
    const response = await fetch(`${url}/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // this convert the object to json string 
        body: JSON.stringify(body)
    })
    // This will get the response from api
    return await response.json()
}

export const checkToken = async (token) => {
    const response = await fetch(`${url}/checkToken`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    // This will get the response from api
    return await response.json()
}
export const login = async (token) => {
    const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        // this convert the object to json string 
        body: JSON.stringify(token)
    })
    // This will get the response from api
    return await response.json()
}

export const customer_login = async (token) => {
    const response = await fetch(`${url}/customers/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        // this convert the object to json string 
        body: JSON.stringify(token)
    })
    // This will get the response from api
    return await response.json()
}

export const customer_checkToken = async (token) => {
    const response = await fetch(`${url}/customers/checkToken`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    // This will get the response from api
    return await response.json()
}

export const customer_register = async (body) => {
    const response = await fetch(`${url}/customers/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // this convert the object to json string 
        body: JSON.stringify(body)
    })
    // This will get the response from api
    return await response.json()
}