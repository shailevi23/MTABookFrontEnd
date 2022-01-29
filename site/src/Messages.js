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
        this.state = { messages: [] }
	}

    async componentDidMount() {
		const messages = await this.fetch_messages();
		this.update_list(messages);
	}

	async fetch_messages() {
		const response = await fetch('/api/get_messages');
		if (response.status != 200) {
			window.location.href = '/pages/login.html';
			alert("You have to log in !");
		}
			throw new Error('Error while fetching messages');
		const data = await response.json();
		return data;
	}

    update_list(messages) {
		this.setState({ messages: messages });
	}

    render() {
		return <div>
			<div>
				{this.state.messages.map((item, index) => {
					return <MessageItem
						 message={item} key={index} />
				})}
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