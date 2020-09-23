import {LOADCOURSES,COURSEMSG,COURSEDLT} from '../actions/course'

const initialState = {
 courses:[],
 coursecreateMsg:null,
 coursedltMsg:null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADCOURSES:
        return {
            ...state,
            courses:action.courseArray.reverse()
        };
        case COURSEMSG:
            return {
                ...state,
                coursecreateMsg:action.Msg
            };
            case COURSEDLT:
              return {
                ...state,
                coursedltMsg:action.Msg
              };
              case 'CLEARMSG':
                return {
                  ...state,
                  coursecreateMsg:null,
                  coursedltMsg:null,
                };
    default:
      return state;
  }
};