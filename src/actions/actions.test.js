import * as actions from './';

describe('actions', () => {
    it('should create an action to add pin to the store', async () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        await actions.pinEntry('1111')(dispatch, getState);
        expect(dispatch).toBeCalledWith({ type: 'PIN_ENTRY', payload: '1111' });
    });

    it('should create an action to clear the pin from the store', async () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        await actions.clearPin()(dispatch, getState);
        expect(dispatch).toBeCalledWith({ type: 'PIN_CLEAR' });
    });

    it('should create an action to add a withdraw amount', async () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        await actions.withdrawEntry('100')(dispatch, getState);
        expect(dispatch).toBeCalledWith({
            type: 'WITHDRAW_ENTRY',
            payload: '100'
        });
    });

    it('should create an action to clear withdraw amount', async () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        await actions.clearWithdraw()(dispatch, getState);
        expect(dispatch).toBeCalledWith({
            type: 'WITHDRAW_CLEAR'
        });
    });

    it('should create an action to cancel all actions', async () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        await actions.cancel()(dispatch, getState);
        expect(dispatch).toBeCalledWith({
            type: 'CANCEL'
        });
    });

    it('should create an action to clear an error message', async () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        await actions.clearError()(dispatch, getState);
        expect(dispatch).toBeCalledWith({
            type: 'CLEAR_ERROR'
        });
    });
});
