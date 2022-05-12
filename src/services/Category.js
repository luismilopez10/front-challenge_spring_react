import { types } from "../state_manager/Reducer";

const fncCreateCategory = async (categoryName, dispatch) => {
    
    const categoryFromForm = {
        name: categoryName
    }

    if (categoryName) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(categoryFromForm)
        }
        fetch(`http://localhost:8081/api/v1/categories`, requestOptions)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: types.addCategory,
                    payload: data
                });
            });
    }
}

export { fncCreateCategory }