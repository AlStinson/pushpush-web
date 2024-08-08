import { useEffect } from "react";
import ReactGA from "react-ga4";

const usePageView = () => {
    useEffect(() => {
        ReactGA.send("pageview")
    })
}

export default usePageView;