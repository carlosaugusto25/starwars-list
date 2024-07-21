import { createContext, useContext, useState } from "react";

interface User {
    name: string;
    email: string;
}



interface AuthState {
    token: string;
    user: User;
}

interface AuthContextProps {
    user: User;
    signIn: (email:string, password: string) => boolean;
    signOut: () => void;

}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthProvider = ({children}:any) => {
    
    const [data, setData] =useState<AuthState>(() => {
        const token = localStorage.getItem('@hubbi:token');
        const user = localStorage.getItem('@hubbi:user');

        if(token && user) {
            return {token, user: JSON.parse(user)};
        }

        return {} as AuthState
    })

    const signIn = (email:string, password: string) => {

        if(email !== 'teste@hubbi.com' && password !== '123456') {
            alert('E-mail ou senha incorretos. Tente novamente');
            return false
        }

        const token = 'ndfaklsdy7t8a7weor8tayhlonrta78ablauif7y8g6a';

        const user ={
            name: 'Usuário Teste',
            email
        }
        
        localStorage.setItem('@hubbi:token', token);
        localStorage.setItem('@hubbi:user', JSON.stringify(user));

        setData({token, user});
        return true
    }

    const signOut = () => {
        localStorage.removeItem('@hubbi:token');
        localStorage.removeItem('@hubbi:user');
        setData({} as AuthState)
    }
    
    
    return(
        <AuthContext.Provider value={{user: data.user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextProps {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context
}

export { AuthProvider, useAuth };