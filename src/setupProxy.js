const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        createProxyMiddleware('/oauth2',{
            target:'https://openapivts.koreainvestment.com:29443',
            changeOrigin:true
        })
    )
    app.use(
        createProxyMiddleware('/uapi',{
            target:'https://openapivts.koreainvestment.com:29443',
            changeOrigin:true
        })
    )
    app.use(
        createProxyMiddleware('/api',{
            target:'http://localhost:4000',
            changeOrigin:true
        })
    )
}