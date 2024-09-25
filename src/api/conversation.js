import { url } from "./configuration";


export const storeMessages = async (body) => {
    const response = await fetch(`http://localhost:8000/conversations/messages`, {
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