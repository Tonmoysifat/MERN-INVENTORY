import React, {Fragment, useEffect} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import store from "../../redux/store/Store.js";
import {IsEmpty} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import {
    CreateExpenseRequest,
    ExpenseDetailsByIdRequest,
    ExpenseDropDownRequest
} from "../../apiRequest/ExpenseApiRequest.js";
import {setExpenseFormValue, setExpenseFormValueReset} from "../../redux/sate-slice/Expense-slice.js";

const ExpenseCreateUpdate = () => {
    let FormValue = useSelector((state) => (state.expense.FormValue));
    let DropDownValue = useSelector((state) => (state.expense.DropDown));
    let navigate = useNavigate();
    let params = new URLSearchParams(window.location.search)
    let id = params.get("id")
    useEffect(() => {
        (async () => {
            await ExpenseDropDownRequest()
        })()
        if (id !== null) {
            (async () => {
                await ExpenseDetailsByIdRequest(id);
                // await ExpenseDropDownRequest()
            })()
        } else {
            store.dispatch(setExpenseFormValueReset())
        }
    }, [id]);
    const SaveChange = async () => {
        if (IsEmpty(FormValue.TypeID)) {
            toast.error("Expense Type Required!")
        } else if (FormValue.Amount === 0) {
            toast.error("Expense Amount Required!")
        } else {
            if (await CreateExpenseRequest(FormValue, id)) {
                navigate("/expense-list")
            }
        }
    }
    return (

        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <h5>Save Expense</h5>
                                    <hr className="bg-light"/>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Expense Type</label>
                                        <select onChange={(e) => {
                                            store.dispatch(setExpenseFormValue({
                                                fieldName: "TypeID",
                                                value: e.target.value
                                            }))
                                        }} value={FormValue.TypeID} className="form-select form-select-sm">
                                            <option value="">Select Type</option>
                                            {
                                                DropDownValue.map((item, i) => {
                                                    return (<option key={i.toLocaleString()}
                                                                    value={item._id}>{item.Name}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Expense Amount</label>
                                        <input onChange={(e) => {
                                            store.dispatch(setExpenseFormValue({
                                                fieldName: "Amount",
                                                value: e.target.value
                                            }))
                                        }} className="form-control form-control-sm"
                                               value={FormValue["Amount"]} type="number"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Expense Note</label>
                                        <input onChange={(e) => {
                                            store.dispatch(setExpenseFormValue({
                                                fieldName: "Note",
                                                value: e.target.value
                                            }))
                                        }} className="form-control form-control-sm"
                                               value={FormValue["Note"]} type="text"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={SaveChange} className="btn btn-sm my-3 btn-success">Save
                                            Change
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default ExpenseCreateUpdate;