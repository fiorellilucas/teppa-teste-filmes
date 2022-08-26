import { useNavigate } from "react-router-dom"

export default function BotaoAdicionar() {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => {
        navigate("/adicionar")
      }}
    >
      Adicionar filme
    </button>
  )
}
