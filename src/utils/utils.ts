import CryptoJS from 'crypto-js';
import { format } from 'date-fns';

export const removeCaracteres = (valor: string): string => {
  let novoValor = valor;
  novoValor = novoValor.replace(/[^a-zA-Z0-9 ]/g, '');
  return novoValor.trim();
};

export const numeroValido = (valor: string, trataValor = false): boolean => {
  let novoValor = valor;
  if (trataValor) {
    novoValor = removeCaracteres(novoValor);
  }
  return (
    !Number.isNaN(parseFloat(String(novoValor))) &&
    Number.isFinite(Number(novoValor))
  );
};

export const CNPJValido = (valor: string): boolean => {
  const cnpj = removeCaracteres(valor);
  return numeroValido(cnpj) && cnpj.length === 14;
};

export const formataCNPJ = (valor: string): string => {
  let cnpj = removeCaracteres(valor);

  if (CNPJValido(cnpj)) {
    cnpj = `${cnpj[0]}${cnpj[1]}.${cnpj[2]}${cnpj[3]}${cnpj[4]}.${cnpj[5]}${cnpj[6]}${cnpj[7]}/${cnpj[8]}${cnpj[9]}${cnpj[10]}${cnpj[11]}-${cnpj[12]}${cnpj[13]}`;
  } else {
    cnpj = '';
  }

  return cnpj;
};

export const CPFValido = (valor: string): boolean => {
  const cpf = removeCaracteres(valor);
  return numeroValido(cpf) && cpf.length === 11;
};

export const formataCPF = (valor: string): string => {
  let cpf = removeCaracteres(valor);

  if (CPFValido(cpf)) {
    cpf = `${cpf[0]}${cpf[1]}${cpf[2]}.${cpf[3]}${cpf[4]}${cpf[5]}.${cpf[6]}${cpf[7]}${cpf[8]}-${cpf[9]}${cpf[10]}`;
  } else {
    cpf = '';
  }

  return cpf;
};

export const getSecret = (): string => {
  const secret1 = 'C710E21E0AD14D03';
  const secret2 = 'DB1E6C459C8EB868';
  const secret3 = '2E83FC33BD82AE6C';
  const secret4 = 'ADB7F912FEF309A9';
  const secret5 = format(new Date(), 'MMyyyydd');
  return secret1 + secret3 + secret5 + secret4 + secret2;
};

export const criptografa = (valor: string): string => {
  try {
    const secret = '4aD5813ADB7F9';
    const cripto = CryptoJS.AES.encrypt(valor, getSecret()).toString();
    const base64 = secret + CryptoJS.enc.Base64.parse(cripto).toString();
    return base64[base64.length - 3] + base64[base64.length - 2] + cripto;
  } catch (e) {
    return '';
  }
};

export const descriptografa = (valor: string | null): string | null => {
  if (valor === null) return null;

  try {
    const cripto = valor.substring(2);
    return CryptoJS.AES.decrypt(cripto, getSecret()).toString(
      CryptoJS.enc.Utf8,
    );
  } catch (e) {
    return '';
  }
};

export const hash = (valor: string): string => {
  try {
    return CryptoJS.SHA256(valor).toString(CryptoJS.enc.Base64);
  } catch (e) {
    return '';
  }
};

export const setStorage = (
  chave: string,
  valor: string,
  criptografar = false,
): void => {
  const novoValor = criptografar ? criptografa(valor) : valor;
  const novaChave = criptografar ? hash(chave) : chave;
  localStorage.setItem(`@LiberacaoLJ:${novaChave}`, novoValor);
};

export const getStorage = (
  chave: string,
  criptografar = false,
): string | null => {
  const novaChave = criptografar ? hash(chave) : chave;
  const valor = localStorage.getItem(`@LiberacaoLJ:${novaChave}`);
  return criptografar ? descriptografa(valor) : valor;
};

export const deleteStorage = (chave: string, criptografar = false): void => {
  const novaChave = criptografar ? hash(chave) : chave;
  localStorage.removeItem(`@LiberacaoLJ:${novaChave}`);
};
