const containsAtSymbol = async (url) => {
    return new Promise((resolve, reject) => {
        try {
            if (url.includes('@')) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = containsAtSymbol;