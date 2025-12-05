import {components, type MultiValueRemoveProps} from 'react-select';
import type {Option} from '../types';

export const MultiValueRemove = (props: MultiValueRemoveProps<Option>) => {
    const {selectProps} = props;
    const selectedValues = selectProps.value;
    const selectedCount = Array.isArray(selectedValues) ? selectedValues.length : 0;

    if (selectedCount <= 1) {
        return null;
    }

    return <components.MultiValueRemove {...props} />;
};
