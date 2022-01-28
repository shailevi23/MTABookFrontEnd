class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handle_submit = this.handle_submit.bind(this);
    }

    async handle_submit() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, email: email, password: password })
        };

        const response = await fetch('/api/register', requestOptions);
        if (response.status == 200) {
            // window.location.href = ;
            console.log("success");
        } else {
            const err = await response.text();
            alert(err);
        }
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement('input', { type: 'name', id: 'name', placeholder: 'name', required: true }),
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