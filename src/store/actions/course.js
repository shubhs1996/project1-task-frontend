import Course from '../../modal/course'

export const LOADCOURSES = 'LOADCOURSES';
export const COURSEMSG = 'COURSEMSG';
export const COURSEDLT = 'COURSEDLT';



//loading courses in to redux state
export const loadCourse = () => {
    return async dispatch => {

        try {

            const response = await fetch('http://localhost:8000/course/')
            const resData = await response.json()

            if (resData.message) {
                return dispatch({ type: COURSEMSG, Msg: resData.message })
            }


            const loadedCourse = [];

            for (const key in resData) {
                loadedCourse.push(
                    new Course(
                        resData[key]._id,
                        resData[key].title,
                        resData[key].detail,
                        resData[key].price,
                        resData[key].duration,
                        resData[key].createdBy
                    )
                )
            }

            dispatch({ type: LOADCOURSES, courseArray: loadedCourse })

        } catch (err) {
            throw err;
        }



    }
}


//clearing success messages
export const clearMsg = () => {
    return {
        type: 'CLEARMSG'
    }
}


//deleting single courses
export const DeleteCourse = (id) => {
    return async dispatch => {
        try {
            const response = await fetch(`http://localhost:8000/course/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            })

            const resData = await response.json()

            dispatch(
                {
                    type: COURSEDLT,
                    Msg: resData.message
                }
            )

        } catch (error) {
            throw error
        }
    }
}


//editing course
export const editCourse = (inputs, id) => {
    return async dispatch => {

        console.log(inputs)
        try {
            const response = await fetch(`http://localhost:8000/course/${id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: inputs.title,
                        detail: inputs.detail,
                        price: inputs.price,
                        duration: inputs.duration,
                    })
                }
            )

            const resData = await response.json()

            dispatch({
                type: COURSEMSG,
                Msg: resData.message
            })

        } catch (error) {
            throw error
        }
    }
}


//creating course
export const createCourse = (inputs) => {
    return async dispatch => {
        console.log(inputs)
        const userData = localStorage.getItem('userData')
        const parsedUser = JSON.parse(userData)

        try {
            const response = await fetch('http://localhost:8000/course/addCourse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: inputs.title,
                    detail: inputs.detail,
                    price: inputs.price,
                    duration: inputs.duration,
                    u_id: parsedUser[0]._id
                })
            })

            const resData = await response.json()

            dispatch({
                type: COURSEMSG,
                Msg: resData.message
            })


        } catch (error) {
            throw error
        }
    }
}