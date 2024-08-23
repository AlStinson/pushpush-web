import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../styles/Button";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="max-w-80 mx-auto">
        <h2 className="mb-2">What is Pushpush?</h2>
        <p className="text-left">
          Pushpush is a turn-based strategy game for two players. Enter now to
          play online with your friends or with other players around the world.
        </p>
      </div>
      <div className="max-w-160 mx-auto mt-4 grid grid-cols-2 gap-2 mobile:grid-cols-1 mobile:grid-rows-2">
        <Button onClick={() => navigate("/rules")}>Learn how to play</Button>
        <Button onClick={() => navigate("/play")}>Play now</Button>
      </div>
    </div>
  );
};

export default Home;
