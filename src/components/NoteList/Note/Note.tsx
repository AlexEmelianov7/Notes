import React, {ChangeEvent, FC, useState} from 'react';
import {INote, setFunction} from "../../../types/note";
import EditArea from "./EditArea/EditArea";
import Button, {ButtonVariant} from "../../Button/Button";
import {v4 as uuidv4} from "uuid";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare, faPenToSquare, faTrashCan} from '@fortawesome/free-regular-svg-icons'

import styles from './Note.module.scss';

interface NoteProps {
    text: string
    id: string
    onDelete: (id: string) => void
    onEdit: (text: string, id: string) => void
    setTags: setFunction<INote[]>
}

const Note: FC<NoteProps> = (
    {
        text = '',
        id = '',
        onEdit,
        onDelete,
        setTags
    }) => {
    const [note, setNote] = useState<string>(text);
    const [edit, setEdit] = useState<boolean>(false);

    const handleChangeNote = (event: ChangeEvent<HTMLDivElement>) => setNote(event.target.innerText);

    const handleSetEdit = () => setEdit(true);

    const handleUnsetEdit = () => {
        setEdit(false);
        onEdit(note, id);

        const tags = note.trim().split(' ').filter(tag => !text.includes(tag) && tag.startsWith('#'));

        const newTags = tags.map(tag => ({ id: uuidv4(), text: tag }));

        newTags.length && setTags(prevTags => [...newTags, ...prevTags]);
    }

    return (
        <div className={`${styles.note} ${edit ? styles.focused : ''}`}>
            {edit ? (
                <EditArea text={text} onChange={handleChangeNote} autofocus={true} />
            ) : (
                <p className={styles.noteText}>{note}</p>
            )}
            <div className={styles.noteButtons}>
                {edit ? (
                    <Button
                        variant={ButtonVariant.secondary}
                        onClick={handleUnsetEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                ) : (
                    <Button
                        variant={ButtonVariant.secondary}
                        onClick={handleSetEdit}
                    >
                        <FontAwesomeIcon icon={faCheckSquare} />
                    </Button>
                )}
                <Button
                    variant={ButtonVariant.secondary}
                    onClick={() => onDelete(id)}
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </Button>
            </div>
        </div>
    );
};

export default Note;