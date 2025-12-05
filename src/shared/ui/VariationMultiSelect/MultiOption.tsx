import {components, type OptionProps} from 'react-select';
import type {Option} from '../types';

export const MultiOption = (props: OptionProps<Option>) => {
    const {selectProps, isSelected} = props;

    const selectedValues = selectProps.value;
    const selectedCount = Array.isArray(selectedValues) ? selectedValues.length : 0;
    const isDisabledInMenu = isSelected && selectedCount === 1;

    const updatedProps = {
        ...props,
        isDisabled: isDisabledInMenu || props.isDisabled,
    };

    return <components.Option {...updatedProps} />;
};
