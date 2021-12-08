const initialState = {
  certaineValeur: 0,
};
const add = (state, action) => {
  return {
    ...state,
    certaineValeur: state.certaineValeur + action.value;
  };
};

const remove = (state, action) => {
  return {
    ...state,
    certaineValeur: state.certaineValeur - action.value;

  };
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case 'add':
      return add(state, action);// "ALORS LA JE COMPRENDS PAS TROP CE QUI M4ARRIVE"
    case 'remove':
      return remove(state, action); // "JE CROIS AVOIR COMPRIS MAIS C4EST LIMITE"
    default :
      return state
  }

}

export default reducer;
