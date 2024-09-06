import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BACKEND_CREATE_GAME_URL } from "../../utils/BackendResources";
import Button from "../styles/Button";
import Form from "../styles/Form";

const Play = () => {
  const navigate = useNavigate();

  const [kind, setKind] = useState("white");
  const [timed, setTimed] = useState(false);
  const [time, setTime] = useState(0);
  const [increment, setIncrement] = useState(0);
  const [creatingGame, setCreatingGame] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCreatingGame(true);
    fetch(BACKEND_CREATE_GAME_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        timed
          ? {
              startingTimeMinutes: time,
              perMoveTimeSeconds: increment,
            }
          : {},
      ),
    })
      .then((res) => res.json())
      .then((uuid) => navigate(`/game/${uuid}/${kind}`))
      .catch((e) => navigate("/error", { state: e }));
  };

  const matchmaking = (e) => {
    e.preventDefault();
    navigate("/matchmaking");
  };

  return (
    <>
      <Form onSubmit={matchmaking}>
        <Button type="submit">Matchmaking</Button>
      </Form>
      ---------- o ----------
      <Form onSubmit={handleSubmit}>
        <Button type="submit" disabled={creatingGame}>
          Create a game
        </Button>
        <div className="my-5">
          <label htmlFor="kind">Team </label>
          <select
            className="box-border divide-solid rounded border border-[#ccc] p-1"
            id="kind"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
          >
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
        <div className="mb-5">
          <label htmlFor="timed">Timed </label>
          <input
            type="checkbox"
            id="timed"
            value={timed}
            onChange={() => setTimed((value) => !value)}
          ></input>
        </div>
        {timed && (
          <div>
            <div>
              <label htmlFor="time">Time: </label>
              <input
                className="w-10"
                id="time"
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              ></input>
              minutes
            </div>
            <div>
              <label htmlFor="increment">Increment: </label>
              <input
                className="w-10"
                id="increment"
                type="number"
                value={increment}
                onChange={(e) => setIncrement(e.target.value)}
              ></input>
              seconds
            </div>
          </div>
        )}
      </Form>
    </>
  );
};

export default Play;
