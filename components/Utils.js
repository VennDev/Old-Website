function removeFinalColumn(table) {
    const rows = Array.from(table.getElementsByTagName('tr'));
    rows.forEach(row => {
        const cells = Array.from(row.getElementsByTagName('td'));
        const lastCellIndex = cells.length - 1;
        row.deleteCell(lastCellIndex);
    });
}

const getTableRFC = (id) => {
    const originalTable = document.getElementById(id);
    const cloneTable = originalTable.cloneNode(true);
    removeFinalColumn(cloneTable);
    document.body.appendChild(cloneTable);

    return cloneTable;
}

export { getTableRFC };