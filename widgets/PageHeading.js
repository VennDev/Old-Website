// import node module libraries
import {Row, Col} from 'react-bootstrap';

const PageHeading = props => {
    const {heading, value} = props;
    return (
        <Row>
            <Col lg={12} md={12} xs={12}>
                {/* Page header */}
                <div className="border-bottom pb-4 mb-4 ">
                    <h3 className="mb-0 fw-bold">{heading}</h3> <span className="text-muted fw-bold">{value}</span>
                </div>
            </Col>
        </Row>
    )
}

export default PageHeading