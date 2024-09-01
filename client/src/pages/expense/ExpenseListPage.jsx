import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import ExpenseList from "../../components/expense/ExpenseList.jsx";

const ExpenseListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ExpenseList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};
export default ExpenseListPage;