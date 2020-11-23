
const userReducer =(state={},action)=>{      

          
    switch (action.type) { 
     case 'GET_USERS_SUCCESSFULLY': 
     return{
        ...state,
        data: action.payload
        
   }
   case 'GET_USERS_FAILED': 
   return{
       ...state,
       messageError: action.payload
       
  }
  case 'UPDATE_USER_SUCCESSFULLY': 
  return{
      ...state,
      message: action.message
      
 }

 case "UPDATE_USER_SUCCESSFULLY_TOAST":
    return {
      ...state,
      isCreatedSuccess: action.isCreatedSuccess,
    };
  case "UPDATE_USER_FAILURE_TOAST":
    return {
      ...state,
      isCreatedFailure: action.isCreatedFailure,
    };
        default: return state
            

    }
}
export default  userReducer;