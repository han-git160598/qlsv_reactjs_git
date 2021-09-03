import React from 'react';
import MyAppBar from './MyAppBar';
// import MyContent from './MyContent';
import MyClass from './MyClass'; 
import moment from 'moment';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			idmax:0, 
			selectedCountry: '' ,
			selectedClass:'',
			NewStudent:[], 
			totalStudent:0,
			searchResult:[],
			totalsearchResul:0
		
	};
	}

	handleSelectClassChange = (selectedClass) => {

		const countStudent = this.state.NewStudent.filter(
			(data)=>data.class === selectedClass
		)
		const totalStudent = countStudent.length;
	
		this.setState({ selectedClass: selectedClass, totalStudent:totalStudent });

	};
	handleAddStudent= ()=>{
		this.addNewStudent()
		// if(this.state.selectedClass)
		// {

		// }else{
		// 	alert('Please choose a class !!!')
		// }
		
	}
	
	addNewStudent = ()=>{
		fetch('https://randomuser.me/api/?results=1')
			.then((res) => res.json())
			.then(
				(data) => {
					
					let id = this.state.idmax + 1 ;
					const dataWithId = data.results.map((x) =>
						{
							return {
								id: id,
								name:x.name.first + ' ' + x.name.last,
								country : x.location.country,
								phone:x.phone,
								picture:x.picture.thumbnail,
								date:moment(x.dob.date).format("DD/MM/YYYY"),
								class:this.state.selectedClass
							}
						}
					);
					// this.setState({
					// 	NewStudent: dataWithId,
					// 	selectedClass:this.state.selectedClass
					// });
					// Add all
					if(this.state.NewStudent ==='')
					{
						this.setState({
							NewStudent: dataWithId,
							selectedClass:this.state.selectedClass,
							totalStudent:1,
							idmax:id,
							
						});
					}else{
						var tempProps = JSON.parse(JSON.stringify(this.state.NewStudent));
						tempProps.push(dataWithId[0])
						Object.preventExtensions(tempProps);

						const countStudent = tempProps.filter(
							(data)=>data.class === this.state.selectedClass
						)
						const totalStudent = countStudent.length ;

						this.setState({
							NewStudent: tempProps,
							selectedClass:this.state.selectedClass,
							totalStudent:totalStudent,
							idmax:id,
							
						});
					}
					
					
				},
				(error) => {
					console.log('error', error);
				}
			);
	}
	handleSearchStudent =(keyword) =>{
		console.log('keyword',keyword)
		if(keyword)
		{
			let val = keyword.toLowerCase();
			let matches = this.state.NewStudent.filter(v => v.name.toLowerCase().includes(val));
			const totalStudent = matches.length ;
			this.setState({searchResult:matches,totalsearchResul:totalStudent})
		}else{
			let NewStudent = this.state.NewStudent;
			let totalStudent= this.state.totalStudent
			this.setState({searchResult:NewStudent,totalStudent:totalStudent,totalsearchResul:0})
		}
		
	}
	handleDeleteStudent = (newData)=>{
		const countStudent = newData.filter(
			(data)=>data.class === this.state.selectedClass
		)
		const totalStudent = countStudent.length ;
		this.setState({NewStudent:newData,totalStudent:totalStudent})
	}
	render() {
		return (
			<div>
				<MyAppBar
					classes={[{ id: 1, value: 'một' }]}
					handleSelectClassChange={this.handleSelectClassChange}
					handleAddStudent={this.handleAddStudent}
					totalStudent= {this.state.totalStudent}
					totalsearchResul={this.state.totalsearchResul}
					handleSearchStudent ={this.handleSearchStudent}
					
				/>
				
				<br />
				<MyClass
					student={this.state.NewStudent}
					selectedClass={this.state.selectedClass}
					handleDeleteStudent = {this.handleDeleteStudent}
					totalsearchResul = {this.state.totalsearchResul}
					searchResult = {this.state.searchResult}
				
				/>
			</div>
		);
	}
}

export default App;
