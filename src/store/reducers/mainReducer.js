export const mainReducer = (state = "", action) => {
    switch (action.type) {
        case 'MAIN::DEFAULT':
          return action.payload;
        default:
          return state;
      }
  }

  export default mainReducer;