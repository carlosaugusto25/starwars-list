import { useState } from "react";
import { Header } from "../../components/Header";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export function Login() {

    const { signIn } = useAuth()

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin() {
        if (email === '' || password === '') {
            return alert('Preencha todos os campos!')
        }
        const result = signIn(email, password)
        if (result) {
            navigate('/')
        }
    }

        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="w-1/3 h-3/3 bg-indigo-50/30 rounded-md py-10">
                    <Header widthImg="w-64" />
                    <p className="text-3xl font-bold text-center my-8">LOGIN</p>
                    <div className="px-24">
                        <div className="flex flex-col">
                            <label htmlFor="email">E-MAIL</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="seuemail@exemplo.com" className="border border-indigo-50/10 rounded-md p-2 text-slate-950" />
                        </div>
                        <div className="flex flex-col mt-6">
                            <label htmlFor="password">SENHA</label>
                            <input value={password} onChange={e => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="********" className="border border-indigo-50/10 rounded-md p-2 text-slate-950" />
                        </div>
                        <button onClick={handleLogin} className="w-full bg-sky-500 rounded-md p-2 mt-12 font-bold text-lg">ENTRAR</button>
                        <button onClick={() => navigate('/')} className="w-full bg-transparent rounded-md p-2 mt-6 font-bold text-lg">VOLTAR</button>
                    </div>
                </div>
            </div>

        )
    }