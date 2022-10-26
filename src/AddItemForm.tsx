import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle((e.currentTarget.value))
    const onKeyDownTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === "Enter") addItemHandler()
    }
    const addItemHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}//read
                onChange={changeTitle}//create+update
                onKeyDown={onKeyDownTask}
                error={error}
                size={"small"}
                label={"Title"}
                helperText={error && "Title is required!"}
            />
            <IconButton size="small" onClick={addItemHandler}>
                <AddCircleOutlineIcon style={{color: "hotpink"}}/>
                {error && <div className="error message">{error}</div>}
            </IconButton>

        </div>
    );
};

export default AddItemForm;