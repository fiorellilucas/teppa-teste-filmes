import { useEffect } from "react"
import { Button, Form, Input } from "antd"

const CAMPO_OBRIGATORIO = "Não este campo em branco deixe em branco"

export default function FormDetalhes(props: any) {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(props.dadosFilme)
  }, [props.dadosFilme, form])

  return (
    <Form
      form={form}
      onFinish={() => {
        props.setStep(props.step + 1)
      }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
    >
      <Form.Item
        label="Título"
        name="titulo"
        rules={[{ required: true, message: CAMPO_OBRIGATORIO }]}
      >
        <Input
          onChange={(e) => {
            props.setDadosFilme({ ...props.dadosFilme, titulo: e.target.value })
          }}
        />
      </Form.Item>
      <Form.Item
        label="Ano de lançamento"
        name="ano_lancamento"
        rules={[{ required: true, message: CAMPO_OBRIGATORIO }]}
      >
        <Input
          onChange={(e) => {
            props.setDadosFilme({
              ...props.dadosFilme,
              ano_lancamento: e.target.value,
            })
          }}
        />
      </Form.Item>
      <Form.Item
        label="Diretor"
        name="diretor"
        rules={[{ required: true, message: CAMPO_OBRIGATORIO }]}
      >
        <Input
          onChange={(e) => {
            props.setDadosFilme({
              ...props.dadosFilme,
              diretor: e.target.value,
            })
          }}
        />
      </Form.Item>
      <Form.Item
        label="Roteirista"
        name="roteirista"
        rules={[{ required: true, message: CAMPO_OBRIGATORIO }]}
      >
        <Input
          onChange={(e) => {
            props.setDadosFilme({
              ...props.dadosFilme,
              roteirista: e.target.value,
            })
          }}
        />
      </Form.Item>
      <Form.Item
        label="Distribuidora"
        name="distribuidora"
        rules={[{ required: true, message: CAMPO_OBRIGATORIO }]}
      >
        <Input
          onChange={(e) => {
            props.setDadosFilme({
              ...props.dadosFilme,
              distribuidora: e.target.value,
            })
          }}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button htmlType="submit" type="primary">
          Próximo
        </Button>
      </Form.Item>
    </Form>
  )
}
