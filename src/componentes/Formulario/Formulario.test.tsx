import { act, fireEvent, render, screen } from "@testing-library/react";

import { RecoilRoot } from "recoil";

import Formulario from "./";

describe('Descrevendo o comportamento do Formulario.tsx' , () => {
  test("Quando o input está vázio, novos participantes não podem ser adicionados", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const botao = screen.getByRole("button");
  
    expect(input).toBeInTheDocument();
    expect(botao).toBeDisabled();
  });
  
  test("Adicionar um participante caso exista um nome preenchido", () => {
    //Renderizar o componente
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
  
    //encontrar o input no DOM
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
  
    //encontrar o botão no DOM
    const botao = screen.getByRole("button");
  
    // inserir um nome no campo de input
    fireEvent.change(input, {
      target: {
        value: "Fernanda Guarnieri",
      },
    });
    //clicar no botão de aDICIONAR
    fireEvent.click(botao);
    //garantir que o input esteja com o foco ativo após realizar a insersão
    expect(input).toHaveFocus();
  
    //garantir que o input esteja vazio após a insersão
    expect(input).toHaveValue("");
  });
  
  test("Adicionar um participantes com nomes duplicados", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
  
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
  
    const botao = screen.getByRole("button");
  
    fireEvent.change(input, {
      target: {
        value: "Fernanda Guarnieri",
      },
    });
    fireEvent.click(botao);
    fireEvent.change(input, {
      target: {
        value: "Fernanda Guarnieri",
      },
    });
    fireEvent.click(botao);
  
    const mensagemDeErro = screen.getByRole("alert");
    expect(mensagemDeErro.textContent).toBe(
      "Nomes duplicados não são permitidos"
    );
  });
  
  test("A mensagem de erro deve sumir após os timers", () => {
    jest.useFakeTimers();
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
  
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
  
    const botao = screen.getByRole("button");
  
    fireEvent.change(input, {
      target: {
        value: "Fernanda Guarnieri",
      },
    });
    fireEvent.click(botao);
    fireEvent.change(input, {
      target: {
        value: "Fernanda Guarnieri",
      },
    });
    fireEvent.click(botao);
    let mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeInTheDocument();
  
    act(() => {
      jest.runAllTimers();
    });
  
    mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeNull();
  });
})


