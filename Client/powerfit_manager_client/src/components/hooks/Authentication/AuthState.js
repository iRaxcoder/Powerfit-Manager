import { useReducer } from "react";
import AuthReducer from "./AuthReducer";
import auth from '../../../service/Authentication';
import AuthContext from "./AuthContext";

const AuthState = ({children}) => {
    const initialState = {
        userAuth:null,
        errors:null
    };
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const loginUser = async (user)=>{
        const ApiResponse = await auth.logIn(user);
        dispatch({
            type:ApiResponse
        });
    }

    return (
        <AuthContext.Provider
            value={{
                userAuth:state.userAuth,
                errors:state.errors,
                loginUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
export default AuthState;