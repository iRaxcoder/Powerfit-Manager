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
        var action=1;
        if(ApiResponse!==1){
            action=2
        }
        dispatch({
            type:action
        });
    }

    const logoutUser = async ()=>{
        await auth.logOut();
        dispatch({
            type: 3
        });
    }

    return (
        <AuthContext.Provider
            value={{
                userAuth:state.userAuth,
                errors:state.errors,
                loginUser,
                logoutUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
export default AuthState;