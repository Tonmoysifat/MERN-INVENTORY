import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import SaleReport from "../../components/report/SaleReport.jsx";

const SaleReportPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <SaleReport/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default SaleReportPage;