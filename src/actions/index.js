export const pinEntry = pin => dispatch => {
    dispatch({
        type: 'PIN_ENTRY',
        payload: pin
    });
};

export const clearPin = () => dispatch => {
    dispatch({
        type: 'PIN_CLEAR'
    });
};

export const confirmPin = pin => async dispatch => {
    await fetch(
        'https://frontend-challenge.screencloud-michael.now.sh/api/pin/',
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ pin })
        }
    )
        .then(response => response.json())
        .then(json => {
            if (!json.error) {
                dispatch({
                    type: 'PIN_CONFIRMED',
                    payload: json.currentBalance
                });
            } else {
                dispatch({
                    type: 'PIN_ERROR',
                    payload: json.error
                });
            }
        });
};

export const withdrawEntry = amount => dispatch => {
    dispatch({
        type: 'WITHDRAW_ENTRY',
        payload: amount
    });
};

export const withdraw = amount => dispatch => {
    dispatch({
        type: 'WITHDRAW_CASH',
        payload: amount
    });
};

export const clearWithdraw = () => dispatch => {
    dispatch({
        type: 'WITHDRAW_CLEAR'
    });
};

export const cancel = () => dispatch => {
    dispatch({
        type: 'CANCEL'
    });
};

export const clearError = () => dispatch => {
    dispatch({
        type: 'CLEAR_ERROR'
    });
};

export const withdrawError = () => dispatch => {
    dispatch({
        type: 'WITHDRAW_ERROR'
    });
};
