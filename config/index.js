const config = {
    development: {
        baseUrl: 'https://api.v1.nnkj77.com/lcsx/api'
    },
    production: {
        baseUrl: 'https://api.v1.nnkj77.com/lcsx/api'
    }
}

export default config[process.env.NODE_ENV || 'development']