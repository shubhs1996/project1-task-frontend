import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { IoIosClose } from 'react-icons/io'
import SimpleReactValidator from 'simple-react-validator'
import { connect } from 'react-redux'
import { createCourse, editCourse } from '../../store/actions/course'

//css
import './AddOrEdit.css'

export class AddOrEdit extends Component {

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ element: (message, className) => <div className="validateClass">{message}</div> });
    //checking for id of couse to edit
    this.id = localStorage.getItem('courseId');
    this.state = {
      title: this.id ? this.props.course[0].title : '',
      detail: this.id ? this.props.course[0].detail : '',
      price: this.id ? this.props.course[0].price : '',
      duration: this.id ? this.props.course[0].duration : ''
    }

  }



  handleSubmit = (e) => {
    e.preventDefault()
    if (this.validator.allValid()) {

      if (this.id) {
        //dispatch for editing
        this.props.UpdateCourse(this.state, this.id)
      } else {
        // dispatch for creating
        this.props.CreateCourse(this.state)
      }
      localStorage.removeItem('courseId')
      //closing model
      this.props.handleClose();


    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }



  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }


  render() {

    return (
      <div className="modal_container">
        <div className="modal">
          <div className="modal_header">
            <div className="title">
              {this.props.title}
            </div>
            <IoIosClose size={30} color='white' onClick={this.props.handleClose} />
          </div>
          <div className="modal_body">
            <form onSubmit={this.handleSubmit} className="white">
              <div className="input-field">
                <label htmlFor="email">{this.id ? null : 'Title'}</label>
                <input type="text" id="title" onChange={this.handleChange} value={this.state.title} />
                {this.validator.message('', this.state.title, 'required')}
              </div>
              <div className="input-field">
                <label htmlFor="email">{this.id ? null : 'Detail'}</label>
                <input type="text" id="detail" onChange={this.handleChange} value={this.state.detail} />
                {this.validator.message('', this.state.detail, 'required')}
              </div><div className="input-field">
                <label htmlFor="email">{this.id ? null : 'Price'}</label>
                <input type="text" id="price" onChange={this.handleChange} value={this.state.price} />
                {this.validator.message('', this.state.price, 'required')}
              </div><div className="input-field">
                <label htmlFor="email">{this.id ? null : 'Duration'}</label>
                <input type="text" id="duration" onChange={this.handleChange} value={this.state.duration} />
                {this.validator.message('', this.state.duration, 'required')}
              </div>
            </form>
          </div>
          <div className="modal_footer">
            <Button variant="contained" color="secondary" onClick={this.props.handleClose}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
          </div>
        </div>

      </div>
    )
  }
}


//mapping redux state to props of class component
const mapStateToProps = (state) => {
  const courseId = localStorage.getItem('courseId')

  if (courseId) {
    const courses = state.Course.courses
    const matchedCourse = courses.filter(course => course.id === courseId)

    return {
      course: matchedCourse,
    }
  }
}

//mapping store actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    CreateCourse: (inputs) => dispatch(createCourse(inputs)),
    UpdateCourse: (inputs, id) => dispatch(editCourse(inputs, id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddOrEdit)
