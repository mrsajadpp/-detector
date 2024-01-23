const lookup = require('safe-browse-url-lookup')({ apiKey: 'AIzaSyA7heLci_0cpXXfvTN9jVetir28OpK3kME' });

lookup.checkSingle('http://thintry.com/')
    .then(isMalicious => {
        console.log(isMalicious ? 'Hands off! This URL is evil!' : 'Everything\'s safe.');
    })
    .catch(err => {
        console.log('Something went wrong.');
        console.log(err);
    });