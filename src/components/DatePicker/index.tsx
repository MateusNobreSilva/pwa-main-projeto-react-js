/* eslint-disable import/no-duplicates */
import React, { useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';
import ptBrLocale from 'date-fns/locale/pt-BR';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { FiCalendar } from 'react-icons/fi';
import { MuiDatePicker, MuiKeyboardDatePicker } from './styles';

import Grid, { GridSize } from '../Grid';
import MobileView from '../MobileView';
import DesktopView from '../DesktopView';
import { useViewport } from '../../context/ViewportContext';

interface DatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  autoFocus?: boolean;
  fullWidth?: boolean;
  desktopVariant?: 'dialog' | 'inline' | 'static';
  size?: 'small' | 'medium';
  xs?: boolean | GridSize;
  sm?: boolean | GridSize;
  md?: boolean | GridSize;
  lg?: boolean | GridSize;
  xl?: boolean | GridSize;
}

interface ViewPortDatePickerProps extends DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

class PtBrDateFnsUtils extends DateFnsUtils {
  getCalendarHeaderText(date: Date) {
    return format(date, 'LLLL', { locale: this.locale });
  }

  getDatePickerHeaderText(date: Date) {
    return format(date, "dd 'de' MMMM", { locale: this.locale });
  }
}

const MobileDatePicker: React.FC<
  Omit<ViewPortDatePickerProps, 'desktopVariant'>
> = ({
  name,
  label,
  placeholder,
  value,
  autoFocus,
  fullWidth,
  onChange,
  xs,
  sm,
  md,
  lg,
  xl,
  ...rest
}) => {
  const { isMobile, isDesktop } = useViewport();
  const datePickerRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datePickerRef.current,
      path: 'value',
    });
  }, [fieldName, registerField, isMobile, isDesktop]);

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <MuiPickersUtilsProvider utils={PtBrDateFnsUtils} locale={ptBrLocale}>
        <MuiDatePicker
          name={name}
          label={label}
          placeholder={placeholder}
          inputProps={{ ref: datePickerRef }}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          fullWidth={fullWidth || true}
          inputVariant="outlined"
          autoComplete="off"
          format="dd/MM/yyyy"
          error={!!error}
          helperText={null}
          clearLabel={React.createElement('span', null, 'LIMPAR')}
          cancelLabel={React.createElement('span', null, 'CANCELAR')}
          okLabel={React.createElement('span', null, 'OK')}
          {...rest}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
};

const DesktopDatePicker: React.FC<ViewPortDatePickerProps> = ({
  name,
  label,
  placeholder,
  value,
  desktopVariant,
  onChange,
  xs,
  sm,
  md,
  lg,
  xl,
  ...rest
}) => {
  const { isMobile, isDesktop } = useViewport();
  const datePickerRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datePickerRef.current,
      path: 'value',
    });
  }, [fieldName, registerField, isMobile, isDesktop]);

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <MuiPickersUtilsProvider utils={PtBrDateFnsUtils} locale={ptBrLocale}>
        <MuiKeyboardDatePicker
          name={name}
          label={label}
          placeholder={placeholder}
          inputProps={{ ref: datePickerRef }}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          autoOk={desktopVariant !== 'dialog'}
          disableToolbar={!desktopVariant || desktopVariant === 'inline'}
          variant={desktopVariant || 'inline'}
          inputVariant="outlined"
          autoComplete="off"
          keyboardIcon={<FiCalendar size={20} />}
          format="dd/MM/yyyy"
          error={!!error}
          helperText={null}
          {...(desktopVariant === 'dialog' && {
            clearLabel: React.createElement('span', null, 'LIMPAR'),
          })}
          {...(desktopVariant === 'dialog' && {
            cancelLabel: React.createElement('span', null, 'CANCELAR'),
          })}
          {...(desktopVariant === 'dialog' && {
            okLabel: React.createElement('span', null, 'OK'),
          })}
          {...rest}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
};

const DatePicker: React.FC<DatePickerProps> = ({
  name,
  label,
  placeholder,
  desktopVariant,
  xs,
  sm,
  md,
  lg,
  xl,
  ...rest
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <>
      <MobileView>
        <MobileDatePicker
          name={name}
          label={label}
          placeholder={placeholder}
          xs={xs}
          sm={sm}
          md={md}
          lg={lg}
          xl={xl}
          value={selectedDate}
          onChange={handleDateChange}
          {...rest}
        />
      </MobileView>
      <DesktopView>
        <DesktopDatePicker
          name={name}
          label={label}
          placeholder={placeholder}
          desktopVariant={desktopVariant}
          xs={xs}
          sm={sm}
          md={md}
          lg={lg}
          xl={xl}
          value={selectedDate}
          onChange={handleDateChange}
          {...rest}
        />
      </DesktopView>
    </>
  );
};

export default DatePicker;
