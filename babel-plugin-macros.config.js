const isDev = import.meta.env.NODE_ENV !== 'production';

module.exports = {
    styledComponents: {
        "displayName": isDev,
        "fileName": false
    }
}