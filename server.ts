import express, { Express, Request, Response } from "express"
import { FirebaseApp, initializeApp } from "firebase/app"
import {
  Firestore,
  getFirestore,
  getDocs,
  DocumentSnapshot,
  collection,
  CollectionReference,
  QuerySnapshot,
  setDoc,
  doc,
} from "firebase/firestore"
import "dotenv/config"
import path from "path"
import { body, validationResult } from "express-validator"
import bodyParser, { BodyParser } from "body-parser"

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
}

const fb_app: FirebaseApp = initializeApp(firebaseConfig)
const db: Firestore = getFirestore(fb_app)

const app: Express = express()
const PORT: Number = 5000

const colRef: CollectionReference = collection(db, "Filmes")

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get("/api", async (req: Request, res: Response) => {
  const querySnap: QuerySnapshot = await getDocs(colRef)

  let todosFilmes: any = []

  querySnap.forEach((doc: DocumentSnapshot) => {
    todosFilmes.push(doc.data())
  })

  res.json(todosFilmes)
})

app.post("/adicionar", async (req: Request, res: Response) => {
  let formData = req.body

  await setDoc(doc(db, "Filmes", formData.titulo), {
    titulo: formData.titulo,
    ano_lancamento: formData.ano_lancamento,
    diretor: formData.diretor,
    roteirista: formData.roteirista,
    distribuidora: formData.distribuidora,
    elenco_principal: [formData.ator1, formData.ator2, formData.ator3],
  })

  res.end()
})

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`)
})
