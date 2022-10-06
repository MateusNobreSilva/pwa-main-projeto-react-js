import React, { memo, useCallback, useRef, useState } from 'react';

import * as Yup from 'yup';
import { areEqual } from 'react-window';
import { MdExitToApp } from 'react-icons/md';
import { add, isAfter, isBefore, parse } from 'date-fns';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Form, { FormHandles } from '../../components/Form';
import ListItem from '../../components/ListItem';
import List, { ListChildProps } from '../../components/List';
import Container from '../../components/Container';
import Content from '../../components/Content';
import DataGrid, {
  DataGridColProps,
  DataGridValueGetterParams,
  currencyColumn,
} from '../../components/DataGrid';
import ApplicationError from '../../utils/ApplicationError';
import DesktopView from '../../components/DesktopView';
import MobileView from '../../components/MobileView';
import {
  CNPJValido,
  formataCNPJ,
  CPFValido,
  formataCPF,
  getStorage,
  numeroValido,
} from '../../utils/utils';
import Dialog from '../../components/Dialog';
import DatePicker from '../../components/DatePicker';
import ToolBar from '../../components/ToolBar';
import Grid from '../../components/Grid';
import Box from '../../components/Box';

import { useSnackBar } from '../../context/SnackBarContext';
import { useViewport } from '../../context/ViewportContext';
import { useAuth } from '../../context/AuthContext';
import IconButton from '../../components/IconButton';

interface PesquisaFormData {
  pesquisa: string;
}

interface DialogFormData {
  dataProvisoria: string;
}

interface Cliente {
  cliContador: number;
  apelido: string;
  cgc: string;
  diaPagto: string;
  vlrAtraso: number;
}

