import { api, PORT } from './src'

api.listen(Number(PORT), () =>
  console.log(`Server listening at http://localhost:${PORT}`)
)
