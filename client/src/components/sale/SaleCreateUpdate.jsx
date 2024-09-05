import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux";
import { CreateSaleRequest, CustomerDropDownRequest, ProductDropDownRequest } from "../../apiRequest/SaleApiRequest.js";
import { IsEmpty } from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import store from "../../redux/store/Store.js";
import { RemoveSaleItem, setSaleFormValue, setSaleItemList } from "../../redux/sate-slice/Sale-slice.js";
import { useNavigate } from "react-router-dom";
import { BsCartCheck, BsTrash } from "react-icons/bs";

const SaleCreateUpdate = () => {
    const [grandTotal, setGrandTotal] = useState(0);
    const productRef = useRef();
    const qtyRef = useRef();
    const unitPriceRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await CustomerDropDownRequest();
            await ProductDropDownRequest();
        })();
    }, []);

    const CustomerDropDown = useSelector((state) => (state.sale.CustomerDropDown));
    const ProductDropDown = useSelector((state) => (state.sale.ProductDropDown));
    const SaleItemList = useSelector((state) => (state.sale.SaleItemList));
    const SaleFormValue = useSelector((state) => (state.sale.FormValue));

    const calculateGrandTotal = () => {
        const vatTax = parseFloat(SaleFormValue.VatTax) || 0;
        const discount = parseFloat(SaleFormValue.Discount) || 0;
        const otherCost = parseFloat(SaleFormValue.OtherCost) || 0;
        const shippingCost = parseFloat(SaleFormValue.ShippingCost) || 0;

        const itemTotal = SaleItemList.reduce((sum, item) => sum + item.Total, 0);
        const total = itemTotal + vatTax + otherCost + shippingCost - discount;

        setGrandTotal(total);

        store.dispatch(setSaleFormValue({
            fieldName: "GrandTotal",
            value: total
        }));
    };

    useEffect(() => {
        calculateGrandTotal();
    }, [SaleItemList, SaleFormValue.VatTax, SaleFormValue.Discount, SaleFormValue.OtherCost, SaleFormValue.ShippingCost]);

    const OnAddCart = () => {
        const productValue = productRef.current.value;
        const productName = productRef.current.selectedOptions[0].text;
        const qtyValue = qtyRef.current.value;
        const unitPriceValue = unitPriceRef.current.value;

        if (IsEmpty(productValue)) {
            toast.error("Select Product");
        } else if (IsEmpty(qtyValue)) {
            toast.error("Quantity Required");
        } else if (IsEmpty(unitPriceValue)) {
            toast.error("Unit Price Required");
        } else {
            const item = {
                "ProductID": productValue,
                "ProductName": productName,
                "Quantity": parseInt(qtyValue),
                "UnitCost": parseFloat(unitPriceValue),
                "Total": parseInt(qtyValue) * parseFloat(unitPriceValue)
            };
            store.dispatch(setSaleItemList(item));
        }
    };

    const removeCart = (i) => {
        store.dispatch(RemoveSaleItem(i));
    };

    const CreateNewSale = async () => {
        if (IsEmpty(SaleFormValue.CustomerID)) {
            toast.error("Select Customer");
        } else if (IsEmpty(SaleFormValue.VatTax)) {
            toast.error("VatTax Required");
        } else if (IsEmpty(SaleFormValue.Discount)) {
            toast.error("Discount Required");
        } else if (IsEmpty(SaleFormValue.OtherCost)) {
            toast.error("OtherCost Required");
        } else if (IsEmpty(SaleFormValue.ShippingCost)) {
            toast.error("ShippingCost Required");
        } else if (SaleItemList.length === 0) {
            toast.error("Product Information Required");
        } else {
            if (await CreateSaleRequest(SaleFormValue, SaleItemList)) {
                navigate("/sale-list");
            }
        }
    };

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-4 col-lg-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row">
                                    <h5>Create Sales</h5>
                                    <hr className="bg-light" />
                                    <div className="col-12 p-1">
                                        <label className="form-label">Customer</label>
                                        <select onChange={(e) => {
                                            store.dispatch(setSaleFormValue({
                                                fieldName: "CustomerID",
                                                value: e.target.value
                                            }));
                                        }} className="form-select form-select-sm">
                                            <option value="">Select Customer</option>
                                            {
                                                CustomerDropDown.map((item, i) => (
                                                    <option key={i.toLocaleString()}
                                                            value={item._id}>{item.CustomerName}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Vat/Tax</label>
                                        <input onChange={(e) => {
                                            store.dispatch(setSaleFormValue({
                                                fieldName: "VatTax",
                                                value: e.target.value
                                            }));
                                        }} className="form-control form-control-sm" type="number" />
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Discount</label>
                                        <input onChange={(e) => {
                                            store.dispatch(setSaleFormValue({
                                                fieldName: "Discount",
                                                value: e.target.value
                                            }));
                                        }} className="form-control form-control-sm" type="number" />
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Other Cost</label>
                                        <input onChange={(e) => {
                                            store.dispatch(setSaleFormValue({
                                                fieldName: "OtherCost",
                                                value: e.target.value
                                            }));
                                        }} className="form-control form-control-sm" type="number" />
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Shipping Cost</label>
                                        <input onChange={(e) => {
                                            store.dispatch(setSaleFormValue({
                                                fieldName: "ShippingCost",
                                                value: e.target.value
                                            }));
                                        }} className="form-control form-control-sm" type="number" />
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Grand Total</label>
                                        <input value={grandTotal} readOnly className="form-control form-control-sm" type="number" />
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Note</label>
                                        <input onChange={(e) => {
                                            store.dispatch(setSaleFormValue({ fieldName: "Note", value: e.target.value }));
                                        }} className="form-control form-control-sm" type="text" />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={CreateNewSale} className="btn btn-sm my-3 btn-success">Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 col-lg-8 mb-3">
                        <div className="card  h-100">
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-6  p-1">
                                        <label className="form-label">Select Product</label>
                                        <select ref={productRef} className="form-select form-select-sm">
                                            <option value="">Select Product</option>
                                            {
                                                ProductDropDown.map((item, i) => (
                                                    <option key={i.toLocaleString()}
                                                            value={item._id}>{item.Name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="col-2 p-1">
                                        <label className="form-label">Qty</label>
                                        <input ref={qtyRef} className="form-control form-control-sm" />
                                    </div>
                                    <div className="col-2 p-1">
                                        <label className="form-label">Unit Price</label>
                                        <input ref={unitPriceRef} className="form-control form-control-sm" />
                                    </div>
                                    <div className="col-2 p-1">
                                        <label className="form-label">Add to cart</label>
                                        <button onClick={OnAddCart} className="btn w-100 btn-sm btn-success"><BsCartCheck /></button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 overflow-scroll p-0 m-0">
                                        <table className="table">
                                            <thead className="sticky-top bg-white">
                                            <tr>
                                                <td>Name</td>
                                                <td>Qty</td>
                                                <td>Unit Price</td>
                                                <td>Total</td>
                                                <td>Remove</td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                SaleItemList.map((item, i) => (
                                                    <tr key={i.toLocaleString()}>
                                                        <td>{item.ProductName}</td>
                                                        <td>{item.Quantity}</td>
                                                        <td>{item.UnitCost}</td>
                                                        <td>{item.Total}</td>
                                                        <td><button onClick={() => removeCart(i)} className="btn btn-outline-light text-danger p-2 mb-0 btn-sm"><BsTrash /></button></td>
                                                    </tr>
                                                ))
                                            }
                                            </tbody>
                                        </table>
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

export default SaleCreateUpdate;
