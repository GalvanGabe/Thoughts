const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

// Models
const Thought = require('./models/Thoughts')
const User = require('./models/User')

// Import Routes
const thoughtsRoutes = require('./routes/thoughtsRoutes')
const authRoutes = require('./routes/authRoutes')

// Import Controller
const ThoughtController = require('./controllers/ThoughtController')

// template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// receive response from the body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// session middleware
app.use(
    session({
        name: "session",
        secret: "toughts_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 86400000,
            httpOnly: true,
        },
    }),
)

// public path 
app.use(express.static('public'))

// flash messages
app.use(flash())

// set session to res
app.use((req, res, next) => {

    if(req.session.userid) {
        res.locals.session = req.session
    }

    next()
})

// Routes
app.use('/thoughts', thoughtsRoutes)
app.use('/', authRoutes)

app.get('/', ThoughtController.showThoughts)

conn
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => console.log(err))