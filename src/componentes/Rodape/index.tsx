
import { useNavigate } from 'react-router-dom'
import {useListaDeParticipantes} from '../../state/hooks/useListaDeParticipantes'



export const Rodape = () => {

  const participantes:string[] = useListaDeParticipantes()
  const navegarPara= useNavigate()
  const iniciar = () => {
    navegarPara('/sorteio')
  }
  return (
    <button
    disabled={participantes.length< 3}
    onClick={iniciar}
    >
      Iniciar Brincadeira
    </button>
  )
}

export default Rodape