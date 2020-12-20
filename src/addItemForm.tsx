import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@material-ui/core/Button';
import {AddBox, TextFields} from "@material-ui/icons";
import {TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onPressKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }


    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }
    return (
        <div>
            <TextField variant='outlined'
                       value={title}
                       onChange={onChange}
                       onKeyPress={onPressKey}
                       error={!!error}
                       label='Title'
                       helperText={error}
            />
            <IconButton color='primary' onClick={addTask}>
                <AddBox/>
            </IconButton>
            {error && <div className={'error_message'}>{error}</div>}
        </div>
    )
}

export default AddItemForm