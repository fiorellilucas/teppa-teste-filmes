import "./adicionar.css"

export default function Adicionar() {
  return (
    <form action="" method="post">
      <label htmlFor="titulo">Título</label>
      <input type="text" id="titulo" name="titulo" />

      <label htmlFor="ano_lancamento">Ano de lançamento</label>
      <input type="text" id="ano_lancamento" name="ano_lancamento" />

      <label htmlFor="diretor">Diretor</label>
      <input type="text" id="diretor" name="diretor" />

      <label htmlFor="distribuidora">Distribuidora</label>
      <input type="text" id="distribuidora" name="distribuidora" />

      <label htmlFor="roteirista">Roteirista</label>
      <input type="text" id="roteirista" name="roteirista" />

      <label htmlFor="elenco_principal">Elenco principal (3 atores)</label>
      <input type="text" id="ator1" name="ator1" />
      <input type="text" id="ator2" name="ator2" />
      <input type="text" id="ator3" name="ator3" />

      <button type="submit">Adicionar novo filme</button>
    </form>
  )
}