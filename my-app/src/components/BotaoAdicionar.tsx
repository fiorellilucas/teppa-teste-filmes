import { useNavigate } from "react-router-dom"
import { Button } from "antd"

export default function BotaoAdicionar() {
  const navigate = useNavigate()

  return (
    <Button
      type="primary"
      onClick={() => {
        navigate("/adicionar")
      }}
      style={{margin: "2vh"}}
    >
      Adicionar filme
    </Button>
  )
}
