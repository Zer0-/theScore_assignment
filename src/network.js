function resolveResponse(resolve, reject) {
    return e => {
        if (e.target.status >= 200 && e.target.status < 300) {
            return resolve(JSON.parse(e.target.responseText));
        } else {
            reject(new Error('API responded with ' + e.target.status));
        }
    }
}

export function get(url) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.onload = resolveResponse(resolve, reject);
        req.onerror = reject;
        req.open('GET', url);
        req.setRequestHeader("Accept", "application/json");
        req.send();
    });
}
