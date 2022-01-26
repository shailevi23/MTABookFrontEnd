class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handle_submit = this.handle_submit.bind(this);
        this.handle_change = this.handle_change.bind(this);
    }

    handle_submit() {
        // window.location.href = ;
        const check = await this.check_login();
    }

    handle_change() {

    }

    async check_login()
	{
        const requestOptions = {
            method : 'POST',
            body : JSON.stringify({email: document.getElementById('email').value , password:document.getElementById('password').value})
        }
		const response = await fetch('/api/login', requestOptions);
		if ( response.status != 200 )
		  throw new Error( 'Error while fetching users');
		const status =  response.status;
		return status;
	}

    render() {
        return <div>
            <form onSubmit={this.handle_submit}>
                <input type="email" id="email" placeholder="Email" required onChange={this.handle_change} />
                <input type="password" id="password" placeholder="Password" required onChange={this.handle_change} />
                <button onSubmit={this.handle_submit}>Log in</button>
            </form>
        </div>


    }


}
