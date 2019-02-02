import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component{
    state = {
        seenIndexes: [],
        values: {},
        index: '',
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({values: values.data});
    };
    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({seenIndexes: seenIndexes.data});
    };

    handleSubmi = async (event) => {
        event.preventDefault()

        await axios.post('/api/values', {
            index: this.state.index
        })

        this.setState({ index: ''});
    };

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }

    renderValues() {
        const eateries = [];

        for( let key in this.state.values) {
            eateries.push(
                <div key={key}>
                    For index {key} I calculated {this.state.values[key]}
                </div>
            );
        }

        return eateries;
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmi}>
                    <lable>
                        Enter your index:
                    </lable>
                    <input
                    value={this.state.index}
                    onChange={event => this.setState({index: event.target.value})}
                    />
                    <button>Submit</button>
                </form>
                <h3>Indexes i have seen: </h3>
                {this.renderSeenIndexes()}

                <h3>Calculated values: </h3>
                {this.renderValues()}
            </div>
        );
    }
}

export default Fib;