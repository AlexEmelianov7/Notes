import React, {ChangeEvent, FC, useEffect, useRef} from 'react';
import ReactHashtag from 'react-hashtag';

import styles from './EditArea.module.scss';

interface EditaAreaProps {
    text: string
    onChange: (event: ChangeEvent<HTMLDivElement>) => void
    autofocus: boolean
}

const EditArea: FC<EditaAreaProps> = ({text = '' , onChange, autofocus= false}) => {
    const editAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!autofocus) {
            return
        }

        if(editAreaRef.current) {
            editAreaRef.current.focus()
        }
    }, [autofocus]);

    return (
        <div
            className={styles.editArea}
            onInput={onChange}
            ref={editAreaRef}
            contentEditable={true}
            suppressContentEditableWarning={true}
        >
            <ReactHashtag>{text}</ReactHashtag>
        </div>
    );
};

export default EditArea;