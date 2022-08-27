import { useFormik } from "formik"
import { useEffect } from "react"
import * as Yup from "yup"

export default function FormElenco(props: any) {
  const CAMPO_OBRIGATORIO = "Não este campo em branco deixe em branco"

  const formik = useFormik({
    initialValues: {
      ator1: "",
      ator2: "",
      ator3: "",
    },
    validationSchema: Yup.object({
      ator1: Yup.string().required(CAMPO_OBRIGATORIO),
      ator2: Yup.string().required(CAMPO_OBRIGATORIO),
      ator3: Yup.string().required(CAMPO_OBRIGATORIO),
    }),
    onSubmit: () => {
      enviarDados(props.dadosFilme, props.formAdicionar)
      window.location.href = "/"
    },
  })

  useEffect(() => {
    if (
      props.dadosFilme.hasOwnProperty("ator1") &&
      props.dadosFilme.hasOwnProperty("ator2") &&
      props.dadosFilme.hasOwnProperty("ator3")
    ) {
      formik.setFieldValue("ator1", props.dadosFilme.ator1)
      formik.setFieldValue("ator2", props.dadosFilme.ator2)
      formik.setFieldValue("ator3", props.dadosFilme.ator3)
    }
  }, [props.dadosFilme])
  // colocar formik no array de dependências causa loop de render infinito

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="elenco_principal">Elenco principal (3 atores)</label>
      <input
        type="text"
        id="ator1"
        name="ator1"
        value={formik.values.ator1}
        onChange={(e) => {
          props.setDadosFilme({ ...props.dadosFilme, ator1: e.target.value })
          formik.handleChange(e)
        }}
      />
      {formik.touched.ator1 && formik.errors.ator1 ? (
        <div>{formik.errors.ator1}</div>
      ) : null}
      <input
        type="text"
        id="ator2"
        name="ator2"
        value={formik.values.ator2}
        onChange={(e) => {
          props.setDadosFilme({ ...props.dadosFilme, ator2: e.target.value })
          formik.handleChange(e)
        }}
      />
      {formik.touched.ator2 && formik.errors.ator2 ? (
        <div>{formik.errors.ator2}</div>
      ) : null}
      <input
        type="text"
        id="ator3"
        name="ator3"
        value={formik.values.ator3}
        onChange={(e) => {
          props.setDadosFilme({ ...props.dadosFilme, ator3: e.target.value })
          formik.handleChange(e)
        }}
      />
      {formik.touched.ator3 && formik.errors.ator3 ? (
        <div>{formik.errors.ator3}</div>
      ) : null}

      <button onClick={() => props.setStep(props.step - 1)}>Anterior</button>
      <button type="submit">{props.submitButtonText}</button>
    </form>
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
