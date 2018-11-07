import React from 'react';


const EditNews = (props) => {
    console.log(props);
    return (
        <form>
            <input type='text' name='source' value={props.newsToEdit.source} onChange={props.handleEditChange}/>
        </form>
    )
}

export default EditNews;