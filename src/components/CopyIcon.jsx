import { FaCopy } from "react-icons/fa";


const CopyIcon = props => {
    const onClick = () => {
        navigator.clipboard.writeText(props.value);
        props.action && props.action();
    }
    return <FaCopy style={{ cursor: "pointer" }} onClick={onClick} />
};

export default CopyIcon;