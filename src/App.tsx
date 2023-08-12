import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';
import Select, { components, OptionProps, OptionsOrGroups } from 'react-select';
import {
  useForm,
  Controller,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form';
import * as React from 'react';
import './style.css';

export type IDataOption = {
  label: string;
  value: string;
  color: string;
};

export type IDataOptionAlt = {
  label: string;
  value: string;
  color: string;
  data: IDataOption;
};

const CustomOption = ({
  children,
  ...props
}: OptionProps<IDataOptionAlt, false, any>) => {
  console.log(props, children);
  return (
    <components.Option
      {...props}
    >{`${children} - ${props.data.color}`}</components.Option>
  );
};

export default function App() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [options, setOptions] = React.useState<OptionsOrGroups<any, any>>([
    { value: 'Uno', label: 'Uno', color: 'Red' },
    { value: 'Dos', label: 'Dos', color: 'Black' },
    { value: 'Tres', label: 'Tres', color: 'Brown' },
    { value: 'Cuatro', label: 'Cuatro', color: 'Yellow' },
    { value: 'Cinco', label: 'Cinco', color: 'White' },
    { value: 'Seis', label: 'Seis', color: 'Magenta' },
  ]);

  const { control } = useForm({
    mode: 'onChange',
  });

  const filterOption = React.useCallback(
    (
      option: FilterOptionOption<IDataOptionAlt>,
      inputValue: string
    ): boolean => {
      if (
        option?.data?.label
          ?.toLowerCase()
          ?.includes(inputValue?.toLowerCase()) ||
        option?.data?.color?.toLowerCase()?.includes(inputValue?.toLowerCase())
      ) {
        return true;
      }
    },
    []
  );

  return (
    <div className="index">
      <Controller
        control={control}
        name="numberoptions"
        rules={{
          required: {
            value: true,
            message: 'Es requerido seleccionar algo',
          },
        }}
        render={({
          field: { onChange, onBlur, value, ref },
        }: {
          field: ControllerRenderProps<FieldValues, 'numberoptions'>;
        }) => {
          return (
            <Select
              className="select"
              filterOption={filterOption}
              components={{ Option: CustomOption }}
              onChange={(onChangeValue: any) => {
                setSearchTerm(onChangeValue?.label);
                onChange(onChangeValue);
              }}
              backspaceRemovesValue
              options={options}
              onBlur={onBlur}
              // menuIsOpen
              value={value}
              isSearchable
              isClearable
              ref={ref}
            />
          );
        }}
      />
      {options
        .filter((val: IDataOption) => {
          if (
            val?.label
              ?.toLocaleLowerCase()
              ?.includes(searchTerm?.toLocaleLowerCase())
          ) {
            return true;
          } else if (
            [undefined, null, ''].includes(searchTerm?.toLocaleLowerCase())
          ) {
            return true;
          }
        })
        .map((item: IDataOption, index: number) => {
          return (
            <div key={index}>
              <p>{item?.label}</p>
            </div>
          );
        })}
    </div>
  );
}
