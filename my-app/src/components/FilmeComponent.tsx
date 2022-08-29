import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, Button, Space } from "antd"

type Filme = {
  ano_lancamento: Number
  diretor: String
  distribuidora: String
  roteirista: String
  titulo: String
  elenco_principal: String[]
}

export default function FilmeComponent(props: Filme) {
  const navigate = useNavigate()
  const [existe, setExiste] = useState(true)

  if (existe) {
    return (
      <Card title={props.titulo}>
        <p>
          <strong>{props.ano_lancamento.toString()}</strong>
        </p>
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
        <Space size={"middle"}>
          <Button
            onClick={() => {
              navigate(`/alterar?titulo=${props.titulo}`)
            }}
          >
            Alterar
          </Button>
          <Button
            danger
            onClick={() => {
              deletarFilme(props.titulo)
              setExiste(false)
            }}
          >
            Deletar
          </Button>
        </Space>
      </Card>
    )
  }

  return <div></div>
}

function deletarFilme(titulo: String) {
  fetch(`/deletar?titulo=${titulo}`).then((r) => r.json())
}
