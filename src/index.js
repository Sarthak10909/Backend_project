import dotenv from 'dotenv'
import connectDb from './db/index.js'

import { app } from './app.js'

dotenv.config({
    path: './env'
})

connectDb()
.then(() =>{
    app.on("error", (error) => {
        console.log("Error: this is the error ", error)
        throw error
    })
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running at ${process.env.PORT}`)
    })

})
.catch((error) => {
    console.log("MongoDB connection hellllooo failed:", error);
})


























// import express from 'express'

// const app = express()

// ( async() => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("Error: ", error)
//             throw error
//         })
        
//         app.listen(() => {
//             console.log(`App is listening on the port ${process.env.PORT}`)
//         })

//     } catch (error) {
//         console.error("Error: ", error)
//         throw error
//     }
// })()