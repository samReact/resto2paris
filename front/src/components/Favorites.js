import React, { Component } from 'react';

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            favorites: []
        };
    }

    componentDidMount() {
        // init.InitDb();
        fetch(`/api/favorites/54`, {
          method: "get"
        })
          .then(res => res.json(), err => this.setState({ flash: err.flash }))
          .then(favorites =>
            this.setState({
              favorites: favorites,
              loading: false
            })
          );
      }
    render() {
        return (

            
        );
    }
}

export default Favorites;