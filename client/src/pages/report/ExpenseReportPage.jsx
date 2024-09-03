import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import ExpenseReport from "../../components/report/ExpenseReport.jsx";

const ExpenseReportPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ExpenseReport/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ExpenseReportPage;