import { Button, Form, Input, Space } from "antd"
import { useEffect } from "react"

export default function FormElenco(props: any) {
  const CAMPO_OBRIGATORIO = "Não este campo em branco deixe em branco"

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(props.dadosFilme)
  }, [props.dadosFilme, form])

  return (
    <Form
      form={form}
      onFinish={() => {
        enviarDados(props.dadosFilme, props.formAdicionar)
        window.location.href = "/"
      }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
    >
      <Form.Item
        label="Ator 1"
        name="ator1"
        rules={[{ required: true, message: CAMPO_OBRIGATORIO }]}
      >
        <Input
          onChange={(e) => {
            props.setDadosFilme({ ...props.dadosFilme, ator1: e.target.value })
          }}
        />
      </Form.Item>
      <Form.Item
        label="Ator 2"
        name="ator2"
        rules={[{ required: true, message: CAMPO_OBRIGATORIO }]}
      >
        <Input
          onChange={(e) => {
            props.setDadosFilme({ ...props.dadosFilme, ator2: e.target.value })
          }}
        />
      </Form.Item>
      <Form.Item
        label="Ator 3"
        name="ator3"
        rules={[{ required: true, message: CAMPO_OBRIGATORIO }]}
      >
        <Input
          onChange={(e) => {
            props.setDadosFilme({ ...props.dadosFilme, ator3: e.target.value })
          }}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space size={32}>
          <Button>Anterior</Button>
          <Button htmlType="submit" type="primary">
            {props.submitButtonText}
          </Button>
        </Space>
      </Form.Item>
    </Form>
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
