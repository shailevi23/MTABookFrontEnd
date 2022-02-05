
// class ReactButton extends React.Component {
//     constructor(props) {
//       super(props);
//       this.handle_click = this.handle_click.bind(this);
//     }

//     handle_click() {
//       window.location.href = this.props.relocation;
//     }

//     render() {
//       return <button
//         onClick={this.handle_click}>{this.props.name ? this.props.name : 'No idea'}
//       </button>
//     }
//   }

// import ReactButton from './ReactButton';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.handle_home_click = this.handle_home_click.bind(this);
        this.handle_messages_click = this.handle_messages_click.bind(this);
        this.state = { isNewMessage: false, isNewPost: false };
    }

    async handle_home_click() {
        const newState = !isNewMessage;
        this.setState({ isNewMessage: newState });
    }

    async handle_messages_click() {
        const newState = !isNewPost;
        this.setState({ isNewPost: newState });
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'button',
                { onClick: this.handle_home_click },
                React.createElement(ReactButton, { name: 'Home', relocation: '/pages/home.html' })
            ),
            React.createElement(
                'button',
                { onClick: this.handle_messages_click },
                React.createElement(ReactButton, { name: 'Messages', relocation: '/pages/messages.html' })
            ),
            React.createElement(ReactButton, { name: 'Admin', relocation: '/pages/admin.html' }),
            React.createElement(ReactButton, { name: 'About', relocation: '/pages/about.html' })
        );
    }
}

// export default NavigationBar;