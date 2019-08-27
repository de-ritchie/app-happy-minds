const config = {
    "production": {
        "PORT": process.env.PORT || 3000,
        "MONGODB_USER": "admin",
        "MONGODB_PASS": "admin123",
        "MONGODB_URL": "ds257507.mlab.com:57507/happiest-mind-db",
        "MONGODB_DB": "happiest-mind-db",
        "TOKEN": "======<>======"
    }
}

module.exports = config.production;
// module.exports = config[process.env.NODE_ENV] || config.production