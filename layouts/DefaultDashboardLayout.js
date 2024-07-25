// import node module libraries
import { useState } from 'react';

// import sub components
import NavbarVertical from './navbars/NavbarVertical';
import NavbarTop from './navbars/NavbarTop';
import { Row, Col } from 'react-bootstrap';

const DefaultDashboardLayout = (props) => {

	const [showMenu, setShowMenu] = useState(true);

	const ToggleMenu = () => {
		return setShowMenu(!showMenu);
	};

	return (		
		<div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`}>
			<div className="navbar-vertical navbar">
				<NavbarVertical
					showMenu={showMenu}
					onClick={(value) => setShowMenu(value)}
				/>
			</div>
			<div id="page-content">
				<div className="header">
					<NavbarTop
						data={{
							showMenu: showMenu,
							SidebarToggleMenu: ToggleMenu
						}}
					/>
				</div>
				{props.children}
				<div className='px-6 border-top py-3' style={{ marginTop: "50px" }}>
					<Row>
						<Col sm={6} className='text-center text-sm-start mb-2 mb-sm-0'>
							<p className='m-0'>Designed by <a className="text-gray-500 underline" href='https://github.com/VennDev' target='_blank'>VennDev</a></p>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	);
};
export default DefaultDashboardLayout;
