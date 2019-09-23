import reducer from './atm';
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

describe('Atm reducer tests', () => {
    it('returns the initial state', () => {
        expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('Adds the pin to the store', () => {
        expect(
            reducer(INITIAL_STATE, {
                type: 'PIN_ENTRY',
                payload: '1111'
            })
        ).toEqual({
            ...INITIAL_STATE,
            user: { ...INITIAL_STATE.user, pin: '1111' }
        });
    });

    it('Pin confirmed and the balance returned from the api', () => {
        expect(
            reducer(INITIAL_STATE, {
                type: 'PIN_CONFIRMED',
                payload: 220
            })
        ).toEqual({
            ...INITIAL_STATE,
            user: {
                ...INITIAL_STATE.user,
                authorised: true,
                balance: 220,
                pin: ''
            }
        });
    });

    it('Clear the pin from the store', () => {
        expect(
            reducer(INITIAL_STATE, {
                type: 'PIN_CLEAR'
            })
        ).toEqual({
            ...INITIAL_STATE,
            user: {
                ...INITIAL_STATE.user,
                pin: ''
            }
        });
    });

    it('Error entering the pin', () => {
        expect(
            reducer(INITIAL_STATE, {
                type: 'PIN_ERROR',
                payload: 'some kind of error message'
            })
        ).toEqual({
            ...INITIAL_STATE,
            user: {
                ...INITIAL_STATE.user,
                error: 'some kind of error message'
            }
        });
    });

    it('Entering the withdraw amount', () => {
        expect(
            reducer(INITIAL_STATE, {
                type: 'WITHDRAW_ENTRY',
                payload: 20
            })
        ).toEqual({
            ...INITIAL_STATE,
            user: {
                ...INITIAL_STATE.user,
                withdrawAmount: '20'
            }
        });
    });

    it('Reduce the balance and available notes when withdrawing cash', () => {
        expect(
            reducer(
                {
                    ...INITIAL_STATE,
                    user: {
                        ...INITIAL_STATE.user,
                        withdrawAmount: 20,
                        balance: 220
                    }
                },
                {
                    type: 'WITHDRAW_CASH'
                }
            )
        ).toEqual({
            ...INITIAL_STATE,
            cash: {
                ...INITIAL_STATE.cash,
                tens: {
                    amount: 13,
                    value: 10
                }
            },
            user: {
                ...INITIAL_STATE.user,
                balance: 200
            }
        });
    });

    it('Clear the withdraw amount', () => {
        expect(
            reducer(
                {
                    ...INITIAL_STATE,
                    user: { ...INITIAL_STATE.user, withdrawAmount: 20 }
                },
                {
                    type: 'WITHDRAW_CLEAR'
                }
            )
        ).toEqual({
            ...INITIAL_STATE,
            user: {
                ...INITIAL_STATE.user,
                withdrawAmount: 0
            }
        });
    });

    it('Remove error message', () => {
        expect(
            reducer(
                {
                    ...INITIAL_STATE,
                    user: { ...INITIAL_STATE.user, error: 'some error message' }
                },
                {
                    type: 'CLEAR_ERROR'
                }
            )
        ).toEqual({
            ...INITIAL_STATE,
            user: {
                ...INITIAL_STATE.user,
                error: ''
            }
        });
    });

    it('Cancel the withdrawls and return to the pin extry screen', () => {
        expect(
            reducer(
                {
                    ...INITIAL_STATE,
                    user: {
                        authorised: true,
                        balance: 220,
                        pin: '',
                        error: '',
                        withdrawAmount: '30'
                    }
                },
                {
                    type: 'CANCEL'
                }
            )
        ).toEqual(INITIAL_STATE);
    });
});
