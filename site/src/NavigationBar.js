class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {new_posts: false, new_messages: false };
    }

    componentDidMount() {
        setInterval(this.check_new_posts,30000);
        setInterval(this.check_new_messages,30000);
        
    }

    async check_new_posts(){
        const response = await fetch('/api/new_posts');
        const data = await response.json();
        if(data.new_posts) { 
            this.setState({new_posts: true });
        }
    }

    async check_new_messages(){
        const response= await fetch('/api/new_messages');
        const data = await response.json();
        if(data.new_messages) { 
            this.setState({new_messages: true });
        }
    }

    render() {
        return <div>
            <ReactButton name='Home' relocation = '/pages/home.html'
             style={this.state.new_posts ? { color:'#f44336'} : { color:'none'}}/>
            <ReactButton name='Messages' relocation = '/pages/messages.html'
            style={this.state.new_messages ? { color:'#f44336'} : { color:'none'}}/>
            <ReactButton name='Admin' relocation = '/pages/admin.html'/>
            <ReactButton name='About' relocation = '/pages/about.html'/>
        </div>
    }
}



