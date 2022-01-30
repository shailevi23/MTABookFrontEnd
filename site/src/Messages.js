class MessageItem extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		return <div className='MessageItem' data-id={this.props.message.id}>
			<span>{this.props.message.message}</span>
		</div>
	}
}

class MessageList extends React.Component {
    constructor(props) {
		super(props);
		this.handle_click = this.handle_click.bind(this);
        this.state = { messages: [], friends: [] }
	}

    async componentDidMount() {
		this.update_list();
		this.update_friends();
	}

	async fetch_messages() {
		const response = await fetch('/api/get_messages');
		if (response.status != 200) {
			window.location.href = '/pages/login.html';
			alert("You have to log in !");
		}
		const data = await response.json();
		return data;
	}

    async update_list() {
		const messages = await this.fetch_messages();
		const reverse_messages = messages.reverse();
		this.setState({ messages: reverse_messages });
	}

	async fetch_friends() {
		const response = await fetch('/api/get_friends');
		if (response.status != 200) {
			// window.location.href = '/pages/login.html';
			// alert("You have to log in !");
		}
		const data = await response.json();
		return data;
	}

	async update_friends() {
		const friends = await this.fetch_friends();
		this.setState({ friends: friends });

		for (let i=0; i<friends.length; i++){
			const newOption = document.createElement('option');
			const optionText = document.createTextNode(friends[i].name);
		
			newOption.appendChild(optionText);
		
			newOption.setAttribute('id',friends[i].id);
			document.getElementById('friend-select').appendChild(newOption);
		}	
	}

	async handle_click() {
		const text = document.getElementById('send_message').value;
		const selected_option = document.getElementById('friend-select').selectedIndex
		const friend_id = document.getElementById('friend-select')[selected_option].getAttribute("id");

		const response = await fetch('/api/send_message',
            {
                method: 'POST',
                body: JSON.stringify({ text: text, friend_id: friend_id }),
                headers: { 'Content-Type': 'application/json' }
            });
        if (response.status == 200) {
            alert("Your post is published !");
			document.getElementById('friend-select').selectedIndex = 0;
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
				{this.state.messages.map((item, index) => {
					return <MessageItem
						 message={item} key={index} />
				})}
			</div>
			<div>
				<select id="friend-select">
    				<option value="">--Please choose a friend--</option>
				</select>
				<input type="text" id="send_message" placeholder="Write a message" required></input>
				<br></br>
				<button onClick={this.handle_click}>Send</button>
			</div>
		</div>
    }
}

class Messages extends React.Component {
    constructor(props) {
		super(props);
	}

    render() {
		return <div>
			<div><MessageList/></div>
		</div>
    }
}