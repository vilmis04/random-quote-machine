import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function QuoteText(props) {
    const styles = {
        color: props.color
    }
    return (
        <div id='text' style={styles}>
            <i className="fas fa-quote-left"></i> {props.quote}
        </div>
    );
}

function QuoteAuthor(props) {
    const styles = {
        color: props.color
    }
    return (
        <div id='author' style={styles}>
            -{props.author}
        </div>
    );
}


function ShareButton(props) {
    const styles = {
        fontSize: "2rem",
        color: props.color
    }
    if (props.media == "twitter") {
        return (
            <a id='tweet-quote' href="twitter.com/intent/tweet" style={styles}>
                <i className='fab fa-twitter-square'></i>
            </a>
        );
    } else {
        return (
            <a id='tumblr-quote' href='#' style={styles}>
                <i className='fab fa-tumblr-square'></i>
            </a>
        );
    }
}

function NewQuoteButton(props) {
    const styles = {
        backgroundColor: props.color
    }
    return (
        <button onClick={props.generateQuote} id="new-quote" style={styles}>
            New Quote
        </button>
    );
}




class QuoteBox extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            quote: "",
            author: ""
        }
        this.quoteList = [];
        this.generateQuote = this.generateQuote.bind(this);
    }
    componentDidMount() {
        fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
            .then(res => res.json())
            .then(quoteList => {
                this.quoteList = quoteList.quotes;
                const rand = Math.floor(Math.random()*this.quoteList.length+1);
                this.setState({
                    quote: this.quoteList[rand].quote,
                    author: this.quoteList[rand].author
                });
            });
    }

    generateQuote() {
        const rand = Math.floor(Math.random()*this.quoteList.length+1);
        this.setState({
            quote: this.quoteList[rand].quote,
            author: this.quoteList[rand].author
        });
    }

    render () {
        const styles = {
            backgroundColor: "white",
            width: 550,
            padding: "1rem"
        }
        return (
            <div id='quote-box' style={styles}>
                <QuoteText quote={this.state.quote} color={this.props.color}/>
                <QuoteAuthor author={this.state.author} color={this.props.color}/>
                <div>
                    <div>
                        <ShareButton media="twitter" color={this.props.color}/>
                        <ShareButton media="tumblr" color={this.props.color}/>
                    </div>
                        <NewQuoteButton generateQuote={this.generateQuote} 
                        color={this.props.color}/>
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
        const styles = {
            backgroundColor: this.state.color,
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }

        return (
            <div style={styles}>
                <QuoteBox color={this.state.color} />
            </div>);
    }
}

//========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
