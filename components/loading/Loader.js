import {isAuthorized} from "components/server/server-helpers";
import $ from "jquery";

export const Loader = ({...props}) => {
    const {req} = props;
    const isAuth = isAuthorized(req);

    if (typeof window === "object") {
        $(document).ready(function(){
            if (!isAuth) {
                setTimeout(function(){
                    $('#loading').hide();
                    $('#loading').attr('style', 'display: none !important');
                }, 1500);
            }
        });
    }

    return props.children;
};