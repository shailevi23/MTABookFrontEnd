
class UserItem extends React.Component {
	constructor(props) {
		super(props);
		this.handle_click = this.handle_click.bind(this);
	}

	handle_click() {
		if (this.props.handle_delete)
			this.props.handle_delete(this.props.user.id);
	}

	render() {
		return <div className='UserItem' data-id={this.props.user.id}>
			<span><i onClick={this.handle_click} className='fa fa-times transparent'></i></span>
			<span>{this.props.user.name}</span>
		</div>
	}
}

class AddButton extends React.Component {
	constructor(props) {
		super(props);
		this.handle_add = this.handle_add.bind(this);
	}

	handle_add() {
		if (this.props.handle_add)
			this.props.handle_add();
	}

	render() {
		return <button className='AddButton'
			onClick={this.handle_add}>Add User</button>
	}
}

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.handle_submit = this.handle_submit.bind(this);
	}

	handle_submit() {
		if (this.props.handle_submit)
			this.props.handle_submit();
	}


	render() {
		return <div>
			{/* <form onSubmit={this.handle_submit}> */}
				<input type="email" id="email" placeholder="Email" required />
				<input type="password" id="password" placeholder="Password" required />
				<button onClick={this.handle_submit}>Log in</button>
			{/* </form> */}
		</div>


	}


}


const re_react_user_name = /^React/

class UserList extends React.Component {
	constructor(props) {
		super(props);
		this.handle_delete = this.handle_delete.bind(this);
		this.handle_add = this.handle_add.bind(this);
		this.handle_submit = this.handle_submit.bind(this);
		this.state = { users: [] }
	}

	async componentDidMount() {
		const users = await this.fetch_users();
		this.update_list(users);
	}

	async fetch_users() {
		const response = await fetch('/api/users');
		if (response.status != 200)
			throw new Error('Error while fetching users');
		const data = await response.json();
		return data;
	}



	create_new_user_name(users) {
		const react_users = users.filter(item => re_react_user_name.test(item.name));
		for (let idx = 1; ; idx++) {
			const candidate = "React User " + idx;
			const index = react_users.findIndex(item => item.name == candidate);
			if (index < 0)
				return candidate;
		}
	}


	async handle_add() {
		const name = this.create_new_user_name(this.state.users);
		const response = await fetch('/api/users/',
			{
				method: 'POST',
				body: JSON.stringify({ name: name }),
				headers: { 'Content-Type': 'application/json' }
			});
		if (response.status == 200) {
			const users = await this.fetch_users();
			this.update_list(users);
		}
		else {
			const err = await response.text();
			alert(err);
		}
	}


	async handle_delete(id) {
		const response = await fetch('/api/user/' + id, { method: 'DELETE' });
		if (response.status == 200) {
			const users = await this.fetch_users();
			this.update_list(users);
			// window.location.href = '/pages/home.html';		  
		}
		else {
			const err = await response.text();
			alert(err);
		}
	}


	update_list(users) {
		this.setState({ users: users });
	}

	async handle_submit() {
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;

		const response = await fetch('/api/login/',
			{
				method: 'POST',
				body: JSON.stringify({ email: email, password: password }),
				headers: { 'Content-Type': 'application/json' }
			});
		if (response.status == 200) {
			this.stam();
			console.log("success")
			window.location.href = '/pages/home.html';
		}

		else {
			const err = await response.text();
			alert(err);
		}
	}

	stam() {
		let x = 5;
		x += 2;
		console.log(x);
	}

	render() {
		return <div>
			<div>
				{this.state.users.map((item, index) => {
					return <UserItem
						handle_delete={this.handle_delete} user={item} key={index} />
				})}
			</div>
			<div><AddButton handle_add={this.handle_add} /></div>
			<div><Login handle_submit={this.handle_submit} /></div>
		</div>


	}
}
