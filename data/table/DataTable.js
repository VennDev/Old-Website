"use client";

import $ from "jquery";

const DataTable = async function(id, urlDataTable, columns) {
    id = "#" + id;
    try {
        let columnDefs = [];

        // Add class text-center to all columns
        columnDefs.push({ className: 'text-center', targets: '_all' });

        if (typeof window === "object") {
            $(document).ready(function() {

                // This check maybe the table is already initialized
                if ($.fn.dataTable.isDataTable(id)) {
                    $(id).DataTable().ajax.reload();
                } else {
                    $(id).on('error.dt', function (e, settings, techNote, message ) {
                    }).DataTable({
                        language: {
                            url: "https://cdn.datatables.net/plug-ins/1.10.25/i18n/English.json"
                        },
                        ajax: {
                            url: urlDataTable,
                            dataSrc: '',
                            error: function (xhr, error, code) {
                                console.error(xhr);
                                console.error(error);
                                console.error(code);
                            }
                        },
                        columns: columns,
                        processing: true,
                        serverside: false,
                        columnDefs: columnDefs,
                        lengthMenu: [5, 10, 25, 50],
                    });
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
}

export default DataTable;