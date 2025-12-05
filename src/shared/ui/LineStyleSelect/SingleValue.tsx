import {components, type SingleValueProps} from 'react-select';
import type {Option} from '../types';

export const SingleValue = (props: SingleValueProps<Option>) => {
    const {children} = props;

    return (
        <components.SingleValue {...props}>
            <span style={{marginRight: '5px'}}>Line style:</span>
            {children}
        </components.SingleValue>
    );
};
