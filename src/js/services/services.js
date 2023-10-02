async function postData(url, data) {
    const result = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
            'Content-type' : 'application/json'
        }
    });

    return await result.text();
};

export {postData};