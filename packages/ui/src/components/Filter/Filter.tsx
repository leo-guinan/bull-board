import React  from 'react';

import {SelectField, SelectItem} from "../Form/SelectField/InputField";

type FilterProps = {
    jobNames: SelectItem[],
    onSelect: (jobName: string) => void

}

export const Filter = ({jobNames, onSelect}: FilterProps) => {
    return (
        <>
            <SelectField options={[{text: "Select All", value: ""},...jobNames]} onChange={(e) => onSelect((e.target as HTMLSelectElement).value)} />
        </>
    )
}