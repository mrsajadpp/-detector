const hasDoubleSlashRedirection = async (url) => {
    return new Promise((resolve, reject) => {
        try {
            // Check if the URL contains a double slash after the protocol
            const doubleSlashIndex = url.indexOf('://') + 3;
            const hasDoubleSlash = url.indexOf('//', doubleSlashIndex) !== -1;

            resolve(hasDoubleSlash);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = hasDoubleSlashRedirection;
