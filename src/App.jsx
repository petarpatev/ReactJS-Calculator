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
            return {
                ...state,
                currentOperand: `${state.currentOperand || ''}${payload.digit}`
            }

        case ACTIONS.CLEAR:
            return {};

        case ACTIONS.CHOOSE_OPERATION:
            return {
                ...state,
                currentOperand: '',
                previousOperand: `${state.currentOperand} ${payload.operation}`
            }
    }
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
            <button>DEL</button>
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
            <button className='span-two'>=</button>

        </div>
    )
}

export default App
