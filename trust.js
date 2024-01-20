const calculateTrustScore = async (websiteData) => {
    // Define weights for each data point
    const weights = {
        ipAddress: 5,
        isValidURLLength: 2,
        isShortened: 1,
        hasAtSymbol: 3,
        hasDoubleSlash: 2,
        hasSubDomain: 3,
        isSSLValid: 5,
        domainRegistrationLength: 4,
        hasHTTPSToken: 10,
        domainAge: 10,
        pageRank: 4,
        isIndexed: 6
    };

    // Function to resolve promises
    const resolvePromise = async (promise) => {
        try {
            return await promise;
        } catch (error) {
            console.error("Error resolving promise:", error.message);
            return false; // Assuming false for failed promises, adjust as needed
        }
    };

    // Helper function to convert SSL validation date to timestamp
    const getSSLValidTimestamp = (sslValidDate) => {
        const dateObject = new Date(sslValidDate);
        return dateObject.getTime();
    };

    // Calculate the weighted sum
    let weightedSum = 0;
    for (const key in weights) {
        const value = websiteData[key];
        const weight = weights[key];

        if (value !== undefined && value !== null) {
            if (key === 'isSSLValid') {
                const sslValidTimestamp = getSSLValidTimestamp(value);
                const currentDateTimestamp = Date.now();
                const isValidSSL = sslValidTimestamp > currentDateTimestamp;
                weightedSum += isValidSSL ? weight : 0;
            } else if (key === 'hasHTTPSToken') {
                const resolvedValue = await resolvePromise(value);
                weightedSum += resolvedValue ? weight : 0;
            } else {
                weightedSum += value ? weight : 0;
            }
        }
    }

    // Normalize the weighted sum to a percentage
    const maxScore = Object.values(weights).reduce((acc, val) => acc + val, 0);
    const trustScorePercentage = (weightedSum / maxScore) * 100;

    return trustScorePercentage;
};

// Example usage:
// const websiteData = {
//     ipAddress: {
//         hostname: 'thintry.com',
//         addresses: [
//             '185.199.108.153',
//             '185.199.109.153',
//             '185.199.110.153',
//             '185.199.111.153'
//         ],
//     },
//     isValidURLLength: true,
//     isShortened: false,
//     hasAtSymbol: Promise.resolve(false),
//     hasDoubleSlash: false,
//     hasSubDomain: false,
//     isSSLValid: 'Jan 6 07:12:05 2024 GMT',
//     domainRegistrationLength: 366,
//     hasHTTPSToken: Promise.resolve(true),
//     domainAge: 0.78,
//     pageRank: 0.99,
//     isIndexed: true,
// };

module.exports = calculateTrustScore;
