const whois = require('whois');
const url = require('url');

const getDomainRegistrationLength = async (link) => {
    return new Promise(async (resolve, reject) => {
        try {
            const parsedUrl = await url.parse(link);
            const domain = await parsedUrl.hostname;
            whois.lookup(domain, async(err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                // Parse the WHOIS data to extract registration and expiration dates
                const creationDateMatch = await data.match(/Creation Date: (.+)/);
                const expirationDateMatch = await data.match(/Registrar Registration Expiration Date: (.+)/);

                if (creationDateMatch && expirationDateMatch) {
                    const creationDate = new Date(creationDateMatch[1]);
                    const expirationDate = new Date(expirationDateMatch[1]);

                    // Calculate the registration length in milliseconds
                    const registrationLength = expirationDate - creationDate;

                    // Convert to days for simplicity
                    const registrationLengthInDays = registrationLength / (1000 * 60 * 60 * 24);

                    resolve(registrationLengthInDays);
                } else {
                    reject("Unable to extract registration information.");
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = getDomainRegistrationLength;
