const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // Choose the desired port

// Import your existing modules
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

// Middleware to parse JSON requests
app.use(express.json());

// API endpoint to fetch website data
app.get('/api/website-data', async (req, res) => {
    const { url } = req.query;
    const retryCount = 3;

    try {
        // Check if the website exists
        await checkWebsiteExists(url);

        // If it exists, proceed to fetch website data
        const websiteData = await getAllWebsiteData(url, retryCount);

        // Respond with the website data
        res.json(websiteData);
    } catch (error) {
        console.error('Error fetching website data:', error.message);

        // If there's an error, handle retries or return an appropriate response
        if (retryCount > 0) {
            console.log(`Retrying... ${retryCount} attempts left`);
            return res.status(500).json({ error: 'Retrying...' });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Function to check if the website exists
const checkWebsiteExists = async (url) => {
    try {
        const response = await axios.head(url);
        if (response.status !== 200) {
            throw new Error('Website does not exist or is not reachable');
        }
    } catch (error) {
        throw new Error('Website does not exist or is not reachable');
    }
};

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
        const domainRegistrationLength = await getDomainRegistrationLength(url);
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
            domainRegistrationLength,
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
            domainRegistrationLength,
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
