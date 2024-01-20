const dns = require('dns');
const url = require('url'); 

const getIpAddress = (link) => {
    return new Promise((resolve, reject) => {
        const parsedUrl = url.parse(link);
        const hostname = parsedUrl.hostname;
        console.log(hostname);
        dns.resolve4(hostname, (err, addresses) => {
            if (err) {
                console.error(err);
                reject(err);
            }

            resolve({
                hostname,
                addresses
            });
        });
    })
};

module.exports = getIpAddress;