import React, {FC} from 'react';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button, {ButtonVariant} from "../../Button/Button";

import styles from './Tag.module.scss';


interface TagProps {
    id: string
    text: string
    onDelete: (id: string) => void
}

const Tag: FC<TagProps> = ({id = '' ,text = '', onDelete}) => {
    return (
        <div className={styles.tag}>
            <p className={styles.tagText}>{text}</p>
            <Button
                variant={ButtonVariant.secondary}
                onClick={() => onDelete(id)}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </Button>
        </div>
    );
};

export default Tag;