import React, {Component} from 'react';
import {connect} from 'react-redux';

//this is a higher order component (HOC) that wraps the incomming component 
//and attaches additional functionality to it
export default function (ComposedComponent) {
    class Authentication extends Component {
        
        //react blocks access to this.context by decault so we have to 
        //expost this static object telling react we want to use the router
        //object. (second value React.ProtoTypes.object is the type - 
        //boilerplate) 
        static contextTypes = {
            router: React.PropTypes.object
        }
        //if not authenticated at start, push to the home page
        componentWillMount() {
            if (!this.props.authenticated) {
                this.context.router.push('/')
            }
        } 
        //this one fires when component is updated
        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.context.router.push('/')
            }
        }
        
        render() {
            //the this.props is for passing up new props from the combined component *instance to 
            //existing props on the original composed component below
            //console.log(this.props.resources) // resourceList
            // console.log('Rendering', ComposedComponent);
            // console.log(this.props.authenticated);
            return <ComposedComponent {...this.props} />
            
        }
    }
    
    function mapStateToProps(state) {
        return {authenticated: state.auth.authenticated};
    }
    
    return connect(mapStateToProps)(Authentication);
}

////example usage of this HOC
// import Authenticatoin // this is the HOC
// import Resources // this is the component to wraps
// const ComposedComponent = Authentication(Resources);
//// in some render method...
// <ComposedComponent resources={resourceList}>

//------------------------

//boilerplate for HOC:
//import React, {Component} from 'react';
// export default function (ComposedComponent) {
//     class Authentication extends Component {
//         render() {
//             return <ComposedComponent {...this.props} />
//         }
//     }
    
//     return Authentication;
// }