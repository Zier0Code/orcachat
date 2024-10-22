import { url } from "./configuration";


export const create_feedback = async (body, token) => {
    const response = await fetch(`${url}/feedbacks`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        // this convert the object to json string 
        body: JSON.stringify(body)
    })
    // This will get the response from api
    return await response.json()
}

export const index_all = async () => {
    const response = await fetch(`${url}/conversations`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    // This will get the response from api
    return await response.json()
}
