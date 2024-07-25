"use client"

import "datatables.net";
import React, {useCallback, useEffect, useState} from "react";
import DataTable from "../../data/table/DataTable";
import {useSearchParams} from 'next/navigation';
import {getTableRFC} from "../../components/Utils";

import {getTokenCookie, verifyToken} from "../../components/server/server-helpers";
import {StatRightTopIcon} from "../../widgets";
import {Col} from "react-bootstrap";
import {CurrencyBitcoin, Gem, People, Person} from "react-bootstrap-icons";

const $ = require('jquery');

const idTable = "table";

export default function Table(callback, deps) {
    const searchParams = useSearchParams();
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    const [idUser, setIdUser] = useState(null);

    // Copy value in input id code
    const copyText = () => {
        console.log('copy');
        let copyText = document.getElementById("code");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        alert("Copied the text: " + copyText.value);
    };

    const loadData = useCallback(async () => {
        try {
            const token = getTokenCookie();
            const data = verifyToken(token);

            setIdUser(data.id);

            await getData(origin, data.id).then((res) => {
                const code = document.getElementById('code');
                if (code && res.props.codeScript) {
                    code.value = res.props.codeScript;
                }
            });

            return data.id;
        } catch (error) {
            console.log(error);
            return null;
        }
    }, [origin, setIdUser]);

    const loadTable = useCallback(async (id) => {
        if (id !== null) {
            const urlDataTable = '/api/accounts/getListById?id=' + id;
            await DataTable(idTable, urlDataTable, [
                {data: "Player Name"},
                {data: "Level"},
                {data: "Gold"},
                {data: "Gems"},
                {data: "Options"},
                {data: "Trait Crystal", className: 'hidden'},
                {data: "Star Rift Blue", className: 'hidden'},
                {data: "Star Rift Rainbow", className: 'hidden'},
                {data: "Star Rift Green", className: 'hidden'},
                {data: "Star Rift Red", className: 'hidden'},
                {data: "Star Rift Yellow", className: 'hidden'},
                {data: "Star Rift Purple", className: 'hidden'},
                {data: "Raid Sharp Yellow", className: 'hidden'},
                {data: "Raid Sharpred", className: 'hidden'},
                {data: "Risky Dice", className: 'hidden'}
            ]);
        }

        return true;
    }, []);

    const deletePlayer = useCallback(async (id) => {
        try {
            const token = getTokenCookie();
            const data = verifyToken(token);
            const response = await fetch(`${origin}/api/players/delete?id=` + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.status === 200) {
                const table = document.getElementById(idTable);
                const row = table.rows;
                for (let i = 1; i < row.length; i++) {
                    if (row[i].cells[0].innerText === id) {
                        table.deleteRow(i);
                        break;
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }, [origin]);

    useEffect(() => {
        loadData().then(r => r);
        loadTable(idUser).then(r => r);

        // This is interval to reload table
        setInterval(() => {
            if (typeof window !== 'undefined' && idUser !== null) {
                loadTable(idUser).then(r => r);

                // Get total value
                let url = '/api/players/getTotalStats?id=' + idUser;
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(response => response.json()).then(data => {
                    data = data[0];
                    try {
                        $('#gold-total-stats-top-icon').html(data.total_gold);
                        $('#gems-total-stats-top-icon').html(data.total_gems);
                        $('#trait-crystal-total-stats-top-icon').html(data.total_trait_crystal);
                        $('#raid-sharp-yellow-total-stats-top-icon').html(data.total_raid_sharp_yellow);
                        $('#raid-sharp-red-total-stats-top-icon').html(data.total_raid_sharpred);
                        $('#risky-dice-total-stats-top-icon').html(data.total_risky_dice);
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
        }, 30000);
    }, [idUser, loadData, loadTable]);

    if (typeof window === "object") {
        $(document).ready(function () {
            $(document).on('click', '.create-button', function () {
                $('#dialogA').show();
                $('#id').val('');
                $('#dialog-title').text('Add new');
                $('#form-modal').attr('action', '/api/players/create');
            });
            $(document).on('click', '.close-alert', function () {
                $('#error').html('');
                $('#success').html('');
            });
            $(document).on('click', '.excel-button', function () {
                if (typeof window === "object") {
                    import('@linways/table-to-excel').then((myPackage) => {
                        const myPackageInstance = myPackage.default;
                        myPackageInstance.convert(getTableRFC('table'), {
                            name: Date.now() + '_jgst.xlsx',
                            sheet: {
                                name: 'Sheet 1'
                            }
                        });
                    }).catch((error) => {
                        console.error('Import failed:', error);
                    });
                }
            });
            $(document).on('click', '.delete-btn', function () {
                let id = $(this).data('id');
                deletePlayer(id).then(r => r);
            });
            $(document).on('click', '.refresh-button', function () {
                // refresh page
                window.location.href = '/tables/AnimeDefenders';
            });
            // Events click at column for details
            $(document).on('click', '.details-player', function () {
                let table = document.getElementById(idTable);
                let row = table.rows[$(this).closest('tr').index() + 1];
                let cells = row.cells;
                $('#d_player_name').val(cells[0].innerText);
                $('#d_level').val(cells[1].innerText);
                $('#d_gold').val(cells[2].innerText);
                $('#d_gems').val(cells[3].innerText);
                $('#d_trait_crystal').val(cells[5].innerText);
                $('#d_star_rift_blue').val(cells[6].innerText);
                $('#d_star_rift_rainbow').val(cells[7].innerText);
                $('#d_star_rift_green').val(cells[8].innerText);
                $('#d_star_rift_red').val(cells[9].innerText);
                $('#d_star_rift_yellow').val(cells[10].innerText);
                $('#d_star_rift_purple').val(cells[11].innerText);
                $('#d_raid_sharp_yellow').val(cells[12].innerText);
                $('#d_raid_sharpred').val(cells[13].innerText);
                $('#d_risky_dice').val(cells[14].innerText);
                $('#dialogB').show();
            });
            if (searchParams.has('error')) {
                $('#error').html(`<div class="alert alert-danger" role="alert"><button type="button" class="close-alert mr-10" aria-label="Close"><span class="fs-4" aria-hidden="true">&times;</span></button>${searchParams.get('error')}</div>`);
            }
            if (searchParams.has('success')) {
                $('#success').html(`<div class="alert alert-success" role="alert"><button type="button" class="close-alert mr-10" aria-label="Close"><span class="fs-4" aria-hidden="true">&times;</span></button>${searchParams.get('success')}</div>`);
            }
        });
    }

    const statsUserA = [
        {
            id: "gold-total",
            title: "<div class='text-yellow-400'>Gold</div>",
            value: 0,
            icon: <CurrencyBitcoin size={18} className="text-yellow-400"/>,
            statInfo: '<span class="text-white me-2"></span>'
        },
        {
            id: "gems-total",
            title: "<div class='text-purple-400'>Gems</div>",
            value: 0,
            icon: <Gem size={18} className="text-purple-400"/>,
            statInfo: '<span class="text-white me-2"></span>'
        },
        {
            id: "trait-crystal-total",
            title: "<div class='text-blue-400'>Trait Crystal</div>",
            value: 0,
            icon: <Gem size={18} className="text-blue-400"/>,
            statInfo: '<span class="text-white me-2"></span>'
        }
    ];

    const statsUserB = [
        {
            id: "raid-sharp-yellow-total",
            title: "<div class='text-yellow-300'>Raid Sharp Yellow</div>",
            value: 0,
            icon: <Gem size={18} className="text-yellow-300"/>,
            statInfo: '<span class="text-white me-2"></span>'
        },
        {
            id: "raid-sharp-red-total",
            title: "<div class='text-red-600'>Raid Sharp Red</div>",
            value: 0,
            icon: <Gem size={18} className="text-red-600"/>,
            statInfo: '<span class="text-white me-2"></span>'
        },
        {
            id: "risky-dice-total",
            title: "<div class='text-purple-300'>Risky Dice</div>",
            value: 0,
            icon: <Gem size={18} className="text-purple-300"/>,
            statInfo: '<span class="text-white me-2"></span>'
        }
    ];

    return (
        <>
            <div className="dialog-creator" id="dialogA">
                <div className="dialog-overlay">
                    <div className="dialog">
                        <div className="dialog-header">
                            <h3 id="dialog-title"></h3>
                            <button type="button" className="btn btn-danger"
                                    onClick={() => $('#dialogA').hide()}>&times;</button>
                        </div>
                        <form id="form-modal" method="post">
                            <div className="form-group">
                                <input type="text" className="form-control" id="idUser" name="idUser"
                                       value={idUser === null ? '' : idUser}
                                       hidden readOnly={true}/>
                                <label htmlFor="id">User name Roblox</label>
                                <input type="text" className="form-control" id="id" name="id" onChange={e => e}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="dialog-creator" id="dialogB">
                <div className="dialog-overlay">
                    <div className="dialog">
                        <div className="dialog-header">
                            <div className="text-nowrap" style={{width: "8rem"}}>
                                <h3 id="dialog-title">Details Player</h3>
                            </div>
                            <button className="btn btn-danger" onClick={() => $('#dialogB').hide()}>&times;</button>
                        </div>
                        <form id="form-modal">
                            <div className="row">
                                <div className="form-group col-md-6 col-12">
                                    <label htmlFor="d_player_name">Player Name</label>
                                    <input type="text" className="form-control" id="d_player_name" name="d_player_name"
                                           value="" readOnly={true}/>
                                </div>
                                <div className="form-group col-md-6 col-12">
                                    <label htmlFor="d_level">Level</label>
                                    <input type="text" className="form-control" id="d_level" name="d_level" value=""
                                           readOnly={true}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6 col-12">
                                    <label htmlFor="d_gold">Gold</label>
                                    <input type="text" className="form-control" id="d_gold" name="d_gold" value=""
                                           readOnly={true}/>
                                </div>
                                <div className="form-group col-md-6 col-12">
                                    <label htmlFor="d_gems">Gems</label>
                                    <input type="text" className="form-control" id="d_gems" name="d_gems" value=""
                                           readOnly={true}/>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6 col-12">
                                        <label htmlFor="d_trait_crystal">Trait Crystal</label>
                                        <input type="text" className="form-control" id="d_trait_crystal"
                                               name="d_trait_crystal"
                                               value="" readOnly={true}/>
                                    </div>
                                    <div className="form-group col-md-6 col-12">
                                        <label htmlFor="d_star_rift_blue">Star Rift Blue</label>
                                        <input type="text" className="form-control" id="d_star_rift_blue"
                                               name="d_star_rift_blue" value="" readOnly={true}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6 col-12">
                                        <label htmlFor="d_star_rift_rainbow">Star Rift Rainbow</label>
                                        <input type="text" className="form-control" id="d_star_rift_rainbow"
                                               name="d_star_rift_rainbow" value="" readOnly={true}/>
                                    </div>
                                    <div className="form-group col-md-6 col-12">
                                        <label htmlFor="d_star_rift_green">Star Rift Green</label>
                                        <input type="text" className="form-control" id="d_star_rift_green"
                                               name="d_star_rift_green" value="" readOnly={true}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6 col-12">
                                        <label htmlFor="d_star_rift_red">Star Rift Red</label>
                                        <input type="text" className="form-control" id="d_star_rift_red"
                                               name="d_star_rift_red"
                                               value="" readOnly={true}/>
                                    </div>
                                    <div className="form-group col-md-6 col-12">
                                        <label htmlFor="d_star_rift_yellow">Star Rift Yellow</label>
                                        <input type="text" className="form-control" id="d_star_rift_yellow"
                                               name="d_star_rift_yellow" value="" readOnly={true}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6 col-12">
                                        <label htmlFor="d_star_rift_purple">Star Rift Purple</label>
                                        <input type="text" className="form-control" id="d_star_rift_purple"
                                               name="d_star_rift_purple" value="" readOnly={true}/>
                                    </div>
                                    <div className="form-group col-md-6 col-12">
                                        <label htmlFor="d_raid_sharp_yellow">Raid Sharp Yellow</label>
                                        <input type="text" className="form-control" id="d_raid_sharp_yellow"
                                               name="d_raid_sharp_yellow" value="" readOnly={true}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6 col-12">
                                        <label htmlFor="d_raid_sharpred">Raid Sharp Red</label>
                                        <input type="text" className="form-control" id="d_raid_sharpred"
                                               name="d_raid_sharpred"
                                               value="" readOnly={true}/>
                                    </div>
                                    <div className="form-group col-md-6 col-12">
                                        <label htmlFor="d_risky_dice">Risky Dice</label>
                                        <input type="text" className="form-control" id="d_risky_dice"
                                               name="d_risky_dice"
                                               value="" readOnly={true}/>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary"
                                    onClick={() => $('#dialogB').hide()}>Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div id="error"></div>
            <div id="success"></div>
            <div className="d-flex" style={{marginTop: "10px"}}>
                <div className="item">
                    <button type="button" className="btn btn-success mt-4 ml-10 create-button">Add new
                    </button>
                </div>
                <div className="item">
                    <button type="button" className="btn btn-primary mt-4 ml-1 excel-button">Export to Excel
                    </button>
                </div>
                <div className="item">
                    <button type="button" className="btn btn-info text-white mt-4 ml-1" onClick={copyText}>Copy Script
                    </button>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <textarea name="code" id="code" className={"form-control mt-4"} readOnly={true}
                          style={{width: "20%"}}/>
            </div>
            <div id="stats-user">
                <div className="d-md-flex justify-content-md-center">
                    {statsUserA.map((item, index) => {
                        return (
                            <Col xl={3} lg={6} md={12} xs={12} className="mt-6" key={index}>
                                <StatRightTopIcon info={item}/>
                            </Col>
                        )
                    })}
                </div>
                <div className="d-md-flex justify-content-md-center">
                    {statsUserB.map((item, index) => {
                        return (
                            <Col xl={3} lg={6} md={12} xs={12} className="mt-6" key={index}>
                                <StatRightTopIcon info={item}/>
                            </Col>
                        )
                    })}
                </div>
            </div>
            <div className="table-container text-white" style={{marginTop: "50px"}}>
                <table id={idTable} style={{width: "100%"}}>
                    <thead>
                    <tr>
                        <th className="fs-4 text-w">Player Name <Person size={18} className="text-green-600"/></th>
                        <th className="fs-4 text-w">Level <Person size={18} className="text-blue-400"/></th>
                        <th className="fs-4 text-w">Gold <CurrencyBitcoin size={18} className="text-yellow-400"/></th>
                        <th className="fs-4 text-w">Gems <Gem size={18} className="text-purple-400"/></th>
                        <th className="fs-4 text-w invisible-text">Options</th>
                        <th className="hidden fs-4 text-w">Trait Crystal</th>
                        <th className="hidden fs-4 text-w">Star Rift Blue</th>
                        <th className="hidden fs-4 text-w">Star Rift Rainbow</th>
                        <th className="hidden fs-4 text-w">Star Rift Green</th>
                        <th className="hidden fs-4 text-w">Star Rift Red</th>
                        <th className="hidden fs-4 text-w">Star Rift Yellow</th>
                        <th className="hidden fs-4 text-w">Star Rift Purple</th>
                        <th className="hidden fs-4 text-w">Raid Sharp Yellow</th>
                        <th className="hidden fs-4 text-w">Raid Sharpred</th>
                        <th className="hidden fs-4 text-w">Risky Dice</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div className="d-md-flex justify-content-md-center">
                <span>Reload 30s everytime</span>
            </div>
            <div className="item" style={{marginTop: "10px", marginLeft: "40px"}}>
                <button type="button" className="btn btn-secondary mt-4 ml-1 refresh-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-bootstrap-reboot" viewBox="0 0 16 16">
                        <path
                            d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.8 6.8 0 0 0 1.16 8z"></path>
                        <path
                            d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324z"></path>
                    </svg>
                </button>
            </div>
        </>
    )
}

async function getData(hostname, idAccount) {
    const codeScript = await fetch(`${hostname}/api/getCode?id=` + idAccount).then((res) => res.json());
    return {
        props: {
            codeScript: codeScript.code
        },
    };
}