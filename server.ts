import express, { Express, Request, Response } from "express"
import { FirebaseApp, initializeApp } from "firebase/app"
import { Firestore, getFirestore, setDoc, doc } from "firebase/firestore"

import "dotenv/config"

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
}

const fb_app: FirebaseApp = initializeApp(firebaseConfig)
const db: Firestore = getFirestore(fb_app)

const app: Express = express()
const PORT: Number = 5000

app.get("/", async (req: Request, res: Response) => {
  await setDoc(doc(db, "Filmes", "De Volta Para o Futuro"), {
    titulo: "De Volta Para o Futuro",
    ano_lancamento: 1985,
    diretor: "Steven Spielberg",
    roteirista: "Robert Zemeckis",
    distribuidora: "Universal Pictures",
    elenco_principal: [
      "Michael J. Fox",
      "Christopher Lloyd",
      "Lea Thompson"
    ] 
  })
  res.end()
})

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`)
})
