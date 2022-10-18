import { fireEvent, render, screen } from "@testing-library/react";

import React from "react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipantes";
import Rodape from "./";

//Mock da lista de participantes
jest.mock("../../state/hooks/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

const mockDeNavegacao = jest.fn();

//Mock da rota/useNavigate
jest.mock("react-router-dom", () => {
  return {
    useNavigate: () => mockDeNavegacao,
  };
});

describe("Não existem participantes suficientes para o sorteio", () => {
  const participantes: string[] = [];
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
  });

  test("a brincadeira não pode ser inicializada", () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );
    const botao = screen.getByRole("button");
    expect(botao).toBeDisabled();
  });
});

describe("quando participantes for >= 3", () => {
  const participantes = ["Andre", "Fernanda", "Aline", "Ivani"];
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
  });
  test("a brincadeira poderá ser iniciada", () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );
    const botao = screen.getByRole("button");
    expect(botao).not.toBeDisabled();
  });
  test("A brincadeira foi iniciada", () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );
    const botao = screen.getByRole("button");
    fireEvent.click(botao);
    expect(mockDeNavegacao).toHaveBeenCalledTimes(1)// Verifica quantas vezes esperamos que o "navigate" seja chamado
    expect(mockDeNavegacao).toHaveBeenCalledWith('/sorteio') //Verifica se a rota ascessada foi a esperada

  });
});
