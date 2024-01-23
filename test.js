const axios = require('axios');
const getIpAddress = require('./iptest');
const isURLLengthValid = require('./url-leng');
const isShoted = require('./shorter');
const containsAtSymbol = require('./is-at');
const hasDoubleSlashRedirection = require('./doubleslash');
const hasSubdomain = require('./issub');
const checkSSLFinalState = require('./sslfinal');
const getDomainRegistrationLength = require('./dnsLength');
const hasHTTPSToken = require('./httpsToken');
const getDomainAge = require('./checkAge');
const getPageRank = require('./pagerank');
const isPageIndexed = require('./pageindexed');
const calculateTrustScore = require('./trust');

// Function to get all data about the website URL and trust score
const getAllWebsiteData = async (url, retryCount = 3) => {
    try {
        const ipAddress = await getIpAddress(url);
        const isValidURLLength = await isURLLengthValid(url);
        const isShortened = await isShoted(url);
        const hasAtSymbol = await containsAtSymbol(url);
        const hasDoubleSlash = await hasDoubleSlashRedirection(url);
        const hasSubDomain = await hasSubdomain(url);
        const isSSLValid = await checkSSLFinalState(url);
        // const domainRegistrationLength = await getDomainRegistrationLength(url);
        const hasHTTPSTokenResult = await hasHTTPSToken(url);
        const domainAge = await getDomainAge(url);
        const pageRank = await getPageRank(url);
        const isIndexed = await isPageIndexed(url);

        let trustScore = await calculateTrustScore({
            ipAddress,
            isValidURLLength,
            isShortened,
            hasAtSymbol,
            hasDoubleSlash,
            hasSubDomain,
            isSSLValid,
            // domainRegistrationLength,
            hasHTTPSToken: hasHTTPSTokenResult,
            domainAge,
            pageRank,
            isIndexed
        });

        // Return an object containing all the collected data
        return {
            ipAddress,
            isValidURLLength,
            isShortened,
            hasAtSymbol,
            hasDoubleSlash,
            hasSubDomain,
            isSSLValid,
            // domainRegistrationLength,
            hasHTTPSToken: hasHTTPSTokenResult,
            domainAge,
            pageRank,
            isIndexed,
            trustScore
        };
    } catch (error) {
        console.error('Error fetching website data:', error.message);

        // If there's an error, handle retries or throw the error
        if (retryCount > 0) {
            console.log(`Retrying... ${retryCount} attempts left`);
            return getAllWebsiteData(url, retryCount - 1);
        }

        throw error;
    }
};



// Example usage:
const urlToCheck = "https://www.scamadviser.com/";
getAllWebsiteData(urlToCheck)
    .then(async result => {
        console.log(result); // Object containing all data about the website URL and trust score
        let trust = await calculateTrustScore(result);
        console.log(trust);
        return;
    })
    .catch(error => {
        console.error(error);
    });
