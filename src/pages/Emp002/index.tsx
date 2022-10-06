import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FiLock, FiUser, FiX } from 'react-icons/fi';
import Form, { FormHandles } from '../../components/Form';

import getValidationErrors from '../../utils/getValidationErrors';
import ApplicationError from '../../utils/ApplicationError';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Container from '../../components/Container';
import Content from '../../components/Content';

import { useSnackBar } from '../../context/SnackBarContext';
import { useAuth } from '../../context/AuthContext';

import { Banner, Versao } from './styles';
import Dialog from '../../components/Dialog';

interface LoginFormData {
  usuario: string;
  senha: string;
}

const Emp002: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { showSnackBar } = useSnackBar();
  const [showBanner, setShowBanner] = useState(
    ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0,
  );

  const handleSubmit = useCallback(
    async (data: LoginFormData) => {
      setLoading(true);

      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          usuario: Yup.string().required('Informe o usuário'),
          senha: Yup.string().required('Informe a senha'),
        });

        await schema.validate(data, { abortEarly: false });
        await login({ usuario: data.usuario, senha: data.senha });
      } catch (err) {
        setLoading(false);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        if (err instanceof ApplicationError) {
          showSnackBar({
            message: err.message,
            type: 'error',
          });
          return;
        }

        showSnackBar({
          message: 'Verifique sua conexão com a internet!',
          type: 'error',
        });
      }
    },
    [login, showSnackBar],
  );

  return (
    <>
      <Container toolbarPadding={false}>
        {showBanner &&
          !window.matchMedia('(display-mode: standalone)').matches && (
            <Banner>
              <FiX
                onClick={() => {
                  setShowBanner(false);
                }}
              />
              <span>
                Instale o nosso aplicativo para ter uma experiência ainda melhor
              </span>
              <Button
                size="medium"
                xs={4}
                fullWidth
                variant="outlined"
                onClick={() => {
                  setShowBanner(false);
                  setOpenDialog(true);
                }}
              >
                Instalar
              </Button>
            </Banner>
          )}
        <Content width="400px" height="308px">
          <Form title="Fazer Login" formRef={formRef} onSubmit={handleSubmit}>
            <Input
              id="usuario"
              name="usuario"
              autoFocus
              icon={FiUser}
              placeholder="Usuário"
              xs={12}
            />

            <Input
              variant="outlined"
              id="senha"
              name="senha"
              type="password"
              icon={FiLock}
              placeholder="Senha"
              xs={12}
            />

            <Button
              type="submit"
              xs={12}
              fullWidth
              disableTouchRipple
              size="large"
              loading={loading}
            >
              Confirmar
            </Button>
          </Form>
          <Versao>v0.0.2</Versao>
        </Content>

        <Dialog
          title="Instruções para instalar"
          open={openDialog}
          onConfirm={() => {
            setOpenDialog(false);
          }}
        >
          <span>1º Pressione o botão compartilhar</span>

          <br />
          <span>2º Escolha a opção &quot;Adicionar à Tela Inicial&quot;</span>
        </Dialog>
      </Container>
    </>
  );
};

export default Emp002;
