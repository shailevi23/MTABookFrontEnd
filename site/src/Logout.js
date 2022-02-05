class LogOut extends React.Component {
	constructor(props) {
		super(props);
		this.handle_logout = this.handle_logout.bind(this);
	}

	async handle_logout() {
		const response = await fetch('/api/logout',
            {
                method: 'DELETE'
            });
        if (response.status == 200) {
            window.location.href = '/pages/login.html';
        }

        else {
            const err = await response.text();
            alert(err);
        }
	}

	render() {
		return <button onClick={this.handle_logout}>Logout</button>
	}
}