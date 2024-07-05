import { useReducer, useState } from 'react';

import DigitBtn from './components/digitBtn';
import OperationBtn from './components/operationBtn';

import './App.css'

export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    REMOVE_DIGIT: 'remove-digit',
    EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
    switch (type) {

        case ACTIONS.ADD_DIGIT:
            if (state.currentOperand === '0' && payload.digit === '0') {
                return state;
            }
            if (payload.digit === '.' && state.currentOperand.includes('.')) {
                return state;
            }
            if(state.overwrite) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false
                }
            }
            return {
                ...state,
                currentOperand: `${state.currentOperand || ''}${payload.digit}`
            }
        case ACTIONS.CLEAR:
            return {};

        case ACTIONS.REMOVE_DIGIT:
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }
        case ACTIONS.CHOOSE_OPERATION:
            if (state.currentOperand == null && state.previousOperand == null) {
                return state;
            }
            if (state.previousOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    currentOperand: null,
                    previousOperand: state.currentOperand
                }
            }
            if(state.currentOperand == null) {
                return {
                    ...state,
                    operation: payload.operation
                }

            }
            if(state.currentOperand == 0 && state.previousOperand != null) {
                return {
                    ...state,
                    currentOperand: null,
                    operation: payload.operation
                }
            }
            return {
                ...state,
                operation: payload.operation,
                currentOperand: null,
                previousOperand: evaluate(state)
            }
        case ACTIONS.EVALUATE:
            if(state.currentOperand == null || state.previousOperand == null) {
                return state;
            }
            if(state.currentOperand == 0 && state.previousOperand != null && state.operation === '/') {
                return state;
            }
            return {
                ...state,
                overwrite: true,
                operation: null,
                previousOperand: null,
                currentOperand: evaluate(state)
            }
    }
}

function evaluate(state) {
    let result = '';
    let current = Number(state.currentOperand);
    let previous = Number(state.previousOperand);
    if (isNaN(current) || isNaN(previous)) return '';
    switch (state.operation) {
        case '/':
            result = previous / current;
            break;

        case '+':
            result = previous + current;
            break;

        case '*':
            result = previous * current;
            break;

        case '-':
            result = previous - current;
            break;
    }

    return result.toString();
}

function App() {

    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});

    return (
        <div className='container'>

            <div className='output'>
                <div className='previous'>{previousOperand} {operation}</div>
                <div className='current'>{currentOperand}</div>
            </div>

            <button className='span-two' onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
            <button onClick={() => dispatch({ type: ACTIONS.REMOVE_DIGIT })}>DEL</button>
            <OperationBtn operation='/' dispatch={dispatch} />
            <DigitBtn digit='1' dispatch={dispatch} />
            <DigitBtn digit='2' dispatch={dispatch} />
            <DigitBtn digit='3' dispatch={dispatch} />
            <OperationBtn operation='*' dispatch={dispatch} />
            <DigitBtn digit='4' dispatch={dispatch} />
            <DigitBtn digit='5' dispatch={dispatch} />
            <DigitBtn digit='6' dispatch={dispatch} />
            <OperationBtn operation='+' dispatch={dispatch} />
            <DigitBtn digit='7' dispatch={dispatch} />
            <DigitBtn digit='8' dispatch={dispatch} />
            <DigitBtn digit='9' dispatch={dispatch} />
            <OperationBtn operation='-' dispatch={dispatch} />
            <DigitBtn digit='.' dispatch={dispatch} />
            <DigitBtn digit='0' dispatch={dispatch} />
            <button className='span-two' onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>

        </div>
    )
}

export default App
