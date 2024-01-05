const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const productRouters = require("./routes/ProductRouters.js")
const ErroThrow = require("./middleware/error.js")
const connectDatabase = require("./server.js")
const UserRouters = require("./routes/userRoutes.js")
const orderRouters = require("./routes/orderRouters.js")
const cloundinary = require("cloudinary")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const cors = require("cors")
const path = require("path")

const bannerRouters = require("./routes/bannerRouters.js")
const qureyRouters = require("./routes/queryRouter.js")


process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Uncaught Exception`)
    process.exit(1)
})


dotenv.config();
const port = process.env.PORT || 5000

const app = express();


app.use(cors());
app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
    next()
})

app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


// new routers
app.use('/api/v1', productRouters)
app.use('/api/v1', UserRouters)
app.use('/api/v1', orderRouters)
app.use('/api/v1', qureyRouters)
app.use('/api/v1', bannerRouters)


app.use(ErroThrow)

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// app.get('/', (req, res) => res.json({ message: 'Welcome to our API' }))
app.use((req, res) => res.status(404).json({ success: false, message: 'Not Found' }))

const url = `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASS}@cluster0.sz1ae71.mongodb.net/?retryWrites=true&w=majority`
connectDatabase(url)

cloundinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})
const server = app.listen(port, () => console.log(`Server is listining on port : ${port}`))

process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Unhandled promise Rejection`);
    server.close(() => {
        server.exit(1);
    })
})