import {getRequestToken} from "../../services/getRequestToken.ts";

export const LoginComponent = () => {
    const handleLogin = async () => {
        const token = await getRequestToken();
        window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/callback`;
    };

    return <button onClick={handleLogin}>Login with TMDB</button>;
};
