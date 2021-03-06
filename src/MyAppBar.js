import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import MoreIcon from '@material-ui/icons/MoreVert';
import ComboClasses from './ComboClasses';	
import PersonAddIcon from '@material-ui/icons/PersonAdd';


const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}));

export default function MyAppBar({ 
		classes, 
		handleSelectClassChange, 
		handleAddStudent,
		totalStudent,
		handleSearchStudent,
		totalsearchResul
	}) {
	//const [selectedClass, sethandleClassChange] = React.useState(0);
	//const [countStudent, sethandleCountStudent] = React.useState(0);
	const classesStyle = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	
	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleChange = (selectedClass) => {
	
		//sethandleClassChange(selectedClass);
		handleSelectClassChange(selectedClass)
		
	};

	const add_student = ()=>{
		
		 handleAddStudent()
		
	}
	const handleSearch = (e)=>{
		handleSearchStudent(e.currentTarget.value)

	}

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				{/* <IconButton aria-label='show 4 new mails' color='inherit'>
					<Badge badgeContent={4} color='secondary'>
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p> */}
				<ComboClasses 
					handleChange={handleChange}
			
				/>
			</MenuItem>
			<MenuItem>
				<IconButton
					aria-label='show 18 new notifications'
					color='inherit'
					onClick={add_student}
				>

				<PersonAddIcon/>
				Add
				</IconButton>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label='show 4 new mails'	
					color='inherit'
				>
					<Badge badgeContent={totalStudent} color='secondary'>
						<PeopleAltIcon />
					</Badge>
				</IconButton>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classesStyle.grow}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						edge='start'
						className={classesStyle.menuButton}
						color='inherit'
						aria-label='open drawer'
					>
						<MenuIcon />
					</IconButton>
					<Typography
						className={classesStyle.title}
						variant='h6'
						noWrap
					>
					
					</Typography>
					
					<div className={classesStyle.search}>
						<div className={classesStyle.searchIcon}>
							<SearchIcon />
							
						</div>
						<InputBase
							onChange={handleSearch}
							placeholder='T??m ???'
							classes={{
								root: classesStyle.inputRoot,
								input: classesStyle.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>
					<div className={classesStyle.grow} />
					<div className={classesStyle.sectionDesktop}>
						<ComboClasses 
							handleChange={handleChange}
					
						/>
					
						
						{/* <IconButton
							aria-label='show 18 new notifications'
							color='inherit'
						>
							<Badge badgeContent={18} color='secondary'>
								<NotificationsIcon />
							</Badge>
						</IconButton> */}
						<IconButton
							aria-label='show 18 new notifications'
							color='inherit'
							onClick={add_student}
						>
						
						<PersonAddIcon/>
						Add

							
						</IconButton>

						<IconButton
							aria-label='show 4 new mails'	
							color='inherit'
						>
							<Badge badgeContent={totalStudent} color='secondary'>
								<PeopleAltIcon />
							</Badge>
						</IconButton>

						
						{/* <IconButton
							edge='end'
							aria-label='account of current user'
							aria-controls={menuId}
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
							color='inherit'
						>
							<AccountCircle />
						</IconButton> */}
					</div>
					<div className={classesStyle.sectionMobile}>
						<IconButton
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</div>
	);
}
