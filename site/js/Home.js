class PostItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return React.createElement(
			'div',
			{ className: 'PostItem', 'data-id': this.props.post.id },
			React.createElement(
				'span',
				null,
				this.props.post.message
			)
		);
	}
}

class PostList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { posts: [] };
	}

	async componentDidMount() {
		const posts = await this.fetch_posts();
		this.update_list(posts);
	}

	async fetch_posts() {
		const response = await fetch('/api/get_posts');
		if (response.status != 200) {
			window.location.href = '/pages/login.html';
			alert("You have to log in !");
		}

		const data = await response.json();
		return data;
	}

	update_list(posts) {
		this.setState({ posts: posts });
	}

	render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				null,
				this.state.posts.map((item, index) => {
					return React.createElement(PostItem, {
						post: item, key: index });
				})
			)
		);
	}
}

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				null,
				React.createElement(PostList, null)
			)
		);
	}
}