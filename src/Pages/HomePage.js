import React, { useState, useEffect } from 'react'
import { IoIosAddCircle } from 'react-icons/io'
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'
import { Redirect } from 'react-router-dom'

import Navbar from '../Components/Navbar/Navbar'
import AddWord from '../Components/AddOrEditCouse/AddOrEdit'
import ItemList from '../Components/Card.js/ItemList'
import { loadCourse, clearMsg, DeleteCourse } from '../store/actions/course'
import { logout } from '../store/actions/auth'

import './HomePage.css'
import { useDispatch, useSelector } from 'react-redux'




const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        background:'green'
    },
}));


function HomePage() {

    const classes = useStyles();


    //to perform action
    const dispatch = useDispatch()

    //states
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState('Add New')

    //fetching data from store reducer
    const courses = useSelector(state => state.Course.courses)
    const courseDlt = useSelector(state => state.Course.coursedltMsg)
    const courseCreate = useSelector(state => state.Course.coursecreateMsg)
    const userToken=useSelector(state=>state.Auth.token)

    //accessing localStorage data Or session
    const userData = localStorage.getItem('userData')
    const parsedUser = JSON.parse(userData)


    //loading courses
    useEffect(() => {
        dispatch(loadCourse())
    }, [courseDlt, show])



    //functions
    //setState
    const handleClose = () => setShow(false)
    const handleShow = (value,id) => {
 
   localStorage.setItem('courseId',id)
        setShow(true)
        setTitle(value)

    }

    //delete of course
    const onDeleteHandler = async (id) => {
        await dispatch(clearMsg())
        await dispatch(DeleteCourse(id));

    }


    const clearMSG = async () => {
        await dispatch(clearMsg())
    }


    // logout handler
    const logoutHandler = async () => {
        await dispatch(logout())
    }


    //checking for authentication
    if (!parsedUser) return <Redirect to='/auth' />




    return (
        <div  >
            <Navbar emailID={parsedUser[0].email} userName={parsedUser[0].userName} onLogout={logoutHandler} />
            {courseDlt ? <div className={classes.root}>
                <Alert onClose={clearMSG}>{courseDlt}</Alert></div> : null}
            {courseCreate ?  <div className={classes.root}>
            <Alert onClose={clearMSG}>{courseCreate}</Alert></div> : null}
            <div className="list-container">
                {courses ? courses.map((course) =>
                    <ItemList onDelete={() => onDeleteHandler(course.id)} uid={parsedUser[0]._id} id={course.id} title={course.title} detail={course.detail} duration={course.duration} price={course.price} createdBy={course.creator} handleShow={handleShow}/>
                ) : <div>No Course Available Please add some</div>}
            </div>
            <IoIosAddCircle className="add-icon" size={70} color='rgb(114, 9, 44)' onClick={() => handleShow('Add New',null)} />

            <Modal
                open={show}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <AddWord handleClose={handleClose} title={title} />
            </Modal>
        </div>
    )
}

export default HomePage











