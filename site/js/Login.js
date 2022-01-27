class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handle_submit = this.handle_submit.bind(this);
        this.handle_change = this.handle_change.bind(this);
    }

    async handle_submit() {

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        };
        console.log(document.getElementById('email').value);
        const response = await fetch('/api/login', requestOptions);
        if (response.status == 200) {
            window.location.href = '/pages/home.html';
            console.log("success");
        } else {
            const err = await response.text();
            alert(err);
        }
    }

    handle_change() {}

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'form',
                { onSubmit: this.handle_submit },
                React.createElement('input', { type: 'email', id: 'email', placeholder: 'Email', required: true, onChange: this.handle_change }),
                React.createElement('input', { type: 'password', id: 'password', placeholder: 'Password', required: true, onChange: this.handle_change }),
                React.createElement(
                    'button',
                    { onSubmit: this.handle_submit },
                    'Log in'
                )
            )
        );
    }

}