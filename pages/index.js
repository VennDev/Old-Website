// import node module libraries
import {useEffect} from "react";

// import required data files
import {isAuthorized} from "components/server/server-helpers";
import {Authentication} from 'components/auth/Authentication';
import {useRouter} from 'next/router';

const Home = (context) => {
    const {req} = context;
    const isAuth = isAuthorized(req);
    const router = useRouter();

    useEffect(() => {
        if (isAuth) router.push("/dashboard").then(r => r);
    }, [isAuth, router]);

    return (
        <></>
    );
}
export default Home;
