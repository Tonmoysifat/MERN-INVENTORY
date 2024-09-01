import React, {Fragment} from 'react';
import {useSelector} from "react-redux";

const FullScreenLoader = () => {
    const setting = useSelector((state)=> state.setting.loader)
    return (
        <Fragment>
            <div  className={setting + " LoadingOverlay"}>
                <div className="Line-Progress">
                    <div className="indeterminate"/>
                </div>
            </div>
        </Fragment>
    );
};

export default FullScreenLoader;