import React, { useState } from "react";

const Rules = () => {
  const [hiddenContent, setHiddenContent] = useState(true);

  return (
    <>
      <h2 className="my-4">Rules</h2>
      <p className="mt-5 mb-10">
        Download the rules in pdf
        <span className="mobile:hidden">:</span>
        <div className="inline mobile:block mobile:mt-2">
          <a
            target="_blank"
            href="/rules/pushpush_rules_es.pdf"
            className="ml-1.5 bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5"
          >
            es
          </a>
        </div>
      </p>
      <div className="relative">
        <p>⚠ Right now rules are only available in spanish.</p>
        <p> Translation to english is in progress.</p>
        <p> Translation to any other language is more than welcome.</p>
      </div>
      <div className="text-left mt-5 space-y-2">
        <div className="bg-[#f9f9f9] table border-solid border-[#aaa] border-2 mb-4 p-5">
          <h3 className="mb-5">
            <button onClick={() => setHiddenContent((value) => !value)}>
              <span className="mr-2">{hiddenContent ? "▶" : "▼"}</span>
            </button>
            Contenido
          </h3>
          <ul
            className={`text-left list-inside list-decimal ${hiddenContent ? "hidden" : ""}`}
          >
            <li>
              <a href="#t1">Componentes</a>
            </li>
            <li>
              <a href="#t2">Preparación</a>
            </li>
            <li>
              <a href="#t3">Objetivo</a>
            </li>
            <li>
              <a href="#t4">Desarrollo</a>
            </li>
          </ul>
        </div>
        <h3 id="t1" className="!mt-6">
          1. Componentes
        </h3>
        <ul className="list-disc list-inside ml-8">
          <li>Un tablero cuadrado dividido en 49 casillas iguales.</li>
          <li>Una Pieza de Valor 0 neutral o balón (⚽).</li>
          <li>
            Para cada jugador:
            <ul className="list-disc list-inside list-style ml-8">
              <li>Una Pieza de Valor 4 (♕).</li>
              <li>Dos Piezas de Valor 3 (♖).</li>
              <li>Dos Piezas de Valor 2 (♘).</li>
              <li>Dos Piezas de Valor 1 (♙).</li>
            </ul>
          </li>
        </ul>
        <h3 id="t2" className="!mt-6">
          2. Preparación
        </h3>
        <p>
          A cada jugador se le asigna un lado del tablero, de forma que los dos
          lados asignados no sean contiguos. Posteriormente, cada jugador coloca
          sus piezas en la primera fila del lado que tiene asignado en el
          siguiente orden: Pieza de Valor 1, Pieza de Valor 2, Pieza de Valor 3,
          Pieza de Valor 4, Pieza de Valor 3, Pieza de Valor 2 y Pieza de Valor
          1. Por último, se coloca la pieza de valor 0 en la casilla central del
          tablero.
        </p>
        <h3 id="t3" className="!mt-6">
          3. Objetivo
        </h3>
        <p>
          Gana el jugador que consiga que la Pieza de Valor 0 salga del tablero
          por el lado asignado al oponente. Se considera que hay empate si ambos
          jugadores lo acuerdan o si es imposible que cualquiera de ellos
          pudiera ganar.
        </p>
        <h3 id="t4" className="!mt-6">
          4. Desarrollo
        </h3>
        <p>
          La partida se desarrolla con turnos alternos de ambos jugadores,
          empezando por cualquiera de ellos. En cada turno, el jugador deberá
          mover una de sus piezas a una casilla adyacente, ya sea ortogonal o
          diagonalmente.
        </p>
        <p>
          Las piezas pueden empujarse entre sí, independiente del jugador que
          las controle. Sin embargo, el valor de la pieza que empuja debe ser
          superior al valor de la pieza que se quiere empujar. Para ello, la
          pieza que empuja se debe colocar en la casilla que ocupa la pieza que
          se quiere empujar y esta última se moverá una casilla en la misma
          dirección que se ha movido la pieza que empuja.
        </p>
        <p className="italic">
          La Pieza de Valor 3 puede empujar a la Pieza de Valor 1 ya que su
          valor es mayor, sin embargo la Pieza de Valor 1 no puede empujar a la
          pieza de Valor 3 ya que su valor es menor. Igualmente, una pieza
          tampoco podrá nunca empujar a otra pieza que tenga su mismo valor.
        </p>
        <p>
          Una pieza que es empujada podría ser obligada a ponerse en la misma
          casilla que otra pieza, con lo que la empujaría. En caso de que una
          pieza haga un empuje que obligue a otra pieza a empujar a una tercera
          que no pueda empujar, el empuje de la primera no se puede realizar.
        </p>
        <p className="italic">
          Varias piezas pueden empujarse simultáneamente siempre que el valor de
          cada pieza que empuja sea mayor que el de la pieza que va a empujar.
          Si en esta cadena, una pieza tuviera que empujar a otra que tenga un
          valor igual o superior al suyo, el movimiento que inicia la cadena es
          considerado ilegal.
        </p>
        <p>
          Las piezas pueden ser empujadas fuera del tablero, en cuyo caso son
          eliminadas inmediatamente y no podrán usarse más a lo largo de la
          partida.
        </p>
        <p>
          La Pieza de Valor 1 puede colocarse en una casilla donde se encuentre
          la Pieza de Valor 4 del adversario, en cuyo caso no se realiza un
          empuje, sino que la Pieza de Valor 4 es eliminada inmediatamente y no
          puede volver a ser utilizada.
        </p>
        <p>
          La Pieza de Valor 0 solo puede ser empujada fuera del tablero por los
          lados asignados a cada jugador, lo que le daría la victoria al jugador
          que tiene asignado el lado contrario.
        </p>
        <p>
          Si una pieza que esté en el borde del tablero hace un empuje sobre la
          Pieza de Valor 0 que también se encuentra en el borde del tablero,
          podrá optar por hacer el empuje normal, o realizar un empuje desviado.
          En el segundo caso, la Pieza de Valor 0 se coloca en la diagonal más
          cercana a la casilla donde debiera ponerse con el empuje normal. Si la
          Pieza de Valor 0 se encuentra en una esquina, entonces el empuja
          desviado consiste en hacer que la Pieza de Valor 0 haga un movimiento
          perpendicular al empuje.
        </p>
        <p>
          La primera jugada del segundo jugador no puede ser con una pieza del
          mismo valor que la pieza que movió el primer jugador y hacer que ambas
          piezas estén alineadas con el centro del tablero.
        </p>
      </div>
    </>
  );
};

export default Rules;
