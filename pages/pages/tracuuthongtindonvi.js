// import node module libraries
import {Col, Row, Container, Card} from 'react-bootstrap';
import { useSearchParams } from 'next/navigation';

// import widget as custom components
import { PageHeading } from 'widgets'

// import sub components
import {
    AboutMe, TableCustom
} from 'sub-components'
import $ from "jquery";
import React, {useEffect, useState} from "react";
import DataTable from "../../data/table/DataTable";
import {useRouter} from "next/router";

const TraCuuThongTinDonVi = () => {
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    const searchParams = useSearchParams();
    const [dataA, setDataA] = useState(null);
    const [dataB, setDataB] = useState(null);
    const [dataC, setDataC] = useState(null);

    useEffect(() => {
        if (searchParams.has('id')) {
            getDataTable(origin, searchParams.get('id')).then((res) => {
                setDataA(res.props.dataA);
                setDataB(res.props.dataB);
                setDataC(res.props.dataC);
            });
        }
    }, [setDataA, setDataB, setDataC, origin, searchParams]);

    if (typeof window === "object") {
        window.dataA = dataA;
        window.dataB = dataB;
        window.dataC = dataC;
        window.origin = origin;
        $(document).ready(function () {
            $('#dialog').hide();
            $(document).on('click', '.details-button', async function () {
                const data = await fetch(`${window.origin}/api/loaitaisan/selectOnly?id=MaLoaiTaiSan&value=${$(this).closest('tr').find('td:eq(4)').text()}`).then((res) => res.json());
                $('#dialog').show();
                $('#id').val(data[0]["MaLoaiTaiSan"]);
                $('#name').val(data[0]["TenLoaiTaiSan"]);
                $('#info').val(data[0]["ChiTiet"]);
                $('#guide').val(data[0]["DuongDanMoTa"]);
                $('#dialog-title').text('Chi Tiết Tài Sản');
            });
            if (window.dataA) {
                $('#MoTa').text(dataA[0].MoTa);
                $('#TenDonVi').text(dataA[0].TenDonVi);
                $('#ChuDonVi').text(dataA[0].ChuDonVi);
                $('#DiaChi').text(dataA[0].DiaChi);
                $('#SoDienThoai').text(dataA[0].SDT);
            }
            if (window.dataC) {
                $('#TongGiaTriTaiSan').text(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataC[0].total));
            }
            if (window.dataB) {
                $('#TongTaiSan').text(dataB.length);
            }
        });
    }

    TableCustom("table-a", dataB, {
        "Mã tài sản": (value, data, index) => `<td>${value}</td>`,
        "Tên tài sản": (value, data, index) => `<td>${value}</td>`,
        "Giá trị": function(value, data, index) {
            let dataN = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
            return `<td>${dataN}</td>`;
        },
        "Ngày kiểm kê": (value, data, index) => `<td>${value}</td>`,
        "Mã loại tài sản": (value, data, index) => `<td>${value}</td>`,
        "Mã đơn vị": (value, data, index) => `<td>${value}</td>`,
        "": function(value, data, index) {
            return `<td></form> <button type="button" class="btn btn-primary details-button">Thông tin thêm</button></td>`;
        }
    });

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
                            <label htmlFor="id">Mã loại tài sản</label>
                            <input type="text" className="form-control" id="id" name="id" readOnly={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Tên loại tài sản</label>
                            <input type="text" className="form-control" id="name" name="name" readOnly={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="info">Chi tiết tài sản</label>
                            <textarea id="info" name="info" form="form-modal" className="form-control" readOnly={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="info">Đường dẫn mô tả</label>
                            <input type="url" className="form-control" id="guide" name="guide" readOnly={true}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Thoát</button>
                    </form>
                </div>
            </div>
            <Container fluid className="p-6">
                {/* Page Heading */}
                <PageHeading heading={"Tra Cứu Thông Tin Đơn Vị: "} value={searchParams.get('id')} />

                {/* content */}
                <div className="py-1">
                    <Row>
                        {/* About */}
                        <Col xl={5} lg={12} md={12} xs={12} className="mb-6">
                            {/* card */}
                            <Card>
                                {/* card body */}
                                <Card.Body>
                                    {/* card title */}
                                    <Card.Title>Thông Tin Đơn Vị</Card.Title>
                                    <span className="text-uppercase fw-medium text-dark fs-5 ls-2">Mô tả</span>
                                    <p className="mt-2 mb-6" id="MoTa">loading...</p>
                                    <Row>
                                        <Col xs={12} className="mb-5">
                                            <h6 className="text-uppercase fs-5 ls-2">Tên Đơn Vị</h6>
                                            <p className="mb-0" id="TenDonVi">loading...</p>
                                        </Col>
                                        <Col xs={6} className="mb-5">
                                            <h6 className="text-uppercase fs-5 ls-2">Chủ Đơn Vị </h6>
                                            <p className="mb-0" id="ChuDonVi">loading...</p>
                                        </Col>
                                        <Col xs={6} className="mb-5">
                                            <h6 className="text-uppercase fs-5 ls-2">Địa Chỉ </h6>
                                            <p className="mb-0" id="DiaChi">loading...</p>
                                        </Col>
                                        <Col xs={6}>
                                            <h6 className="text-uppercase fs-5 ls-2">Số Điện Thoại </h6>
                                            <p className="mb-0" id="SoDienThoai">loading...</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        {/* About */}
                        <Col xl={5} lg={12} md={12} xs={12} className="mb-12">
                            {/* card */}
                            <Card>
                                {/* card body */}
                                <Card.Body>
                                    {/* card title */}
                                    <Card.Title>Các Thống Kê Cho Đơn Vị</Card.Title>
                                    <Row>
                                        <Col xs={12} className="mb-5">
                                            <h6 className="text-uppercase fs-5 ls-2">Tổng số tài sản hiện có </h6>
                                            <p className="mb-0" id="TongTaiSan">loading...</p>
                                        </Col>
                                        <Col xs={6} className="mb-5">
                                            <h6 className="text-uppercase fs-5 ls-2">Tổng giá trị tài sản </h6>
                                            <p className="mb-0" id="TongGiaTriTaiSan">loading...</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>

                {/* content */}
                <div className="py-6">
                    <Row>
                        {/* About */}
                        <Col xl={10} lg={12} md={12} xs={12} className="mb-6">
                            {/* card */}
                            <Card>
                                {/* card body */}
                                <Card.Body>
                                    {/* card title */}
                                    <Card.Title>Danh Sách Tài Sản</Card.Title>
                                    {
                                        DataTable("table-a", [
                                            'Mã tài sản',
                                            'Tên tài sản',
                                            'Giá trị',
                                            'Ngày kiểm kê',
                                            'Mã loại tài sản',
                                            'Mã đơn vị',
                                            ''
                                        ])
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>

            </Container>
        </>
    )
}

async function getDataTable(hostname, value) {
    const dataA = await fetch(`${hostname}/api/donvisohuu/selectOnly?id=MaDonVi&value=${value}`).then((res) => res.json());
    const dataB = await fetch(`${hostname}/api/taisan/selectOnly?id=MaDonVi&value=${value}`).then((res) => res.json());
    const dataC = await fetch(`${hostname}/api/taisan/select?id=SUM(GiaTri) as total&value=MaDonVi = "${value}"`).then((res) => res.json());
    return {
        props: {
            dataA: dataA,
            dataB: dataB,
            dataC: dataC
        },
    };
}

export default TraCuuThongTinDonVi