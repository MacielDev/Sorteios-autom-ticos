import { useRecoilValue } from "recoil"
import { listaDeParticipantesState } from "../atom"

export const useListaDeParticipantes = () => {

return useRecoilValue(listaDeParticipantesState)
}