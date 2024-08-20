import { Outlet, useNavigation } from "react-router-dom"
import Loading from "../elements/Loading";

const LoaderWrapper = () => {
    const navigation = useNavigation();
    return navigation.state !== 'idle' ?  <Loading/> : <Outlet />
}

export default LoaderWrapper