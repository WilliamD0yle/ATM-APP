import React from 'react';
import { connect } from 'react-redux';
import {
    pinEntry,
    confirmPin,
    withdraw,
    withdrawEntry,
    clearWithdraw,
    clearPin,
    cancel,
    clearError
} from '../../actions/';
import Number from '../Number/';
import logo from './logo.svg';
import './App.css';

const displayString = props => {
    if (props.error) {
        setTimeout(() => {
            props.clearError();
        }, 3000);
        return props.error;
    }
    return props.pin.length > 0
        ? '*'.repeat(props.pin.length)
        : !props.authorised
        ? 'Enter PIN'
        : `Enter withdraw amount: ${props.withdrawAmount}`;
};

export const App = props => (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>React ATM</p>
        </header>
        <div className="atm">
            <div className="display">
                {props.authorised ? (
                    <code className="balance">
                        Current Balance: £{props.balance}
                    </code>
                ) : null}
                <code className="mainDisplay">{displayString(props)}</code>
            </div>
            <div className="inputs">
                <div className="numbers">
                    {Array.from(Array(10), (e, i) => (
                        <Number
                            key={i}
                            value={i}
                            onClick={
                                props.authorised
                                    ? props.withdrawEntry
                                    : props.pinEntry
                            }
                        />
                    ))}
                </div>
                <div className="buttons">
                    <p onClick={props.cancel} className="button cancel">
                        CANCEL
                    </p>
                    <p
                        onClick={
                            props.pin.length > 0
                                ? props.clearPin
                                : props.clearWithdraw
                        }
                        className="button clear"
                    >
                        CLEAR
                    </p>
                    <p
                        onClick={
                            !props.authorised
                                ? () => props.confirmPin(props.pin)
                                : () => props.withdraw(props.withdrawAmount)
                        }
                        className="button enter"
                    >
                        ENTER
                    </p>
                </div>
            </div>
        </div>
    </div>
);

const mapStateToProps = state => ({
    pin: state.ATM.user.pin,
    authorised: state.ATM.user.authorised,
    balance: state.ATM.user.balance,
    withdrawAmount: state.ATM.user.withdrawAmount,
    error: state.ATM.user.error
});

const mapDispatchToProps = dispatch => ({
    pinEntry: e => dispatch(pinEntry(`${e.target.dataset.value}`)),
    confirmPin: pin => dispatch(confirmPin(pin)),
    withdrawEntry: e => dispatch(withdrawEntry(e.target.dataset.value)),
    withdraw: amount => dispatch(withdraw(amount)),
    clearWithdraw: () => dispatch(clearWithdraw()),
    clearPin: () => dispatch(clearPin()),
    cancel: () => dispatch(cancel()),
    clearError: () => dispatch(clearError())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
