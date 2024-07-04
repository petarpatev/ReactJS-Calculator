import { ACTIONS } from "../App";

export default function DigitBtn({ digit, dispatch }) {
    return (
        <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>{digit}</button>
    )
}