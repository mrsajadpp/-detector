const whois = require('whois');
const url = require('url');

const getDomainAge = async (link) => {
    return new Promise(async (resolve, reject) => {
        try {
            const parsedUrl = await url.parse(link);
            const domain = await parsedUrl.hostname;
            whois.lookup(domain, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                // Parse the WHOIS data to extract creation date
                const creationDateMatch = data.match(/Creation Date: (.+)/);

                if (creationDateMatch) {
                    const creationDate = new Date(creationDateMatch[1]);
                    const currentDate = new Date();

                    // Calculate the age of the domain in milliseconds
                    const domainAge = currentDate - creationDate;

                    // Convert to years for simplicity
                    const domainAgeInYears = domainAge / (1000 * 60 * 60 * 24 * 365.25);

                    // Round to two decimal places for readability
                    const roundedDomainAge = domainAgeInYears.toFixed(2);

                    resolve(parseFloat(roundedDomainAge));
                } else {
                    reject("Unable to extract creation date.");
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = getDomainAge;
