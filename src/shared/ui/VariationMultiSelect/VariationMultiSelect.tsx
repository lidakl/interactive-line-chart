import Select, {type MultiValue} from 'react-select';
import {multiSelectStyles, type Option} from '../types';
import {MultiOption} from './MultiOption';
import {MultiValueRemove} from './MultiValueRemove';

interface Props {
    values: string[];
    onChange: (values: string[]) => void;
    options: Option[];
}

export const VariationMultiSelect = ({options, values, onChange}: Props) => {
    const selectedOptions = options.filter((option) => values.includes(option.value));

    const handleChange = (selected: MultiValue<Option>) => {
        if (selected.length === 0 && selectedOptions.length === 1) {
            return;
        }

        const selectedValues = selected.map((option) => option.value);
        onChange(selectedValues);
    };

    return (
        <Select
            isMulti
            options={options}
            value={selectedOptions}
            onChange={handleChange}
            hideSelectedOptions={false}
            isClearable={false}
            isSearchable={false}
            styles={multiSelectStyles}
            components={{
                MultiValueRemove,
                Option: MultiOption,
            }}
        />
    );
};
