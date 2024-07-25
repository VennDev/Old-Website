"use client"

import "datatables.net";
import React, {useEffect, useState} from "react";
import {TableCustom} from "../../sub-components";
import DataTable from "../../data/table/DataTable";
import { useSearchParams } from 'next/navigation';
import {Authentication} from '../../components/auth/Authentication';

const $ = require('jquery');

export default function Table() {
    const searchParams = useSearchParams();
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    const [data, setData] = useState(null);

    useEffect(() => {
        getDataTable(origin).then((res) => {
            setData(res.props.data);
        });
    }, [setData, origin]);

    const replaceInputToSelect = (dataI, id, value, dataSelected) => {
        let select = document.createElement('select');
        select.id = id;
        select.name = id;
        select.className = 'form-control bg-light';
        dataI.forEach((item, index) => {
            let option = document.createElement('option');
            option.value = item[value];
            option.text = item[value];
            if (dataSelected === item[value]) {
                option.selected = true;
            }
            select.appendChild(option);
        });
        return select;
    };

    if (typeof window === "object") {
        $(document).ready(function () {
            window.data = data;
            $('#dialog').hide();
            $(document).on('click', '.search-info-dv-button', function () {
                $('#dialog').show();
                $('#dialog-title').text('Tra Cứu Thông Tin Đơn Vị');
                $('#id').replaceWith(replaceInputToSelect(window.data, 'id', 'MaDonVi', ''));
            });
            $(document).on('click', '.close-alert', function () {
                $('#error').html('');
            });
            $(document).on('submit', '#form-modal', function (e) {
                e.preventDefault();
                const id = $('#id').val();
                window.location.href = `/pages/tracuuthongtindonvi?id=${id}`;
            });
            if (searchParams.has('error')) {
                $('#error').html(`<div class="alert alert-danger" role="alert"><button type="button" class="close-alert mr-10" aria-label="Close"><span class="fs-4" aria-hidden="true">&times;</span></button>${searchParams.get('error')}</div>`);
            }
        });
    }
    return (
        <>
            <div className="dialog-overlay" id="dialog">
                <div className="dialog">
                    <div className="dialog-header">
                        <h3 id="dialog-title"></h3>
                        <button className="btn btn-danger" onClick={() => $('#dialog').hide()}>&times;</button>
                    </div>
                    <form id="form-modal" method="post">
                        <div className="form-group">
                            <label htmlFor="id">Mã đơn vị ▼</label>
                            <input type="text" className="form-control" id="id" name="id" required/>
                        </div>
                        <button type="submit" className="btn btn-primary">Tra Cứu</button>
                    </form>
                </div>
            </div>
            <div id="error"></div>
            <button type="button" className="btn btn-success mt-4 ml-10 search-info-dv-button">Tra cứu thông tin đơn vị</button>
        </>
    )
}

async function getDataTable(hostname) {
    const data = await fetch(`${hostname}/api/donvisohuu/select?id=MaDonVi`).then((res) => res.json());
    return {
        props: {
            data: data
        },
    };
}