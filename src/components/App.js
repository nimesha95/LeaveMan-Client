import React from 'react';
import { hot } from 'react-hot-loader';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessageList'

class App extends React.Component{
    render(){
        return(
            <div className="container">
                <NavigationBar />
                <FlashMessagesList />
                {this.props.children}
            </div>
        );
    }
}

export default (App);
