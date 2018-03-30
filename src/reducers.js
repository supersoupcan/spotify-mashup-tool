export const authentication = (state={}, action) => {
  switch(action.type){
    case "AUTHENTICATE" : {
      state = {
        authenticated : true,
        profile : action.payload.profile
      };
      break;
    }
    case "UNAUTHENTICATE" : {
      state = {
        authenticated : false,
      };
      break;
    }
  }
  return state;
};

export const discographies = (state=[], action) => {
  switch(action.type){
    case "SET_DISCOGRAPHY" : {
      let nextState = state.slice();
      nextState[action.payload.index] = action.payload.discography;
      state = nextState;
    }
  }
  return state;
};