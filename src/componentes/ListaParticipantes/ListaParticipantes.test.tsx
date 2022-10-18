import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipantes";
import ListaParticipantes from "./";

jest.mock("../../state/hooks/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes:jest.fn()
  }
});

describe("lista de participantes", () => {
  const participantes:string[] = []
  //No primeiro cenário de testes devemos mockar uma lista de participantes vazia (em situação de produção, essa lista seria provida pelo nosso useListaDeParticipantes)
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
  });
  test("Uma lista de participantes vazia deve ser renderizada sem elementos", () => {
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    );

    const itens = screen.queryAllByRole("listitem");
    expect(itens).toHaveLength(participantes.length)
  });

});

describe("Uma lista de participantes não vazia", () => {
  
  //No segundo cenário de testes devemos mockar uma lista de participantes vazia (em situação de produção, essa lista seria provida pelo nosso useListaDeParticipantes)
  const participantes = ['Ana','Catarina']
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
  })

  test("Uma lista de participantes vazia deve ser renderizada sem elementos", () => {
    
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    );
    
    const itens = screen.queryAllByRole("listitem");
    expect(itens).toHaveLength(participantes.length);
  });

});




