import { url } from "./configuration";


export const storeMessages = async (message) => {
    const response = await fetch(`${url}/conversations/messages`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // this convert the object to json string 
        body: JSON.stringify({ messages: message })
    })
    // This will get the response from api
    return await response.json()
}

export const create_conversation = async (id) => {
    const response = await fetch(`${url}/conversations/new`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // this convert the object to json string 
        body: JSON.stringify({ customer_id: id })
    })
    // This will get the response from api
    return await response.json()
}