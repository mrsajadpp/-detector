const hasSubdomain = async (url) => {
    return new Promise((resolve, reject) => {
        try {
            // Extract the host from the URL
            const { host } = new URL(url);

            // Split the host into parts
            const parts = host.split('.');

            // Check if there are more than two parts (indicating the presence of a subdomain)
            const hasSubdomain = parts.length > 2;

            resolve(hasSubdomain);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = hasSubdomain;
