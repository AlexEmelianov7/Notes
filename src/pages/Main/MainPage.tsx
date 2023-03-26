import React, {FC, useEffect, useState} from 'react';
import CreateNoteForm from "../../components/CreateNoteForm/CreateNoteForm";
import FilterInput from "../../components/FilterInput/FilterInput";
import {INote} from "../../types/note";
import NoteList from "../../components/NoteList/NoteList";
import TagList from "../../components/TagList/TagList";

import styles from './MainPage.module.scss';

const MainPage: FC = () => {
    const parsedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const parsedTags = JSON.parse(localStorage.getItem('tags') || '[]');

    const [notes, setNotes] = useState<INote[]>(parsedNotes);
    const [tags, setTags] = useState<INote[]>(parsedTags);
    const [filteredNotes, setFilteredNotes] = useState<INote[]>(notes);

    const handleDeleteNote = (id: string) => {
        const newNoteList = notes.filter(note => note.id !== id);

        setNotes(newNoteList);
    }

    const handleEditNote = (text: string, id: string) => {
        const notesArr = [...notes];

        const noteToEdit = notesArr.find(note => note.id === id);

        noteToEdit!.text = text;

        setNotes(notesArr);
    }

    const handleDeleteTag = (id: string) => {
        const newTagList = tags.filter(tag => tag.id !== id);

        setTags(newTagList);
    }

    useEffect(() => {
        localStorage.setItem('tags', JSON.stringify(tags));
    }, [tags])

    useEffect(() => {
        setFilteredNotes(notes);
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes])

    return (
        <section className={styles.mainPage}>
            <h1 className={styles.title}>text editor</h1>
            <div className={styles.main}>
                <CreateNoteForm setNotes={setNotes} setTags={setTags} />
                <FilterInput notes={notes} setFilteredNotes={setFilteredNotes} />
                {notes.length || tags.length ? (
                    <div className={styles.mainContent}>
                        <NoteList
                            notes={filteredNotes}
                            onDelete={handleDeleteNote}
                            onEdit={handleEditNote}
                            setTags={setTags}
                        />
                        <TagList
                            tags={tags}
                            onDelete={handleDeleteTag}
                        />
                    </div>
                ) : (
                    <p className={styles.nothingAdded}>No notes created</p>
                )}
            </div>
        </section>
    );
};

export default MainPage;