const Adm001: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { logout } = useAuth();
  const dialogFormRef = useRef<FormHandles>(null);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cliente, setCliente] = useState<Cliente>();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { isDesktop } = useViewport();
  const { showSnackBar } = useSnackBar();

  const pesquisaClientes = async (filtro: string) => {
    setLoading(true);
    try {
      let novoFiltro = filtro.toUpperCase();

      if (CNPJValido(novoFiltro)) {
        novoFiltro = formataCNPJ(novoFiltro);
        novoFiltro = `cr002.cgc = '${novoFiltro}'`;
      } else if (CPFValido(novoFiltro)) {
        novoFiltro = formataCPF(novoFiltro);
        novoFiltro = `cr002.cpf = '${novoFiltro}'`;
      } else if (numeroValido(novoFiltro)) {
        novoFiltro = `cr002.clicontador = ${novoFiltro}`;
      } else {
        novoFiltro = `cr002.apelido like '%${novoFiltro}%'`;
      }

      const response = await api.get('clientes', {
        params: {
          empresa: '1',
          filtro: novoFiltro,
          usuario: getStorage('usuario', true),
          senha: getStorage('senha', true),
          opcao: -1,
        },
      });

      setClientes(response.data);
    } catch (err) {
      throw new ApplicationError('Não foi possível ao consultar clientes');
    }
    setLoading(false);
  };

  const handleSubmit = useCallback(async (data: PesquisaFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        pesquisa: Yup.string().required('Campo obrigatório'),
      });

      await schema.validate(data, { abortEarly: false });
      await pesquisaClientes(data.pesquisa);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  const columns: DataGridColProps = [
    { field: 'cliContador', headerName: 'Código', width: 100 },
    { field: 'apelido', headerName: 'Nome fantasia', width: 400 },
    { field: 'cgc', headerName: 'CPF/CNPJ', width: 180 },
    {
      field: 'pDiaPagto',
      headerName: 'Dia vencto.',
      type: 'number',
      width: 150,
      valueGetter: (params: DataGridValueGetterParams) =>
        `${params.row.diaPagto !== undefined ? params.row.diaPagto : 10}`,
    },
    {
      field: 'vlrAtraso',
      headerName: 'Valor em atraso',
      type: 'number',
      width: 160,
      ...currencyColumn,
    },
  ];

  const formataPesquisa = (event: React.SyntheticEvent) => {
    const input = event.target as HTMLInputElement;
    if (CNPJValido(input.value)) {
      input.value = formataCNPJ(input.value);
    } else if (CPFValido(input.value)) {
      input.value = formataCPF(input.value);
    }
  };

  const handleDialog = useCallback(() => {
    if (isDesktop && !cliente) {
      showSnackBar({ message: 'Selecione um cliente!' });
      return;
    }
    setOpenDialog(!openDialog);
  }, [isDesktop, cliente, openDialog, showSnackBar, setOpenDialog]);

  const handleDialogSubmit = useCallback(
    async (data: DialogFormData) => {
      try {
        dialogFormRef.current?.setErrors({});
        const schema = Yup.object().shape({
          dataProvisoria: Yup.string().required('Campo obrigatório'),
        });

        const dataAtual = new Date();
        dataAtual.setHours(0, 0, 0, 0);

        if (
          isBefore(
            parse(data.dataProvisoria, 'dd/MM/yyyy', new Date()),
            dataAtual,
          )
        ) {
          showSnackBar({
            message: 'A data informada já passou!',
            type: 'error',
          });
          return;
        }

        const usuario = parseInt(getStorage('id', true) || '', 10);
        if (
          usuario !== 5 &&
          usuario !== 6 &&
          isAfter(
            parse(data.dataProvisoria, 'dd/MM/yyyy', new Date()),
            add(new Date(), { days: 1 }),
          )
        ) {
          showSnackBar({
            message: 'Você não possui permissão para liberar mais de um dia!',
            type: 'error',
          });
          return;
        }

        await schema.validate(data, { abortEarly: false });

        const response = await api.get('liberacaoprovisoria', {
          params: {
            empresa: '1',
            usuario: getStorage('usuario', true),
            senha: getStorage('senha', true),
            cliente: cliente?.cliContador,
            dtProvisoria: data.dataProvisoria,
          },
        });

        if (response.data === 'OK') {
          handleDialog();
          showSnackBar({
            message: 'Cliente liberado com sucesso!',
            type: 'success',
          });
        } else {
          showSnackBar({
            message: 'Não foi possível liberar o cliente!',
            type: 'error',
          });
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          dialogFormRef.current?.setErrors(errors);
        }
      }
    },
    [handleDialog, showSnackBar, cliente],
  );

  const renderRow = memo((props: ListChildProps) => {
    const { index, style } = props;

    return (
      <ListItem
        key={clientes[index].cliContador}
        style={style}
        primary={clientes[index].apelido}
        secondary={clientes[index].cgc}
        onClick={() => {
          setTimeout(() => {
            setCliente(clientes[index]);
            handleDialog();
          }, 100);
        }}
      />
    );
  }, areEqual);

  return (
    <Container>
      <ToolBar title="Liberação de clientes">
        <IconButton onClick={logout}>
          <MdExitToApp />
        </IconButton>
      </ToolBar>

      <Content>
        <Form formRef={formRef} onSubmit={handleSubmit} disableGrid>
          <Grid>
            <Input
              id="pesquisa"
              name="pesquisa"
              label="Pesquisar"
              placeholder="Pesquise o código, nome, CPF ou CNPJ"
              autoFocus
              fullWidth
              type="search"
              onBlur={formataPesquisa}
              onKeyDown={event => {
                if (event.key.toUpperCase() === 'ENTER') {
                  formataPesquisa(event);
                }
              }}
              xs={12}
            />
          </Grid>

          <DesktopView>
            <Box marginTop={2} marginBottom={2}>
              <DataGrid
                rows={clientes}
                columns={columns}
                rowId="cliContador"
                loading={loading}
                onRowSelected={param => {
                  setCliente(param.data as Cliente);
                }}
              />
            </Box>

            <Grid justify="flex-end">
              <Button name="liberar" onClick={handleDialog}>
                Liberar cliente
              </Button>
            </Grid>
          </DesktopView>

          <MobileView>
            <List
              loading={loading}
              itemSize={72}
              itemCount={clientes.length}
              itemRender={renderRow}
            />
          </MobileView>
        </Form>
      </Content>

      <Dialog
        title="Liberar cliente"
        open={openDialog}
        maxWidth="xs"
        onConfirm={() => {
          dialogFormRef.current?.submitForm();
        }}
        onCancel={handleDialog}
      >
        <Form formRef={dialogFormRef} onSubmit={handleDialogSubmit}>
          <Input
            name="nome"
            label="Nome fantasia"
            value={cliente?.apelido}
            readOnly
            xs={12}
          />
          <Input
            id="cnpj"
            name="cnpj"
            label="CPF/CNPJ"
            value={cliente?.cgc}
            readOnly
            xs={12}
            md={6}
          />

          <Input
            name="vlrAtraso"
            label="Valor em atraso"
            value={cliente?.vlrAtraso.toFixed(2)}
            readOnly
            xs={12}
            md={6}
          />

          <Input
            name="diaPagto"
            label="Dia de vencimento"
            value={cliente?.diaPagto || 10}
            readOnly
            xs={6}
          />

          <DatePicker
            name="dataProvisoria"
            label="Liberar até"
            placeholder="Data provisória"
            desktopVariant="dialog"
            autoFocus
            xs={6}
          />
        </Form>
      </Dialog>
    </Container>
  );
};

export default Adm001;
