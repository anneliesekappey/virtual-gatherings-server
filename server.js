import app from './app.js'
import error from './error-handling/index.js'

error(app)

const PORT = process.env.PORT

app.listen(PORT, console.log(`App is running in http://localhost:${PORT}`))
