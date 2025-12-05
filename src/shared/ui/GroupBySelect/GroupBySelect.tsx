import Select, {type SingleValue} from 'react-select';
import {type GroupByType, type Option, singleSelectStyles} from '../types';

interface Props {
    value: GroupByType;
    onChange: (value: GroupByType) => void;
}

const GROUP_BY_OPTIONS = [
    {value: 'day', label: 'Day'},
    {value: 'week', label: 'Week'},
];

export const GroupBySelect = ({value: _value, onChange}: Props) => {
    const handleChange = (selectedOption: SingleValue<Option>) => {
        if (selectedOption) {
            onChange(selectedOption.value as GroupByType);
        }
    };

    const value = GROUP_BY_OPTIONS.find((option) => option.value === _value);

    return (
        <Select
            value={value}
            options={GROUP_BY_OPTIONS}
            onChange={handleChange}
            isSearchable={false}
            isClearable={false}
            styles={singleSelectStyles}
        />
    );
};
