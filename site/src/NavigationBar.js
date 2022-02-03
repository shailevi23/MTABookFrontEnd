
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
    }

    render() {
        return <div>
            <ReactButton name='Home' relocation = '/pages/home.html'/>
            <ReactButton name='Messages' relocation = '/pages/messages.html'/>
            <ReactButton name='Admin' relocation = '/pages/admin.html'/>
            <ReactButton name='About' relocation = '/pages/about.html'/>
        </div>
    }
}

// export default NavigationBar;


