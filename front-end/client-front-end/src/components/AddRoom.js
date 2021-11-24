import React from 'react';
import { useHistory } from 'react-router';

const AddRoom = () => {

    const history = useHistory();

    const cancel = () => {
        history.push('/rooms');
    }

    return(
        <div>
            <h3>Add Room:</h3>
            <button onClick={cancel}>Cancel</button>
        </div>
    )
}

export default AddRoom;
