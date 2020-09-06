const authRoute = require('./authRoute')
const contentRoute = require('./contentRoute')

const router = [
    {
        path:'/note',
        handler:contentRoute
    },
    {
        path:'/auth',
        handler:authRoute
    },
    {
        path:'/',
        handler:(req,res)=>{
            res.send('Assalamu Alaikum')
        }
    }
]

module.exports = app => {
    router.forEach(r=>{
        if(r.path==='/'){
            app.get(r.path,r.handler)
        }else{
            app.use(r.path,r.handler)
        }
    })
}