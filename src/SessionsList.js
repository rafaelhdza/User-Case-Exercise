import React, { Component } from 'react';
import { Link } from '@reach/router';

class SessionsList extends Component {
    render() {
        const {sessions} = this.props;
        const mySessions = sessions.map(item => {
            return(<div>
                <div className="list-group-item d-flex" key={item.sessionID}>
                    <section className = "pl-3 text-left align-self-center">
                        {item.sessionName}
                    </section>
                </div>
            </div>)
        })

        return (
            <div>{mySessions}</div>
        );
    }
}

export default SessionsList;
