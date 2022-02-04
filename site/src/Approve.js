class UserItem extends React.Component {
	constructor(props) {
		super(props);
        this.handle_click = this.handle_click.bind(this);
	}

    async handle_click() {
		const response = await fetch('/api/approve/' + this.props.user.id,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
        if (response.status == 200) {
            alert("User has been approved !");
        }

        else {
            const err = await response.text();
            alert(err);
        }
	}

	render() {
		return <div className='UserItem' data-id={this.props.user.id}>
			<span id="username">{this.props.user.name}</span>
            <button onClick={this.handle_click}>Approve</button>
		</div>
	}
}


class UserList extends React.Component {
    constructor(props) {
		super(props);
        this.state = { users: []}
	}

    async componentDidMount() {
		this.update_list();
        //dosent refresh
	}

	async fetch_users() {
		const response = await fetch('/api/users');
		if (response.status != 200) {
			window.location.href = '/pages/login.html';
			alert("You have to log in !");
		}
			
		const data = await response.json();
		return data;
	}

    async update_list() {
		const users = await this.fetch_users();
        const new_users = users.filter((item) => {
            if(item.status === "created"){
                return item;
            };})
		this.setState({ users: new_users });
	}
    
    render() {
		return <div>
			<div id="user">
				{this.state.users.map((item, index) => {
					return <UserItem
                        user={item} key={index} />
                        
				})}
			</div>
            <span style={{ display: (this.state.users.length ? 'none' : 'block') }}>
					 You have no users to approve!
				</span>
		</div>
    }
}



class Approve extends React.Component {
    constructor(props) {
		super(props);
	}

    render() {
		return <div>
			<div><UserList/></div>
		</div>
    }
}