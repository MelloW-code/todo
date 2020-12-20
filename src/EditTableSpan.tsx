import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditTableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

function EditTableSpan(props: EditTableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        if (title.trim()) {
            props.changeTitle(title.trim())
        }
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField variant='outlined'
            value={title}
            autoFocus={true}
            onBlur={offEditMode}
            onChange={onChangeTitle}/>
        : <span onDoubleClick={onEditMode}>{props.title}</span>
}

export default EditTableSpan