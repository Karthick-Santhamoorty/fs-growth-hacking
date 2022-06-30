export const addUser = async postObj => {
    const response =  await fetch(`${process.env.REACT_APP_BE_ENDPOINT}/add_user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
    });
    return await response.json();
}

export const login = async postObj => {
    const response =  await fetch(`${process.env.REACT_APP_BE_ENDPOINT}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
    });
    return await response.json();
}

export const logout = () => window.localStorage.removeItem("growthHackUser");