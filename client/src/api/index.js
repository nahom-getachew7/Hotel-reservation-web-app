import React from "react";

exports.singup = (user) => {
    return fetch("http://localhost/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then((response) => { return response.json() })
        .catch((error) => console.log(error))
}