import { useNavigate } from "react-router-dom"

export default function FormElenco(props: any) {
  const navigate = useNavigate()

  return (
    <div>
      <label htmlFor="elenco_principal">Elenco principal (3 atores)</label>
      <input
        type="text"
        id="ator1"
        name="ator1"
        value={props.dadosFilme.ator1}
        onChange={(event) => {
          props.setDadosFilme({
            ...props.dadosFilme,
            ator1: event.target.value,
          })
        }}
      />
      <input
        type="text"
        id="ator2"
        name="ator2"
        value={props.dadosFilme.ator2}
        onChange={(event) => {
          props.setDadosFilme({
            ...props.dadosFilme,
            ator2: event.target.value,
          })
        }}
      />
      <input
        type="text"
        id="ator3"
        name="ator3"
        value={props.dadosFilme.ator3}
        onChange={(event) => {
          props.setDadosFilme({
            ...props.dadosFilme,
            ator3: event.target.value,
          })
        }}
      />

      <button onClick={() => props.setStep(props.step - 1)}>Anterior</button>
      <button
        type="submit"
        onClick={() => {
          enviarDados(props.dadosFilme, props.formAdicionar)
          navigate("/")
        }}
      >
        {props.submitButtonText}
      </button>
    </div>
  )
}

function enviarDados(dadosFilme: any, formAdicionar: boolean) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(dadosFilme),
  }
  if (formAdicionar) {
    fetch("/adicionar", requestOptions).then((response) => response.json)
  } else {
    fetch(`/alterar?titulo=${dadosFilme.titulo}`, requestOptions).then(
      (response) => response.json
    )
  }
}
