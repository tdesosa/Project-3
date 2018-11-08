import React from 'react';

const NewNews = (props) => {
    return(
        <form id="new-news-form" onSubmit={props.createNews}>
            News Source: <input type="text" name="source" onChange={props.handleNewsChange}/>
            <input type="submit" value="generate source"/>
        </form>
    )
}

export default NewNews;