//dataSources is an array of {drawerId, drawerName, Name}
export const getDataCascader = dataSources => {
    let rtnVal = [];
    let drawers = [];
    if (dataSources.items !== undefined) {
        dataSources.items.forEach(dataSource => {
            if (!drawers.includes(dataSource.drawerName)) {
                drawers.push(dataSource.drawerName);
            }
        });
        drawers.forEach(drawer => {
            let tables = []; //elements are in form of {value, label}
            dataSources.items.forEach(dataSource => {
                if (dataSource.drawerName === drawer) {
                    let filteredTables = tables.filter(table => table.value === dataSource.id)
                    if (filteredTables.length === 0) {
                        tables.push({ "value": dataSource.id, "label": dataSource.name })
                    }
                }
            });
            rtnVal.push({ "value": drawer, "label": drawer, "children": tables })
        })
    }
    return rtnVal;
}