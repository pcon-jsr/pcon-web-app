import { useReducer, useCallback } from 'react';

const formActionTypes = {
    INPUT_CHANGE: 'INPUT_CHANGE',
}

const formReducer = (state, action) => {
    switch (action.type) {
        case formActionTypes.INPUT_CHANGE:
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid },
                },
                isValid: formIsValid,
            };

        default:
            return state;
    }
};

export const useForm = (INITIAL_FORM_STATE) => {
    const [formState, dispatch] = useReducer(formReducer, INITIAL_FORM_STATE);

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: formActionTypes.INPUT_CHANGE,
            value: value,
            isValid: isValid,
            inputId: id,
        });
    }, []);

    return {
        formState,
        inputHandler,
    };
}