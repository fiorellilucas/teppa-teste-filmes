import express, { Express, Request, Response } from "express"

const app: Express = express()
const PORT = 5000

app.get("/", (req: Request, res: Response) => {
  res.send("hello world")
})

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`)
})
