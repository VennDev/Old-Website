import {
    Briefcase,
    ListTask,
    People,
    Bullseye
} from 'react-bootstrap-icons';

import React, { useState, useEffect } from 'react';
import {Col} from "react-bootstrap";
import {StatRightTopIcon} from "../../widgets";

const ProjectsStats = () => {
    const [totalAccount, setTotalAccount] = useState(0);
    const [totalOnline, setTotalOnline] = useState(0);
    const [totalOffline, setTotalOffline] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/accounts/getCount');
                const data = await response.json();
                setTotalAccount(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData().then(r => r);

        const fetchData2 = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/accounts/getTotalOnline');
                const data = await response.json();
                setTotalOnline(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData2().then(r => r);

        const fetchData3 = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/accounts/getTotalOffline');
                const data = await response.json();
                setTotalOffline(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData3().then(r => r);

    }, [setTotalAccount, setTotalOnline, setTotalOffline]);

    const statsServer = [
        {
            id: 1,
            title: "<div class='text-green-600'>Total number of accounts</div>",
            value: totalAccount !== null ? totalAccount : 0,
            icon: <People size={18}/>,
            statInfo: '<span class="text-white me-2"></span>'
        },
        {
            id: 2,
            title: "<div class='text-blue-400'>Account number is online</div>",
            value: totalOnline !== null ? totalOnline : 0,
            icon: <People size={18}/>,
            statInfo: '<span class="text-white me-2"></span>'
        },
        {
            id: 3,
            title: "<div class='text-red-600'>Account number is offline</div>",
            value: totalOffline !== null ? totalOffline : 0,
            icon: <People size={18}/>,
            statInfo: '<span class="text-white me-2"></span>'
        }
    ];

    return (
        <>
            {statsServer.map((item, index) => {
                return (
                    <Col xl={3} lg={6} md={12} xs={12} className="mt-6" key={index}>
                        <StatRightTopIcon info={item}/>
                    </Col>
                )
            })}
        </>
    );
};

export default ProjectsStats;
