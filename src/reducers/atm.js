const INITIAL_STATE = {
    cash: {
        fives: {
            amount: 4,
            value: 5
        },
        tens: {
            amount: 15,
            value: 10
        },
        twenties: {
            amount: 7,
            value: 20
        }
    },
    user: {
        authorised: false,
        balance: null,
        pin: '',
        error: '',
        withdrawAmount: ''
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PIN_ENTRY':
            return {
                ...state,
                user: {
                    ...state.user,
                    pin: state.user.pin.concat(action.payload)
                }
            };

        case 'PIN_CONFIRMED':
            return {
                ...state,
                user: {
                    ...state.user,
                    authorised: true,
                    balance: action.payload,
                    pin: ''
                }
            };

        case 'PIN_CLEAR':
            return { ...state, user: { ...state.user, pin: '' } };

        case 'PIN_ERROR':
            return {
                ...state,
                user: { ...state.user, error: action.payload, pin: '' }
            };

        case 'WITHDRAW_ENTRY':
            return {
                ...state,
                user: {
                    ...state.user,
                    withdrawAmount: state.user.withdrawAmount.concat(
                        action.payload
                    )
                }
            };

        case 'WITHDRAW_CASH':
            // hack copy of the state a normal copy causes side effects
            let cash = JSON.parse(JSON.stringify(state.cash)),
                dispensed = 0;

            while (dispensed !== Number(state.user.withdrawAmount)) {
                // note with the most available
                let key = Object.keys(cash).reduce((a, b) =>
                    cash[a].amount > cash[b].amount ? a : b
                );
                dispensed += cash[key].value;
                cash[key].amount--;

                if (dispensed > state.user.withdrawAmount) {
                    dispensed -= cash[key].value;
                    cash[key].amount++;
                    let remaining = state.user.withdrawAmount - dispensed;

                    if (remaining === cash.tens.value && cash.tens.amount > 0) {
                        dispensed += cash.tens.value;
                        cash.tens.amount--;
                    } else if (
                        remaining === cash.fives.value &&
                        cash.fives.amount > 0
                    ) {
                        dispensed += cash.fives.value;
                        cash.fives.amount--;
                    } else {
                        return {
                            ...state,
                            user: {
                                ...state.user,
                                error: 'Amount not available'
                            }
                        };
                    }
                }
            }

            return {
                ...state,
                cash,
                user: {
                    ...state.user,
                    balance: state.user.balance - state.user.withdrawAmount,
                    withdrawAmount: ''
                }
            };

        case 'WITHDRAW_CLEAR':
            return { ...state, user: { ...state.user, withdrawAmount: 0 } };

        case 'CLEAR_ERROR':
            return { ...state, user: { ...state.user, error: '' } };

        case 'CANCEL':
            return INITIAL_STATE;

        default:
            return state;
    }
};
