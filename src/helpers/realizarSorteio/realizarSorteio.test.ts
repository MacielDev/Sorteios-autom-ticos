import { realizarSorteio } from "./realizarSorteio"

describe('Dado um sorteio de amigo secreto', () => {
  test('Cada participante não sortei o próprio nome', () => {
    const participantes = [
      'Ana',
      'Ivani',
      'Fernanda',
      'Andre'
    ]
    const sorteio = realizarSorteio(participantes)
    participantes.forEach(participante => {
      const amigoSecreto = sorteio.get(participante)
      expect(amigoSecreto).not.toEqual(participante)
    })
  })
})