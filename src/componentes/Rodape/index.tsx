
import { useNavigate } from 'react-router-dom'
import {useListaDeParticipantes} from '../../state/hooks/useListaDeParticipantes'

import "./estilos.css"
import { useSorteador } from '../../state/hooks/useSorteador'

export const Rodape = () => {

  const participantes:string[] = useListaDeParticipantes()
  
  const navegarPara= useNavigate()

  const sortear = useSorteador()

  const iniciar = () => {
    sortear()
    navegarPara('/sorteio')
  }
  

  return (
    <footer className="rodape-configuracoes">
      <button
        className="botao"
        disabled={participantes.length< 3}
        onClick={iniciar}
      >
        Iniciar Brincadeira
      </button>
      

    </footer>
  )
}

export default Rodape