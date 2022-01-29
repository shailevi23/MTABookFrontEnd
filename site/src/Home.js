class PostItem extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		return <div className='PostItem' data-id={this.props.post.id}>
			<span>{this.props.post.message}</span>
		</div>
	}
}

class PostList extends React.Component {
    constructor(props) {
		super(props);
        this.state = { posts: [] }
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
		return <div>
			<div>
				{this.state.posts.map((item, index) => {
					return <PostItem
						 post={item} key={index} />
				})}
			</div>
		</div>
    }
}

class Home extends React.Component {
    constructor(props) {
		super(props);
	}

    render() {
		return <div>
			<div><PostList/></div>
		</div>
    }
}