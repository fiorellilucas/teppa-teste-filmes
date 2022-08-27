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
  deleteDoc,
  DocumentReference,
  getDoc,
  updateDoc,
} from "firebase/firestore"
import "dotenv/config"
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

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get("/api", async (req: Request, res: Response) => {
  const colRef: CollectionReference = collection(db, "Filmes")
  const querySnap: QuerySnapshot = await getDocs(colRef)

  let todosFilmes: any = []

  querySnap.forEach((doc: DocumentSnapshot) => {
    todosFilmes.push(doc.data())
  })

  res.json(todosFilmes)
})

app.get("/filme", async (req: Request, res: Response) => {
  const tituloFilme = String(req.query.titulo)

  const docRef: DocumentReference = doc(db, "Filmes", tituloFilme)
  const docSnap: DocumentSnapshot = await getDoc(docRef)

  let dadosFilme: any = docSnap.data()
  dadosFilme.ator1 = dadosFilme.elenco_principal[0]
  dadosFilme.ator2 = dadosFilme.elenco_principal[1]
  dadosFilme.ator3 = dadosFilme.elenco_principal[2]

  delete dadosFilme.elenco_principal
  res.json(dadosFilme)
})

app.post(
  "/adicionar",

  body("titulo").isLength({ min: 1, max: 200 }),
  body("diretor").isLength({ min: 1, max: 200 }),
  body("ano_lancamento").isLength({ min: 1, max: 200 }),
  body("roteirista").isLength({ min: 1, max: 200 }),
  body("distribuidora").isLength({ min: 1, max: 200 }),
  body("ator1").isLength({ min: 1, max: 200 }),
  body("ator2").isLength({ min: 1, max: 200 }),
  body("ator3").isLength({ min: 1, max: 200 }),

  async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      const tituloFilme = req.body.titulo
      const filme = doc(db, "Filmes", tituloFilme)

      let formData = req.body

      await setDoc(filme, {
        titulo: formData.titulo,
        ano_lancamento: formData.ano_lancamento,
        diretor: formData.diretor,
        roteirista: formData.roteirista,
        distribuidora: formData.distribuidora,
        elenco_principal: [formData.ator1, formData.ator2, formData.ator3],
      })

      res.end()
    } else {
      res.status(400).json(errors.array())
    }
  }
)

app.post(
  "/alterar",

  body("titulo").isLength({ min: 1, max: 200 }),
  body("diretor").isLength({ min: 1, max: 200 }),
  body("ano_lancamento").isLength({ min: 1, max: 200 }),
  body("roteirista").isLength({ min: 1, max: 200 }),
  body("distribuidora").isLength({ min: 1, max: 200 }),
  body("ator1").isLength({ min: 1, max: 200 }),
  body("ator2").isLength({ min: 1, max: 200 }),
  body("ator3").isLength({ min: 1, max: 200 }),

  async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      const tituloFilme = req.body.titulo
      const filme = doc(db, "Filmes", tituloFilme)

      let formData = req.body

      await updateDoc(filme, {
        titulo: formData.titulo,
        ano_lancamento: formData.ano_lancamento,
        diretor: formData.diretor,
        roteirista: formData.roteirista,
        distribuidora: formData.distribuidora,
        elenco_principal: [formData.ator1, formData.ator2, formData.ator3],
      })
    } else {
      res.status(400).json(errors.array())
    }
  }
)

app.get("/deletar", async (req: Request, res: Response) => {
  const tituloFilme = String(req.query.titulo)
  const filme = doc(db, "Filmes", tituloFilme)
  await deleteDoc(filme)

  res.end()
})

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`)
})
