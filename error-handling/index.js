export default (app) => {
  app.use((req, res) => {
    res.status(404).json({ message: 'Route does not exist' })
  })

  app.use((err, req, res, next) => {
    console.error('Error', req.method, req.path, err)
    res.status(500).json({ message: 'Internal Server Error' })
  })
}
