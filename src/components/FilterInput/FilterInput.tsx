import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {INote, setFunction} from "../../types/note";

import styles from './FilterInput.module.scss';

interface FilterInputProps {
    notes: INote[]
    setFilteredNotes: setFunction<INote[]>
}

const FilterInput: FC<FilterInputProps> = ({notes = [], setFilteredNotes}) => {
    const [filterValue, setFilterValue] = useState('');

    const handleChangeFilterValue = (event: ChangeEvent<HTMLInputElement>) => {
        setFilterValue(event.target.value);
    }

    const filterByTags = (value: string, data: INote[]) => {
        if (!value.length) {
            return data
        }

        return data.filter(({ text }) =>
            text.toLowerCase().includes('#') && text.toLowerCase().includes(filterValue.toLowerCase()));
    }

    useEffect(() => {
        const debounced = setTimeout(() => {
            const filteredTags = filterByTags(filterValue, notes);

            setFilteredNotes(filteredTags);
        }, 500);

        return () => {
            clearTimeout(debounced);
        };
    }, [filterValue, notes, setFilteredNotes, filterByTags]);

    return (
        <input
            className={styles.filterInput}
            placeholder='Enter tag to filter notes'
            value={filterValue}
            onChange={handleChangeFilterValue}
        />
    );
};

export default FilterInput;