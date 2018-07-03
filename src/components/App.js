import React from 'react';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessageList'
import LandingPageComponent from './LandingPageComponent';

class App extends React.Component{
    render(){
        var currentLocation = this.props.location.pathname
        console.log(currentLocation);

        var landing_page;
        if (currentLocation == "/") {
        landing_page = <LandingPageComponent/>;
        } else {
        landing_page = <span></span>;
        }


        return(
            <div className="container-fluid">
                <NavigationBar />
                <FlashMessagesList />
                {landing_page}
                {this.props.children}
            </div>
        );
    }
}

export default (App);
