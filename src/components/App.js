import React from 'react';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessageList'

class App extends React.Component{
    render(){
        return(
            <div className="container-fluid">
                <NavigationBar />
                <FlashMessagesList />
                {this.props.children}
            </div>
        );
    }
}

export default (App);
