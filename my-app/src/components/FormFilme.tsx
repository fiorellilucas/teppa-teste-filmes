import "../style/adicionar.css"
import { useEffect, useState } from "react"
import FormDetalhes from "./FormDetalhes"
import FormElenco from "./FormElenco"

export default function FormFilme() {
  //formAdicionar == true é usado para adicionar um filme
  //formAdicionar == false é usado para alterar um filme
  const [formAdicionar, setFormAdicionar] = useState(true)

  const [submitButtonText, setSubmitButtonText] = useState(
    "Adicionar novo filme"
  )

  const [step, setStep] = useState(0)
  const [dadosFilme, setDadosFilme] = useState({
    titulo: "",
    ano_lancamento: "",
    diretor: "",
    roteirista: "",
    distribuidora: "",
    ator1: "",
    ator2: "",
    ator3: "",
  })

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)

    if (urlSearchParams.has("titulo")) {
      setFormAdicionar(false)
      setSubmitButtonText("Alterar filme")

      const params = Object.fromEntries(urlSearchParams.entries())
      const tituloFilme = params["titulo"]

      fetch(`/filme?titulo=${tituloFilme}`)
        .then((response) => response.json())
        .then((filmeJson) => {
          setDadosFilme(filmeJson)
        })
    }
  }, [])

  const listaForms = [
    <FormDetalhes
      step={step}
      setStep={setStep}
      dadosFilme={dadosFilme}
      setDadosFilme={setDadosFilme}
    />,
    <FormElenco
      formAdicionar={formAdicionar}
      setFormAdicionar={setFormAdicionar}
      step={step}
      setStep={setStep}
      dadosFilme={dadosFilme}
      setDadosFilme={setDadosFilme}
      submitButtonText={submitButtonText}
    />,
  ]

  return <div>{listaForms[step]}</div>
}
