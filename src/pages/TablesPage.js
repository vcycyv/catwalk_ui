import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { dataSourceActions } from '../actions';


function TablesPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(dataSourceActions.getDataSources());
    }, [dispatch]);
    return (<div>Tables page placeholder</div>)
}

export { TablesPage }