function handleSequelizeErr(error) {
    if (Array.isArray(error.errors)) {
        if (error.errors[0].message) {
            return error.errors[0].message;
        }
    } else {
        return error
    }
}

module.exports = handleSequelizeErr;