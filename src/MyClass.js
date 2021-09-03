import React from 'react';
// import './Countries.css';
import { DataGrid } from '@material-ui/data-grid';
// import Moment from 'react-moment';
// import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class MyClass extends React.Component {
	constructor(props) {
		super(props);
		
		const columns = [
			{
				field: 'id',
				headerName: 'id',
				width: 100,
				editable: true
			},
			{
				field: 'name',
				headerName: 'name',
				width: 170,
				editable: true
			},
			{
				field: 'country',
				headerName: 'country',
				width: 150,
				editable: true
			},
			{
				field: 'phone',
				headerName: 'phone',
				width: 150,
				editable: true
			},
			{
				field: 'picture',
				headerName: 'picture',
				width: 120,
				renderCell:(params)=>(
					<strong>
						<Avatar alt="Remy Sharp" src={params.value}/>
					</strong>
					
				)
			},
			{
				field: 'date',
				headerName: 'date',
				width: 150,
				editable: true
			},
			{
				field: 'class',
				headerName: 'class',
				width: 150,
				editable: true
			},
			{
				field: 'action',
				headerName: 'Action',
				width: 200,
				renderCell: (params)=>(
					<strong>
						<IconButton
							aria-haspopup='true'
							color='inherit'
							onClick={()=>this.editStudent(params.id)}
						>
							
							<EditIcon />
						</IconButton>

						<IconButton
							aria-haspopup='true'
							color='inherit'
							onClick={()=>this.handleAgreeDelete(params.id)}
						>
							<DeleteIcon />
						</IconButton>
					</strong>
					
				)
				
			},

		];

		this.state = {
			columns: columns,
			students:props.student,
			selectedClass:props.selectedClass,
			openComfirm:false,
			idDelete:'',
			snackBar:false,
			snackBarNotifi:'',
			editStudent:false,
			detailStudent:[],
			idEdit:null,
			editname:'',
			editphone:'',
			editcountry:'',
			option: [
				{ title: 'D16-TH04', year: 1994 },
				{ title: 'D16-TH03', year: 1972 },
				{ title: 'D16-TH02', year: 1972 },
				{ title: 'D16-TH01', year: 1972 },
			],
			editclass:''
			
		};
		
	}
	editStudent =(id)=>{
	
		let Student =  this.state.students.filter(data=>
			data.id === id
		)	
		if(Student)
		{
			this.setState({ 
				detailStudent:Student ,
				editStudent:true,
				idEdit:id,
				editname:Student[0].name,
				editphone:Student[0].phone,
				editcountry:Student[0].country,
				editclass:Student[0].class
			})
		}
		
	}
	handleSaveStudent = ()=>{
	
		let arr = [...this.state.students]
		for(let i=0;i<=arr.length ;i++)
		{
			if(arr[i].id === this.state.idEdit)
			{
				arr[i].country = this.state.editcountry;
				arr[i].name = this.state.editname;
				arr[i].phone = this.state.editphone;
				arr[i].class = this.state.editclass;
				break;
			}
		}
		this.setState({
			students:arr,
			editStudent:false, 
			snackBarNotifi:'Succsessful Update !',
			snackBar:true,
		})
		this.props.handleDeleteStudent(arr)
	

	}
	editname = (e)=>{
		if(e.target.value)
		{
			this.setState({editname:e.target.value})
		}
	}
	editphone = (e)=>{
		if(e.target.value!=='')
		{
			this.setState({editphone:e.target.value})
		}
	}
	editcountry = (e)=>{
		if(e.target.value)
		{
			this.setState({editcountry:e.target.value})
		}
	}
	editclass = (e,v)=>{
		if( v?.title)
		{
			this.setState({editclass:v?.title})
		}
	}

	deleteStudent =()=>{
		const id= this.state.idDelete
		const itemDelete = [...this.state.students]
		const myArray = itemDelete.filter(function( obj ) {
			return obj.id !== id;
		  });

		// for(var i = 0;i<=itemDelete.length;i++ )
		// {
		// 	if(itemDelete[i].id === id)
		// 	{
		// 		itemDelete.splice(i,1)
		// 		break;
		// 	}
		// }
		
		this.setState({students:myArray, 
			openComfirm:false, 
			snackBar:true,
			snackBarNotifi:'successful delete !'
		})
		this.props.handleDeleteStudent(myArray)
		
	}

	static getDerivedStateFromProps(props, state) {
		
		if(props.totalsearchResul === 0)
		{
			if(props.student !=='' && props.selectedClass)
			{
				// const students = state.students;
				 const NewStudent = props.student ;
				 
				// NewStudent.id = students.length + 1;
				// NewStudent.class = props.selectedClass;
				return {
					students:NewStudent,
					selectedClass:props.selectedClass,		
				}
			}else{
				const NewStudent = props.student ;
				return { students:NewStudent,selectedClass:props.selectedClass }
			}
			
		}else{
			const NewStudent = props.searchResult ;
			return { 
				students:NewStudent,
				selectedClass:props.selectedClass
			}
			
		}
		
	
		
		
	}


	handleAgreeDelete = (id)=>{
		this.setState({openComfirm:true, idDelete:id})
	}
	handleDisagreeDelete = ()=>{
		this.setState({openComfirm:false})
	}
	handleCloseSnackbar = ()=>{
		this.setState({snackBar:false})
	}
	handleAlert = ()=> {
		this.setState({snackBar:false})
	}
	Alert= (props)=> {
		return <Alert elevation={6} variant="filled" {...props} />;
	}
	// Edit
	
	handleClose = () => {
		this.setState({editStudent:false})
	  };


	render() {
		let displayStudent = [...this.state.students];
		let arrStudent = displayStudent.filter((data) =>
			data.class === this.state.selectedClass
		)
		return (
			<div  style={{ height: 700, width: '100%' }}>
			
				<DataGrid
					editMode="row"
					rows={arrStudent}
					columns={this.state.columns}
					
					//isCellEditable={(params) => params.row.id % 2 === 0}
					
				/>
			
			<Dialog
				open={this.state.openComfirm}
				onClose={this.handleOpenComfirm}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description" >
				<DialogTitle id="alert-dialog-title">{"Do you want delete ?"}</DialogTitle>
				<DialogContent>
				<DialogContentText id="alert-dialog-description">
					
				</DialogContentText>
				</DialogContent>
				<DialogActions>
				<Button onClick={this.handleDisagreeDelete} color="primary">
					Disagree
				</Button>
				<Button onClick={this.deleteStudent} color="primary" autoFocus>
					Agree	
				</Button>
				</DialogActions>
			</Dialog>

			<Snackbar
				anchorOrigin={{ vertical:'top' ,horizontal : 'center' }}
				open={this.state.snackBar}
				autoHideDuration={3000}
				onClose={this.handleCloseSnackbar}
				// message={this.state.snackBarNotifi}
				 key={{ vertical:'top' ,horizontal : 'center' }} >
				<Alert onClose={this.handleAlert} severity="success" variant="filled">
					{this.state.snackBarNotifi}
				</Alert>
			</Snackbar>

			{/* Dialog Edit */}
			
			<Dialog open={this.state.editStudent}  aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Edit Student</DialogTitle>
				<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					name="name"
					label="Name"	
					type="text"
					defaultValue={this.state.detailStudent[0]?.name}
					onChange={this.editname}
					fullWidth
				/>
				<TextField
					autoFocus
					margin="dense"
					id="country"
					label="country"
					type="text"
					defaultValue={this.state.detailStudent[0]?.country}
					onChange={this.editcountry}
					fullWidth
				/>
				<TextField
					autoFocus
					margin="dense"
					id="phone"
					label="phone"
					type="text"
					defaultValue={this.state.detailStudent[0]?.phone}
					onChange={this.editphone}
					fullWidth
				/>
				<Autocomplete
					id='combo-box-demo'
					options={this.state.option}
					getOptionLabel={(option) => option.title}
					onChange={this.editclass}
					style={{ width: 300 }}
					renderInput={(params) => (
						<TextField
							{...params}
							label='Chọn lớp'
							variant='outlined'
							placeholder="Chon"
						/>
					)}
				/>
				<Avatar alt="Remy Sharp" src={this.state.detailStudent[0]?.picture}/>
				
				<TextField
					autoFocus
					margin="dense"
					id="picture"
					label="picture"
					type="file"
					fullWidth
				/>
				
				
				
	
				</DialogContent>
				<DialogActions>
				<Button onClick={this.handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={this.handleSaveStudent} color="primary">
					Save
				</Button>
				</DialogActions>
			</Dialog>





			</div>
		);
	}
}

export default MyClass;


