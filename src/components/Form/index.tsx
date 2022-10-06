import React from 'react';
import {
  FormHandles as UnFormHandles,
  SubmitHandler as UnFormSubmitHandler,
} from '@unform/core';

import Grid, { GridJustification } from '../Grid';
import { Form as UnForm, Title } from './styles';

export type FormHandles = UnFormHandles;
export type SubmitHandler = UnFormSubmitHandler;

interface FormProps {
  title?: string | null;
  formRef: React.Ref<FormHandles>;
  justify?: GridJustification;
  disableGrid?: boolean;
  children: React.ReactNode;
  onSubmit: SubmitHandler;
}

const Form: React.FC<FormProps> = ({
  title,
  formRef,
  justify,
  disableGrid,
  children,
  onSubmit,
  ...rest
}) => {
  return (
    <UnForm ref={formRef} {...rest} onSubmit={onSubmit}>
      {disableGrid ? (
        <>
          {title && (
            <Grid justify={justify}>
              <Title>{title}</Title>
            </Grid>
          )}
          {children}
        </>
      ) : (
        <Grid justify={justify}>
          <>
            {title && <Title>{title}</Title>}
            {children}
          </>
        </Grid>
      )}
    </UnForm>
  );
};

export default Form;
