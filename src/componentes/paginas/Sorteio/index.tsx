import { useState } from "react";
import { useListaDeParticipantes } from "../../../state/hooks/useListaDeParticipantes";
import {useResultadoSorteio} from "../../../state/hooks/useResultadoSorteio";
import Card from "../../Card";
import "./estilos.css"

const Sorteio = () => {
  const [participanteDaVez,setParticipanteDaVez] = useState('')
  const [amigoSecreto,setAmigoSecreto] = useState('')
  const participantes = useListaDeParticipantes()
  const resultado = useResultadoSorteio()

  const sortear = (evento:React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    if(resultado.has(participanteDaVez)){
      setAmigoSecreto(resultado.get(participanteDaVez)!)
    }
  }
  return (
    <Card>
      <section className="sorteio">
        <h2>Quem vai tirar o papelzinho?</h2>
        <form onSubmit={sortear}>
          <select 
            required 
            name="ParticipanteDaVez" 
            id="ParticipanteDaVez"
            placeholder="Selecione o seu nome"
            value={participanteDaVez}
            onChange={evento => setParticipanteDaVez(evento.target.value) }
          >
            <option>Selecione seu nome</option>
            {participantes.map((participante) => (
              <option key={participante}>{participante}</option>
            ))}
          </select>
          <button className="botao-sortear">Sortear</button>
        </form>
        {amigoSecreto && <p className="resultado" role={"alert"}>{amigoSecreto}</p>}
      </section>
    </Card>
  );
};

export default Sorteio;
