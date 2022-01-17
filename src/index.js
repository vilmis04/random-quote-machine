import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function QuoteText(props) {
    return (
        <div id='text'>
            {props.quote}
        </div>
    );
}

function QuoteAuthor(props) {
    return (
        <div id='author'>
            {props.author}
        </div>
    );
}


function ShareButton(props) {
    return null;
}

function NewQuoteButton(props) {
    return (
        <button id="new-quote">
            <i className=''></i>
        </button>
    );
}




class QuoteBox extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            quote: "test",
            author: "testtest"
        }
        this.quoteList = [];
    }
    componentDidMount() {
        fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
            .then(res => res.json())
            .then(quoteList => {
                this.quoteList = quoteList.quotes;
                const randomNo = Math.floor(Math.random()*this.quoteList.length+1);
                this.setState({
                    quote: this.quoteList[randomNo].quote,
                    author: this.quoteList[randomNo].author
                });
            });
    }

    render () {
        return (
            <div id='quote-box'>
                <QuoteText quote={this.state.quote} />
                <QuoteAuthor author={this.state.author} />
                <div>
                    <div>
                        <ShareButton media="twitter" />
                        <ShareButton media="tumblr" />
                    </div>
                        <NewQuoteButton />
                </div>
            </div>
        );
    }
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "green"
        }
    }

    render() {
        return (<QuoteBox color={this.state.color} />);
        // return (
        // <div>
        //     a;soidfasdjfasdjf;alskdjf;alsdknfiasdbfiausdfg
        // </div>);
    }
}

//========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
