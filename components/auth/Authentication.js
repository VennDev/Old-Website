import {isAuthorized, getDataFromToken, getTokenCookie} from "components/server/server-helpers";
import {useEffect} from 'react';
import {useRouter} from 'next/router';

export const Authentication = ({...props}) => {
    const {req} = props;
    const isAuth = isAuthorized();

    const router = useRouter();

    // check if url different from /authentication/sign-in

    useEffect(() => {
        if (typeof window === "object" && !isAuth && router.pathname !== "/authentication/sign-in") {
            router.push("/authentication/sign-in").then(r => r);
        }
    }, [isAuth, router]);

    return props.children;
};