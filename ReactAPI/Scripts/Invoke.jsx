var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', this.props.url, true);
    xhr.onload = function() {
      var data = JSON.parse(xhr.responseText);
      this.setState({ data: data });
    }.bind(this);
    xhr.send();
    this.logPhrase({ Phrase: 'Load Comment', Id: this.state.intervalId });

  },
  handleCommentSubmit: function(comment) {
    var data = new FormData();
    data.append('Author', comment.Author);
    data.append('Text', comment.Text);

    var xhr = new XMLHttpRequest();
    xhr.open('post', this.props.submitUrl, true);
    xhr.onload = function () {
        if (this.state.pressBoton)
            this.loadCommentsFromServer();
    }.bind(this);
    xhr.send(data);
    this.logPhrase({ Phrase: 'Submit', Id: this.state.intervalId });

  },
  setButtonValue: function (value){

      this.setState({ pressBoton: value });

      if (value) {
          interval = window.setInterval(this.loadCommentsFromServer, this.props.pollInterval)
          this.setState({ intervalId: interval });
          this.logPhrase({ Phrase: 'Set Interval Button', Id: this.state.intervalId });
      }
      else
      {
          clearInterval(this.state.intervalId);
          this.logPhrase({ Phrase: 'Clear Interval Button', Id: this.state.intervalId });
      }
      this.logPhrase({ Phrase: 'Button Press', Id: this.state.intervalId });
  },
  getInitialState: function () {
      return { data: [], pressBoton: false, intervalId: null};
  },
  componentDidMount: function() {
     //this.loadCommentsFromServer();
    //window.setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  logPhrase(comment) {
      console.log(comment.Phrase + ":" + comment.Id);
  },
  componentWillUnmount: function () {
      // use intervalId from the state to clear the interval
      clearInterval(this.state.intervalId);
      this.logPhrase({ Phrase: 'Clear Interval UnMount', Id: this.state.intervalId });

  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        <Toggle onReadComment={this.loadCommentsFromServer} getPress={this.setButtonValue}/>
      </div>
    );
  }
});

var CommentForm = React.createClass({
  getInitialState: function() {
      return { author: '', text: '' };
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({Author: author, Text: text});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text"
               placeholder="Your name"
               value={this.state.author}
               onChange={this.handleAuthorChange} />
        <input type="text"
               placeholder="Say something..."
               value={this.state.text}
               onChange={this.handleTextChange} />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
              <Comment author={comment.Author} key={comment.Id}>
                    {comment.Text}
              </Comment>
            );
});
return (
  <div className="commentList">
    {commentNodes}
  </div>
            );
}
});

var Comment = React.createClass({
    render: function() {
        return (
          <div className="comment">
            <h2 className="commentAuthor">
              {this.props.author}
            </h2>
        {this.props.children}
        </div>
      );
    }
});

var Toggle = React.createClass({
    getInitialState: function () {
        return { isToggleOn: false };
    },

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));

        this.props.getPress(!this.state.isToggleOn);

        //if (this.state.isToggleOn) -- Actualiza cdo aprieto el boton ON/OFF
        //    this.props.onReadComment();

        this.logPhrase();
    },

    logPhrase() {
        console.log('Toggle button' + !this.state.isToggleOn);
    },

    render() {
        return (
            <button onClick={this.handleClick }>
                 {this.state.isToggleOn ? 'OFF' : 'ON'}
            </button>
        );
    }
});

ReactDOM.render(
  <CommentBox url="/ReactAPI/comments" submitUrl="/ReactAPI/comments/new" pollInterval={2000} />,
  document.getElementById('root')
);