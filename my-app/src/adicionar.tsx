import "./adicionar.css"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function FormAdicionar() {
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

  const listaForms = [
    <FormFilme
      step={step}
      setStep={setStep}
      dadosFilme={dadosFilme}
      setDadosFilme={setDadosFilme}
    />,
    <FormElenco
      step={step}
      setStep={setStep}
      dadosFilme={dadosFilme}
      setDadosFilme={setDadosFilme}
    />,
  ]

  return <div>{listaForms[step]}</div>
}

function FormFilme(props: any) {
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
          enviarDados(props.dadosFilme)
          navigate("/")
        }}
      >
        Adicionar novo filme
      </button>
    </div>
  )
}

function enviarDados(formData: any) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(formData),
  }
  fetch("/adicionar", requestOptions).then((response) => response.json)
}
