import React, {FC} from 'react';
import {INote} from "../../types/note";
import Tag from "./Tag/Tag";

import styles from './TagList.module.scss';

interface TagListProps {
    tags: INote[]
    onDelete: (id: string) => void
}

const TagList: FC<TagListProps> = ({tags, onDelete}) => {
    return (
        <div className={styles.tagList}>
            {tags.map(({ text, id }) => (
                <Tag
                    key={id}
                    id={id}
                    text={text}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TagList;