class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handle_submit = this.handle_submit.bind(this);
    }

    async handle_submit() {

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email: email, password: password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status == 200) {
            window.location.href = '/pages/home.html';
        } else {
            const err = await response.text();
            alert(err);
        }
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement('input', { type: 'email', id: 'email', placeholder: 'Email', required: true }),
            React.createElement('input', { type: 'password', id: 'password', placeholder: 'Password', required: true }),
            React.createElement(
                'button',
                { onClick: this.handle_submit },
                'Log in'
            )
        );
    }

}