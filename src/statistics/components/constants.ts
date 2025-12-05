import type {StylesConfig} from 'react-select';
import type {Option} from './types';

const commonSelectStyles: StylesConfig<Option> = {
    valueContainer: (provided) => ({
        ...provided,
        color: 'var(--select-color)',
        flexWrap: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'var(--select-color)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: '100%',
    }),

    placeholder: (provided) => ({
        ...provided,
        color: 'var(--select-color)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: '100%',
    }),

    option: (provided, state) => ({
        ...provided,
        color: state.isSelected || state.isFocused ? 'var(--select-color-focused)' : 'var(--select-color)',
        backgroundColor: state.isSelected || state.isFocused ? 'var(--select-bg-color-focused)' : 'var(--select-bg)',
        '&:active': {
            color: 'var(--select-color-focused)',
            backgroundColor: 'var(--select-bg-color-active)',
        },
    }),

    menuList: (provided) => ({
        ...provided,
        backgroundColor: 'var(--select-bg)',
    }),
};

export const singleSelectStyles: StylesConfig<Option, false> = {
    ...commonSelectStyles,
    control: (provided) => ({
        ...provided,
        color: 'var(--select-color)',
        backgroundColor: 'var(--select-bg)',
        flexWrap: 'nowrap',
        overflow: 'hidden',
    }),
};

export const multiSelectStyles: StylesConfig<Option, true> = {
    ...commonSelectStyles,
    control: (provided) => ({
        ...provided,
        width: '200px',
        minWidth: '200px',
        maxWidth: '200px',
        color: 'var(--select-color)',
        backgroundColor: 'var(--select-bg)',
        flexWrap: 'nowrap',
        overflow: 'hidden',
    }),

    multiValue: (provided) => ({
        ...provided,
        maxWidth: 'calc(100% - 10px)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: 'var(--select-color)',
        backgroundColor: 'var(--select-bg-color-selected)',
    }),

    multiValueLabel: (provided) => ({
        ...provided,
        color: 'var(--select-color)',
    }),

    multiValueRemove: (provided) => ({
        ...provided,
        color: 'var(--select-color)',
        ':hover': {
            backgroundColor: 'var(--select-bg-color-remove)',
        },
    }),
};
