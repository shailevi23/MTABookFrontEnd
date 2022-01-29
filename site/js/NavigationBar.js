class ReactButton extends React.Component {
  constructor(props) {
    super(props);
    this.handle_click = this.handle_click.bind(this);
  }

  handle_click() {
    window.location.href = this.props.relocation;
  }

  render() {
    return React.createElement(
      'button',
      {
        onClick: this.handle_click },
      this.props.name ? this.props.name : 'No idea'
    );
  }
}

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(ReactButton, { name: 'Home', relocation: '/pages/home.html' }),
      React.createElement(ReactButton, { name: 'Messages', relocation: '/pages/messages.html' }),
      React.createElement(ReactButton, { name: 'Admin', relocation: '/pages/admin.html' }),
      React.createElement(ReactButton, { name: 'About', relocation: '/pages/about.html' })
    );
  }
}