const request = require('request');

const hasHTTPSToken = (url) => {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: "HEAD",
            followAllRedirects: true,
            timeout: 5000, // Set a timeout to avoid waiting too long for a response
        }, (err, response, body) => {
            if (err) {
                console.error('Error checking HTTPS token:', err.message);
                reject('Error checking HTTPS token');
            } else {
                // Check if the final URL uses HTTPS
                const finalUrlProtocol = new URL(response.request.href).protocol;
                const isHttps = finalUrlProtocol === 'https:';
                resolve(isHttps);
            }
        });
    });
}

module.exports = hasHTTPSToken;
