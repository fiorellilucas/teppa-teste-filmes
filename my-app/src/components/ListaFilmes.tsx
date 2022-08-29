import { useEffect, useState } from "react"
import FilmeComponent from "./FilmeComponent"
import { Row, Col } from "antd"

type Filme = {
  ano_lancamento: Number
  diretor: String
  distribuidora: String
  roteirista: String
  titulo: String
  elenco_principal: String[]
}

export default function ListaFilmes() {
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
      <Col span={8}>
        <FilmeComponent
          titulo={filme.titulo}
          ano_lancamento={filme.ano_lancamento}
          diretor={filme.diretor}
          distribuidora={filme.distribuidora}
          elenco_principal={filme.elenco_principal}
          roteirista={filme.roteirista}
        />
      </Col>
    )
  })

  return (
    <Row justify="center" gutter={[24, 24]}>
      {todosFilmes}
    </Row>
  )
}
