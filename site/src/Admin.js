class Admin extends React.Component {
    constructor(props) {
		super(props);
		this.handle_click = this.handle_click.bind(this);
	}

	async handle_click() {
		const text = document.getElementById('send_message').value;
        const everyone = "everyone";

		const response = await fetch('/api/send_message',
            {
                method: 'POST',
                body: JSON.stringify({ text: text, friend_id: everyone }),
                headers: { 'Content-Type': 'application/json' }
            });
        if (response.status == 200) {
            alert("Your message has been sent !");
			document.getElementById('send_message').value = "";
        }

        else {
            const err = await response.text();
            alert(err);
        }
	}

    render() {
		return <div>
			
			<div>
                <div>Send a message to all users</div>
				<input type="text" id="send_message" placeholder="Write a message" required></input>
				<br></br>
				<button onClick={this.handle_click}>Send</button>
			</div>
		</div>
    }
}