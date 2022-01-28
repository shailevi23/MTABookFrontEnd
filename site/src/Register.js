class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handle_submit = this.handle_submit.bind(this);
        this.state = {visible:false};
    }

    async handle_submit() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const requestOptions = {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify({name : name, email: email , password: password})
        }
        
		const response = await fetch('/api/register', requestOptions);
		if ( response.status == 200 ) {
            console.log("success")
	        this.setState( {visible: true} );
        }
        else 
        {
            const err = await response.text();
            alert( err );
        }
    }

    render() {
        return <div>
                <input type="name" id="name" placeholder="name" required />
                <input type="email" id="email" placeholder="Email" required />
                <input type="password" id="password" placeholder="Password" required />
                <button disabled={this.state.visible} onClick={this.handle_submit}>Sign</button>
                <div style={{ display: (this.state.visible ? 'block' : 'none') }}><span >Registration confirmed, waiting for the admission!</span></div>
        </div>
    }
}