import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class ComboClasses extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			option: [
						{ title: 'D16-TH04', year: 1994 },
						{ title: 'D16-TH03', year: 1972 },
						{ title: 'D16-TH02', year: 1972 },
						{ title: 'D16-TH01', year: 1972 },
					],
			Selected: ''
		};
	} 
	handleChange = (e,v)=>{
		
		this.setState({Selected: v?.title})
		this.props.handleChange(v?.title);
	}
	render() {
		return (
			<div style={{ minWidth: 200 }}>
				Class
				<Autocomplete
					id='combo-box-demo'
					options={this.state.option}
					getOptionLabel={(option) => option.title}
					onChange={this.handleChange}
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
			</div>
		);
	}
}

export default ComboClasses;


