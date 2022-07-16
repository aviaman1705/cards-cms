export const nameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length >= 2 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length >= 2 };
  }
  if (action.type === "EMPTY_FORM") {
    return { value: "", isValid: null };
  }
  return { value: "", isValid: false };
};

export const descReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length >= 2 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length >= 2 };
  }
  if (action.type === "EMPTY_FORM") {
    return { value: "", isValid: null };
  }
  return { value: "", isValid: false };
};

export const addressReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length >= 2 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length >= 2 };
  }
  if (action.type === "EMPTY_FORM") {
    return { value: "", isValid: null };
  }
  return { value: "", isValid: false };
};

export const phoneReducer = (state, action) => {
  var regexPhone = /^0\d([\d]{0,1})([-]{0,1})\d{7,8}$/;

  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: regexPhone.test(action.val) };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: regexPhone.test(state.value) };
  }
  if (action.type === "EMPTY_FORM") {
    return { value: "", isValid: null };
  }
  return { value: "", isValid: false };
};

export const imageReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length >= 2 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length >= 2 };
  }
  if (action.type === "EMPTY_FORM") {
    return { value: "", isValid: null };
  }
  return { value: "", isValid: false };
};
