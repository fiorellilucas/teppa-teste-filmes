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
  doc
} from "firebase/firestore"
import "dotenv/config"
import path from "path"

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

app.get("/api", async (req: Request, res: Response) => {
  
  // await setDoc(doc(db, "Filmes", "Interstellar"), {
  //   titulo: "Interstellar",
  //   ano_lancamento: 2014,
  //   diretor: "Christopher Nolan",
  //   roteirista: "Jonathan Nolan",
  //   distribuidora: "Warner Bros. Pictures",
  //   elenco_principal: [
  //     "Matthew McConaughey",
  //     "Anne Hathaway",
  //     "Jessica Chastain"
  //   ]
  // })

  const querySnap: QuerySnapshot = await getDocs(colRef)

  let todosFilmes: any = []

  querySnap.forEach((doc: DocumentSnapshot) => {
    todosFilmes.push(doc.data())
  })
  
  res.json(todosFilmes)
})

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`)
})
