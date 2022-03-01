export const selectOptionReducer = (state, action) => {
  if (action.type === "USER_SELECT") {
    return { value: action.val, isValid: action.val !== -1 };
  }
  return { value: "", isValid: false };
};
