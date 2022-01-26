class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handle_submit = this.handle_submit.bind(this);
        this.handle_change = this.handle_change.bind(this);
    }

    handle_submit() {
        // window.location.href = ;
    }

    handle_change() {}

    async check_login() {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ email: document.getElementById('email').value, password: document.getElementById('password').value })
        };
        const response = await fetch('/api/login', requestOptions);
        if (response.status != 200) throw new Error('Error while fetching users');
        const data = await response.json();
        return data;
    }

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