import React, { createContext, useCallback, useState, useContext } from 'react';
import { add, format, isAfter, parse } from 'date-fns';
import ApplicationError from '../utils/ApplicationError';
import api from '../services/api';
import { deleteStorage, getStorage, setStorage } from '../utils/utils';

interface Usuario {
  id: number;
  usuario: string;
  senha: string;
}

interface AuthState {
  usuario: Usuario;
  timestamp: Date;
}

interface LoginData {
  usuario: string;
  senha: string;
}

interface AuthContextData {
  usuario: Usuario;
  login(data: LoginData): Promise<void>;
  logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const id = parseInt(getStorage('id', true) || '', 10);
    const usuario = getStorage('usuario', true);
    const senha = getStorage('senha', true);
    const timestamp = parse(
      getStorage('timestamp', true) || '',
      'dd/MM/yyyy HH:mm:ss',
      new Date(),
    );

    if (
      id &&
      usuario &&
      senha &&
      timestamp &&
      isAfter(add(timestamp, { minutes: 30 }), new Date())
    ) {
      return { usuario: { id, usuario, senha }, timestamp };
    }

    return {} as AuthState;
  });

  const login = useCallback(async ({ usuario, senha }) => {
    const response = await api.get('validausuario', {
      params: {
        empresa: '1',
        usuario,
        senha: senha.toUpperCase(),
        versao: 'pwa',
      },
    });

    const id: number = parseInt(response.data, 10);
    if (id <= 0) {
      throw new ApplicationError('Usuário ou senha inválidos');
    }

    const respPermissao = await api.get('verificapermissao', {
      params: {
        empresa: '1',
        usuario,
        senha: senha.toUpperCase(),
        formulario: 'REP202',
        identifica: '2',
      },
    });

    if (respPermissao.data !== 'OK') {
      throw new ApplicationError('Você não possui permissão para acessar');
    }

    const timestamp = new Date();
    setStorage('id', id.toString(), true);
    setStorage('usuario', usuario, true);
    setStorage('senha', senha.toUpperCase(), true);
    setStorage('timestamp', format(timestamp, 'dd/MM/yyyy HH:mm:ss'), true);
    setData({
      usuario: { id, usuario, senha: senha.toUpperCase() },
      timestamp,
    });
  }, []);

  const logout = useCallback(async () => {
    deleteStorage('id', true);
    deleteStorage('usuario', true);
    deleteStorage('senha', true);
    deleteStorage('timestamp', true);
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario: data.usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro do AuthProvider');
  }

  return context;
}
