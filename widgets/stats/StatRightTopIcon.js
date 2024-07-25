// Widget : Stat Style 
// Style : Stat widget with right top icon

// import node module libraries
import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';

const StatRightTopIcon = props => {
    const {info} = props;
    return (
        <Card className="border border-dark bg-secondary">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <div className="mb-0 text-light fw-bold" dangerouslySetInnerHTML={{__html: info.title}}></div>
                    </div>
                    <div className="icon-shape icon-md bg-dark text-white rounded-2">
                        {info.icon}
                    </div>
                </div>
                <div>
                    <h1 id={info.id + "-stats-top-icon"} className="fw-bold text-light">{info.value}</h1>
                    <p className="mb-0" dangerouslySetInnerHTML={{__html: info.statInfo}}></p>
                </div>
            </Card.Body>
        </Card>
    )
}

// Typechecking With PropTypes
StatRightTopIcon.propTypes = {
    info: PropTypes.any.isRequired
};

export default StatRightTopIcon