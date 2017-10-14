import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import Header from './Header';
import Invoices from './Invoices/Component';
import InvoiceEdit from './Invoices/InvoiceEdit';
import Products from './Products';
import Customers from './Customers';
import CustomModal from './Modals/CustomModal';
import DialogModal from './Modals/DialogModal';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCustomModal: false,
            showDialogModal: false,
            modalData: null
        };
        this.customModalHandler = this.customModalHandler.bind(this);
        this.dialogModalHandler = this.dialogModalHandler.bind(this);
    }

    customModalHandler(data) {
        this.setState(prevState => ({
            showCustomModal: !prevState.showCustomModal,
            modalData: data
        }));
    }

    dialogModalHandler(data) {
        this.setState(prevState => ({
            showDialogModal: !prevState.showDialogModal,
            modalData: data
        }));
    }

    render() {
        const { showCustomModal, showDialogModal, modalData } = this.state;
        return (
            <div>
                <Header />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={props => <Invoices dialogModalHandler={this.dialogModalHandler} />}
                    />
                    <Route exact path="/invoices/:invoiceId/edit" component={InvoiceEdit} />
                    <Route
                        exact
                        path="/products"
                        render={props => (
                            <Products
                                customModalHandler={this.customModalHandler}
                                dialogModalHandler={this.dialogModalHandler}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/customers"
                        render={props => (
                            <Customers
                                customModalHandler={this.customModalHandler}
                                dialogModalHandler={this.dialogModalHandler}
                            />
                        )}
                    />
                </Switch>
                {showCustomModal && (
                    <CustomModal
                        modalData={modalData}
                        customModalHandler={this.customModalHandler}
                    />
                )}
                {showDialogModal && (
                    <DialogModal
                        modalData={modalData}
                        dialogModalHandler={this.dialogModalHandler}
                    />
                )}
            </div>
        );
    }
}

export default App;
