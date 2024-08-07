import { useStopwatch } from "react-timer-hook";

const StopWatch = () => {
    const { seconds, minutes, hours } = useStopwatch({ autoStart: true });

    const prettyPrint = number => {
        if (number === 0) return "00"
        else if (number < 10) return `0${number}`
        else return number;
    }

    return <h3>{prettyPrint(minutes + 60 * hours)}:{prettyPrint(seconds)}</h3>
}

export default StopWatch;