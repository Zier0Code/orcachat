

export const sendUserMessage = async (message) => {
    const response = await fetch('https://ce92-103-36-19-168.ngrok-free.app/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    });
    return await response.json()
}
