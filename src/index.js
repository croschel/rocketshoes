import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

/**
 * Quando vamos utilizar Reduz?
 *  - quando precisarmos realizar operações de diversos
 * componentes para um mesmo elemento, como por exemplo
 * o carrinho de uma compra em um e-commerce.
 *
 * Inicio
 * devemos importar o redux e o react-redux
 * criamos a estrutura de pastas presentes no store e
 * podemos criar um index na store e será ali onde colocaremos
 * o createStore que puxará os reducers presentes no rootReducer
 * que estará presente na pasta modules e por fim devemos criar
 * os reducer, cada um dentro de sua respectiva pasta e então
 * podemos definir o que será retornado através de uma estrutura
 * switch case.
 *
 * Logo em seguida devemos ir até o App.js e importar o index do
 * store e assim podemos importar o Provider de dentro do
 * react-redux e envolvemos todos os outros componentes dentro dele
 * passando store como propriedade
 *
 * importamos connect do react-redux no arquivo a ser utilizado
 * Devemos então realizar um export default connect()('função ou classe')
 * ao final do arquivo
 */
