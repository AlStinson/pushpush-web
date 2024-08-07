import { useState } from "react"

const useConst = (initialValue) => {
    const [value,] = useState(() => initialValue);
    return value;
}

export default useConst;