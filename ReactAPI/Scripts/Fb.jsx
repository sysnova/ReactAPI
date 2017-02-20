var comments = [
  { Id: 1, Author: "Daniel Lo Nigro", Text: "Hello ReactJS.NET World!" },
  { Id: 2, Author: "Pete Hunt", Text: "This is one comment" },
  { Id: 3, Author: "Jordan Walke", Text: "This is another comment" }
];

function AuthorList(props) {
    const authors = props.comments;
    const listComments = authors.map((data) =>
        <li key={data.Id}>
          {data.Author}, {data.Text}
        </li>
  );
return (
  <ul>{listComments}</ul>
);
}

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
          <form onSubmit={this.handleSubmit}>
        <label>
            Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
    }
}

class EssayForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Please write an essay about your favorite DOM element.'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
          <form onSubmit={this.handleSubmit}>
        <label>
            Name:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
        }
}

function CustomTextInput(props) {
    // textInput must be declared here so the ref callback can refer to it
    let textInput = props.texto;

    function handleClick() {
        textInput.focus();
    }

    return (
      <div>
        <input
          type="text"
               
        ref={(input) => { textInput = input; }} />
<input
type="button"
value="Focus the text input"
onClick={handleClick}
/>
</div>
  );  
}

let modals = (
  <div>
    <AuthorList comments={comments } />,
    <NameForm />,
    <EssayForm />,
    <CustomTextInput texto="valor inicial"/>,
  </div>
);

// RENDER PRINCIPAL
ReactDOM.render(
  modals,
  document.getElementById('root')
);
