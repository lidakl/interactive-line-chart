import Select, {type SingleValue} from 'react-select';
import {singleSelectStyles} from '../constants';
import {type LineStyleType, type Option} from '../types';
import {SingleValue as CustomSingleValue} from './SingleValue';

interface Props {
    value: LineStyleType;
    onChange: (value: LineStyleType) => void;
}

const LINE_STYLE_OPTIONS = [
    {value: 'line', label: 'line'},
    {value: 'line_curve', label: 'curve line'},
    {value: 'area', label: 'area'},
    {value: 'smooth', label: 'smooth'},
];

export const LineStyleSelect = ({value: _value, onChange}: Props) => {
    const handleChange = (selectedOption: SingleValue<Option>) => {
        if (selectedOption) {
            onChange(selectedOption.value as LineStyleType);
        }
    };

    const value = LINE_STYLE_OPTIONS.find((option) => option.value === _value);

    return (
        <Select
            value={value}
            options={LINE_STYLE_OPTIONS}
            onChange={handleChange}
            isSearchable={false}
            isClearable={false}
            styles={{
                ...singleSelectStyles,
                control: (provided) => ({
                    ...provided,
                    width: '200px',
                    color: 'var(--select-color)',
                    backgroundColor: 'var(--select-bg)',
                    flexWrap: 'nowrap',
                    overflow: 'hidden',
                }),
            }}
            components={{
                SingleValue: CustomSingleValue,
            }}
        />
    );
};
