
class ReactButton extends React.Component {
  constructor(props) {
    super(props);
    this.handle_click = this.handle_click.bind( this );
  }

  handle_click()
  {
	  // window.location.href='/pages/sign.html';
    window.location.href=this.props.relocation;
  }

  // render() {
  //   return <button>{this.props.name ? this.props.name : 'No idea' }</button>
  // }

  render() {
    return <button   
				onClick={this.handle_click}>{this.props.name ? this.props.name : 'No idea' }
			</button>
    // <Link to="/signup.html" className="btn btn-primary">Sign up</Link>
  }

  
}
