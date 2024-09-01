import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import ExpenseTypeList from "../../components/expenseType/ExpenseTypeList.jsx";

const ExpenseTypeListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ExpenseTypeList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};
export default ExpenseTypeListPage;