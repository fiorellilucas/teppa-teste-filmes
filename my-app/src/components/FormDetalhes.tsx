export default function FormDetalhes(props: any) {
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
