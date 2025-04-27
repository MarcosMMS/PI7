// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token); // Armazenar o token
      router.push('/home'); // Redirecionar para a página inicial
    } else {
      setError('Email ou senha inválidos');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-blue-800">Crypto Herança</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Digite seu e-mail"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Digite sua senha"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-500"
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center">
          <a href="#" className="text-blue-600 hover:underline">Esqueceu a senha?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;