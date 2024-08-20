import { useNavigate } from "react-router-dom";
import useWebSocket from "../../hooks/useWebSocket";
import Container from "../styles/Container";
import StopWatch from "../elements/StopWatch";
import Button from "../styles/Button";

const Matchmaking = () => {

    const navigate = useNavigate();

    const onmessage = (json) => {
        navigate(`/game/${json.gameId}/${json.view}`)
    }

    useWebSocket("matchmaking", onmessage);
    return <Container>
        <h2>Matchmaking</h2>
        <StopWatch />
        <Button onClick={() => navigate("/")}>Cancel</Button>
    </Container>
};

export default Matchmaking;