export async function getUsers() {
    const response = await fetch(`${process.env.BACKEND_URL}/users`, {cache: 'force-cache'})
    const data = await response.json()
    return data;
}

