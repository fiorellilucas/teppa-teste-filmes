import * as Yup from "yup"
import { useFormik } from "formik"
import { useEffect } from "react"

export default function FormDetalhes(props: any) {
  const CAMPO_OBRIGATORIO = "Não este campo em branco deixe em branco"

  const formik = useFormik({
    initialValues: {
      titulo: "",
      ano_lancamento: "",
      diretor: "",
      roteirista: "",
      distribuidora: "",
    },
    validationSchema: Yup.object({
      titulo: Yup.string().required(CAMPO_OBRIGATORIO),
      ano_lancamento: Yup.string().required(CAMPO_OBRIGATORIO),
      diretor: Yup.string().required(CAMPO_OBRIGATORIO),
      roteirista: Yup.string().required(CAMPO_OBRIGATORIO),
      distribuidora: Yup.string().required(CAMPO_OBRIGATORIO),
    }),
    onSubmit: () => {
      props.setStep(props.step + 1)
    },
  })

  useEffect(() => {
    if (
      props.dadosFilme.hasOwnProperty("titulo") &&
      props.dadosFilme.hasOwnProperty("ano_lancamento") &&
      props.dadosFilme.hasOwnProperty("diretor") &&
      props.dadosFilme.hasOwnProperty("roteirista") &&
      props.dadosFilme.hasOwnProperty("distribuidora")
    ) {
      formik.setFieldValue("titulo", props.dadosFilme.titulo)
      formik.setFieldValue("ano_lancamento", props.dadosFilme.ano_lancamento)
      formik.setFieldValue("diretor", props.dadosFilme.diretor)
      formik.setFieldValue("roteirista", props.dadosFilme.roteirista)
      formik.setFieldValue("distribuidora", props.dadosFilme.distribuidora)
    }
  }, [props.dadosFilme])
  // colocar formik no array de dependências causa loop de render infinito

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="titulo">Título</label>
      <input
        type="text"
        id="titulo"
        name="titulo"
        value={formik.values.titulo}
        onChange={(e) => {
          props.setDadosFilme({ ...props.dadosFilme, titulo: e.target.value })
          formik.handleChange(e)
        }}
      />
      {formik.touched.titulo && formik.errors.titulo ? (
        <div>{formik.errors.titulo}</div>
      ) : null}

      <label htmlFor="ano_lancamento">Ano de lançamento</label>
      <input
        type="text"
        id="ano_lancamento"
        name="ano_lancamento"
        value={formik.values.ano_lancamento}
        onChange={(e) => {
          props.setDadosFilme({
            ...props.dadosFilme,
            ano_lancamento: e.target.value,
          })
          formik.handleChange(e)
        }}
      />
      {formik.touched.ano_lancamento && formik.errors.ano_lancamento ? (
        <div>{formik.errors.ano_lancamento}</div>
      ) : null}

      <label htmlFor="diretor">Diretor</label>
      <input
        type="text"
        id="diretor"
        name="diretor"
        value={formik.values.diretor}
        onChange={(e) => {
          props.setDadosFilme({ ...props.dadosFilme, diretor: e.target.value })
          formik.handleChange(e)
        }}
      />
      {formik.touched.diretor && formik.errors.diretor ? (
        <div>{formik.errors.diretor}</div>
      ) : null}

      <label htmlFor="distribuidora">Distribuidora</label>
      <input
        type="text"
        id="distribuidora"
        name="distribuidora"
        value={formik.values.distribuidora}
        onChange={(e) => {
          props.setDadosFilme({
            ...props.dadosFilme,
            distribuidora: e.target.value,
          })
          formik.handleChange(e)
        }}
      />
      {formik.touched.distribuidora && formik.errors.distribuidora ? (
        <div>{formik.errors.distribuidora}</div>
      ) : null}

      <label htmlFor="roteirista">Roteirista</label>
      <input
        type="text"
        id="roteirista"
        name="roteirista"
        value={formik.values.roteirista}
        onChange={(e) => {
          props.setDadosFilme({
            ...props.dadosFilme,
            roteirista: e.target.value,
          })
          formik.handleChange(e)
        }}
      />
      {formik.touched.roteirista && formik.errors.roteirista ? (
        <div>{formik.errors.roteirista}</div>
      ) : null}

      <button type="submit">Próximo</button>
    </form>
  )
}
