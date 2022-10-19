import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Sorteio from ".";
import { useListaDeParticipantes } from "../../../state/hooks/useListaDeParticipantes";
import {useResultadoSorteio} from "../../../state/hooks/useResultadoSorteio";

jest.mock("../../../state/hooks/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

jest.mock("../../../state/hooks/useResultadoSorteio", () => {
  return {
    useResultadoSorteio: jest.fn(),
  };
});

describe("Na página de sorteio", () => {
  const participantes = ["Andre", "Ivani", "Aline", "jorel"];
  const resultado = new Map ([
    ['Andre','Ivani'],
    ['Aline','Jorel']
  ])
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultadoSorteio as jest.Mock).mockReturnValue(resultado);
  });
  test("Todos os participantes podem exibir as suas opções de amigos secreto", () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );
    const opcoes = screen.queryAllByRole("option");
    expect(opcoes).toHaveLength(participantes.length+1);
  });

  test("O amigo secreto é exibido quando solicitado", () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const select = screen.getByPlaceholderText('Selecione o seu nome')

    fireEvent.change(select,{
      target:{
        value: participantes[0]
      }
    })

    const botao = screen.getByRole('button')

    fireEvent.click(botao)

    const amigoSecreto = screen.getByRole('alert')

    expect(amigoSecreto).toBeInTheDocument()

  })
});
