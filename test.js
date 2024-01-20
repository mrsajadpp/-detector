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



// Example usage:
const urlToCheck = "https://google.com";
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
