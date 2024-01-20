let request = require('request');

// If the shortUrl doesn't start with http or https, add https:// in front of it
// So eg. example.com becomes https://example.com
const isShoted = async (shortUrl) => {
    return new Promise((resolve, reject) => {
        if (!shortUrl.startsWith('http')) {
            // Assuming that if the URL doesn't start with http or https, it should be https
            shortUrl = 'https://' + shortUrl;
        }

        request({
            url: shortUrl,
            method: "HEAD",
            followAllRedirects: true
        },
        (err, response, body) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                // Sending back the full url
                // Check if the final URL includes the original shortUrl
                if (response.request.href.includes(shortUrl)) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }
        });
    });
}

module.exports = isShoted;
