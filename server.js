import express from "express"
const app = express()
const port = process.env.PORT || 8080
import userRoutes from './routes/userRoutes.js'
import ejs from 'ejs'
import fileUpload from "express-fileupload"
import cors from 'cors'
app.set('view engine', 'ejs')
app.set('views', './views')


app.get('/', (req, res) => {
    res.send('API RUNNING!')
});
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())

app.use('/user', userRoutes)

app.use((req, res) => {
    res.status(404).send({
        status: 404,
        error: 'Not found'
    });
});


app.listen(port, () => {
    console.log(`server up and running on port ${port}`)
})