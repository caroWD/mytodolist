import { app } from './app'
import { NODE_ENV, PORT } from './config'

app.listen(PORT, () =>
  console.log(
    `🚀 Server listening at http://localhost:${PORT} in ${NODE_ENV} mode`
  )
)
