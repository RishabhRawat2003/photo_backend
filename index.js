import dotenv from 'dotenv'
import { connectDB } from './db/index.js'
import { app, } from "./app.js";
import axios from 'axios'

dotenv.config({
    path: './.env'
})

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.error("ERROR", error)
            throw error
        })
        app.listen(process.env.PORT || 8000, '0.0.0.0', () => {
            console.log(`Server is running at port : ${process.env.PORT || 8000}`);
            // setInterval(async () => {
            //     try {
            //         const response = await axios.get('https://nexmentorbackend.onrender.com/health')
            //         console.log(response.data)
            //     } catch (error) {
            //         console.error('Health check failed:', error)
            //     }
            // }, 10 * 60 * 1000)
        })
    })
    .catch((error) => {
        console.error("ERROR While connecting to Database: ", error)
    })