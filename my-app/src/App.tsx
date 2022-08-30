import BotaoAdicionar from "./components/BotaoAdicionar"
import ListaFilmes from "./components/ListaFilmes"
import { Row, Col } from "antd"

function App() {
  return (
    <div>
      <Row justify="center">
        <Col>
          <BotaoAdicionar />
        </Col>
      </Row>
        <ListaFilmes />
    </div>
  )
}

export default App
