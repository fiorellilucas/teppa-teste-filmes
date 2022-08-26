import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

type Filme = {
  ano_lancamento: Number
  diretor: String
  distribuidora: String
  roteirista: String
  titulo: String
  elenco_principal: String[]
}

function App() {
  return (
    <div>
      <Link to="/adicionar">Adicionar filme</Link>
      <ListaFilmes />
    </div>
  )
}

function ListaFilmes() {
  const [colecaoFilmes, setColecaoFilmes] = useState<Array<Filme>>([])

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((filmes) => {
        setColecaoFilmes(filmes)
      })
  }, [])

  const todosFilmes = colecaoFilmes.map((filme) => {
    return (
      <FilmeComponent
        titulo={filme.titulo}
        ano_lancamento={filme.ano_lancamento}
        diretor={filme.diretor}
        distribuidora={filme.distribuidora}
        elenco_principal={filme.elenco_principal}
        roteirista={filme.roteirista}
      />
    )
  })

  return <ul>{todosFilmes}</ul>
}

function FilmeComponent(props: Filme) {
  const navigate = useNavigate()
  const [existe, setExiste] = useState(true)

  if (existe) {
    return (
      <li>
        <h2>{props.titulo}</h2>
        <h3>{props.ano_lancamento.toString()}</h3>
        <p>
          <strong>Diretor: {props.diretor}</strong>
        </p>
        <p>Roteirista: {props.roteirista}</p>
        <p>Elenco principal:</p>
        <ul>
          <li>{props.elenco_principal[0]}</li>
          <li>{props.elenco_principal[1]}</li>
          <li>{props.elenco_principal[2]}</li>
        </ul>
        <p>Distribuidora: {props.distribuidora}</p>
        <button
          onClick={() => {
            navigate(`/alterar?titulo=${props.titulo}`)
          }}
        >
          Alterar
        </button>
        <button
          onClick={() => {
            deletarFilme(props.titulo)
            setExiste(false)
          }}
        >
          Deletar
        </button>
      </li>
    )
  } 
  
  return (
    <div></div>
  )
  
}

function deletarFilme(titulo: String) {
  fetch(`/deletar?titulo=${titulo}`).then((r) => r.json())
}

export default App
