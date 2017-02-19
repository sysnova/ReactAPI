var data = [
  { Id: 1, Author: "Daniel Lo Nigro", Text: "Hello ReactJS.NET World!" },
  { Id: 2, Author: "Pete Hunt", Text: "This is one comment" },
  { Id: 3, Author: "Jordan Walke", Text: "This is another comment" }
];

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
    <li>{number}</li>
);

var CommentBox = React.createClass({
    render: function() {
        return (
          <div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={this.props.data} />
            <CommentForm />
          </div>
        );
    }
});


ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('content')
);


ReactDOM.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);

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

var CommentForm = React.createClass({
    render: function() {
        return (
          <div className="commentForm">
            Hello, world! I am a CommentForm.
          </div>
      );
    }
});

var CommentBox = React.createClass({
    render: function() {
        return (
          <div className="commentBox">
            <h1>Comments</h1>
            <CommentList />
            <CommentForm />
          </div>
      );
    }
});

var Comment = React.createClass({
    rawMarkup: function() {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },

    render: function() {
        return (
          <div className="comment">
            <h2 className="commentAuthor">
              {this.props.author}
            </h2>
            <span dangerouslySetInnerHTML={this.rawMarkup()} />
          </div>
      );
    }
});

//"use strict";
//var HelloWorld = React.createClass({
//    render: function () {
//        return React.createElement("h1", null, "Hello World!");
//    },
//});

//var mainElement = document.querySelector("main");
//ReactDOM.render(React.createElement(HelloWorld), mainElement);
