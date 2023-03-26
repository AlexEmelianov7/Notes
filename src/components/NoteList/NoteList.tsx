import React, {FC} from 'react';
import {INote, setFunction} from "../../types/note";
import Note from "./Note/Note";

import styles from './NoteList.module.scss';

interface NoteListProps {
    notes: INote[]
    onDelete: (id: string) => void
    onEdit: (text: string, id: string) => void
    setTags: setFunction<INote[]>
}

const NoteList: FC<NoteListProps> = (
    {
        notes = [],
        onDelete,
        onEdit,
        setTags
    }) => {
    return (
        <div className={styles.noteList}>
            {notes.map(({ id, text }) => (
                <Note
                    key={id}
                    text={text}
                    id={id}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    setTags={setTags}
                />
            ))}
        </div>
    );
};

export default NoteList;