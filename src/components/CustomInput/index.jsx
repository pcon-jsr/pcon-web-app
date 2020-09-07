import React, { useReducer } from 'react';
import styles from './index.module.scss';
import { validate } from '../../utils/validators';

const inputActionTypes = {
    CHANGE: 'CHANGE',
    TOUCH: 'TOUCH',
};

const inputReducer = (state, action) => {
    switch (action.type) {
        case inputActionTypes.CHANGE:
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            };
        case inputActionTypes.TOUCH:
            return {
                ...state,
                isTouched: true,
            };
        default:
            return state;
    }
};


const CustomInput = (props) => {
    const INITIAL_STATE = {
        value: '',
        isValid: false,
        isTouched: false,
    };

    const [inputState, dispatch] = useReducer(inputReducer, INITIAL_STATE);

    const changeHandler = event => {
        dispatch({
            type: inputActionTypes.CHANGE,
            val: event.target.value,
            validators: props.validators,
        });
    };

    const touchHandler = () => {
        dispatch({
            type: inputActionTypes.TOUCH,
        });
    }

    let element = (
        <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        />
    );

    if (props.element === 'textarea') {
        element = (
            <textarea
                id={props.id}
                rows={props.rows || 3}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />
        );
    }

    return (
        <div className={`${styles['form-control']} ${!inputState.isValid && inputState.isTouched && styles['form-control--invalid']}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    );
};

export default CustomInput;
