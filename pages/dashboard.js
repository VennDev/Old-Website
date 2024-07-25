// import node module libraries
import {Fragment, use, useEffect} from "react";
import Link from 'next/link';
import {Container, Col, Row} from 'react-bootstrap';

// import widget/custom components
import {StatRightTopIcon} from "widgets";

// import sub components
import {ActiveProjects, Teams, TasksPerformance} from "sub-components";
import {Authentication} from 'components/auth/Authentication';
// import required data files
import ProjectsStatsData from "data/dashboard/ProjectsStatsData";

const DashBoard = () => {
    return (
        <Authentication>
            <Fragment>
                <div className="bg-dark pt-10 pb-21"></div>
                <Container fluid className="mt-n22 px-6">
                    <Row>
                        <Col lg={12} md={12} xs={12}>
                            {/* Page header */}
                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="mb-2 mb-lg-0">
                                        <h3 className="mb-0 text-light fw-bold">General statistics</h3>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <ProjectsStatsData/>
                        {/*<div style={{width: '100%', height: '100px'}}></div>*/}
                    </Row>
                </Container>
            </Fragment>
        </Authentication>
    )
}
export default DashBoard;