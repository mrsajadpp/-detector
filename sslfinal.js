const https = require('https');

const checkSSLFinalState = async (url) => {
    return new Promise((resolve, reject) => {
        try {
            const options = {
                method: 'HEAD',
                hostname: new URL(url).hostname,
                port: 443,
                rejectUnauthorized: false, // Ignore SSL certificate validation for simplicity (remove in production)
            };

            const req = https.request(options, (res) => {
                const sslDetails = res.connection.getPeerCertificate();

                // Check the SSL certificate details, you can customize this based on your specific criteria
                const isSSLValid = sslDetails && sslDetails.subject && sslDetails.valid_to && sslDetails.valid_from;

                resolve(isSSLValid);
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.end();
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = checkSSLFinalState;
