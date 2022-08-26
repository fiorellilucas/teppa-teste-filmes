import "./adicionar.css"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

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

function FormDetalhes(props: any) {
  return (
    <div>
      <label htmlFor="titulo">Título</label>
      <input
        type="text"
        id="titulo"
        name="titulo"
        value={props.dadosFilme.titulo}
        onChange={(event) => {
          props.setDadosFilme({
            ...props.dadosFilme,
            titulo: event.target.value,
          })
        }}
      />

      <label htmlFor="ano_lancamento">Ano de lançamento</label>
      <input
        type="text"
        id="ano_lancamento"
        name="ano_lancamento"
        value={props.dadosFilme.ano_lancamento}
        onChange={(event) => {
          props.setDadosFilme({
            ...props.dadosFilme,
            ano_lancamento: event.target.value,
          })
        }}
      />

      <label htmlFor="diretor">Diretor</label>
      <input
        type="text"
        id="diretor"
        name="diretor"
        value={props.dadosFilme.diretor}
        onChange={(event) => {
          props.setDadosFilme({
            ...props.dadosFilme,
            diretor: event.target.value,
          })
        }}
      />

      <label htmlFor="distribuidora">Distribuidora</label>
      <input
        type="text"
        id="distribuidora"
        name="distribuidora"
        value={props.dadosFilme.distribuidora}
        onChange={(event) => {
          props.setDadosFilme({
            ...props.dadosFilme,
            distribuidora: event.target.value,
          })
        }}
      />

      <label htmlFor="roteirista">Roteirista</label>
      <input
        type="text"
        id="roteirista"
        name="roteirista"
        value={props.dadosFilme.roteirista}
        onChange={(event) => {
          props.setDadosFilme({
            ...props.dadosFilme,
            roteirista: event.target.value,
          })
        }}
      />

      <button onClick={() => props.setStep(props.step + 1)}>Próximo</button>
    </div>
  )
}

function FormElenco(props: any) {
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
