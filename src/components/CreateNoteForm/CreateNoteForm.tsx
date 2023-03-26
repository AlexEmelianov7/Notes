import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {INote, setFunction} from "../../types/note";
import Button, {ButtonVariant} from "../Button/Button";

import styles from './CreateNote.module.scss';

interface CreateNoteFormProps {
    setNotes: setFunction<INote[]>
    setTags: setFunction<INote[]>
}

const CreateNoteForm: FC<CreateNoteFormProps> = ({setNotes, setTags}) => {
    const [note, setNote] = useState<string>('');

    const handleSetNote = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNote(event.target.value);
    }

    const handleCreateNote = () => {
        const newNote = {
            id: uuidv4(),
            text: note
        };

        const tags = note.trim().split(' ').filter(note => note.startsWith('#'));
        const newTags = tags.map(tag => ({ id: uuidv4(), text: tag }));

        newTags.length && setTags(tags => [...newTags, ...tags]);

        note.trim().split(' ').length !== tags.length && setNotes(notes => [newNote, ...notes]);

        setNote('');
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleCreateNote();
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <textarea
                className={styles.textarea}
                placeholder='Write note...'
                value={note}
                onChange={handleSetNote}
            />
            <Button
                name='Create'
                type='submit'
                onClick={() => handleSubmit}
                disabled={!note.length}
            />
        </form>
    );
};

export default CreateNoteForm;