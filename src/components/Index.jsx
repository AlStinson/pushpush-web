import { v4 as uuid } from 'uuid';
import Input from '../styles/Input';
import Select from '../styles/Select';
import Button from '../styles/Button';
import { useState } from 'react';
import Label from '../styles/Label';
import Form from '../styles/Form';
import { useNavigate } from 'react-router-dom';

const Index = () => {

    const navigate = useNavigate();

    const [gameId, setGameId] = useState(uuid());
    const [kind, setKind] = useState("white");

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`${gameId}/${kind}`)
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Label htmlFor="gameId">Game</Label>
            <Input
                id='gameId'
                type="text"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                placeholder="Game Id (UUID)"
                required
            />
            <Label htmlFor="kind">Team</Label>
            <Select id={kind} value={kind} onChange={(e) => setKind(e.target.value)}>
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="viewer">Viewer</option>
            </Select>
            <Button type="submit">Play</Button>
        </Form>
    );
}

export default Index;