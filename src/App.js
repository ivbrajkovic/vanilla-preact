import { Component } from 'https://unpkg.com/preact@10.0.0/dist/preact.module.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      list: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ input: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    doSearch(this.state.input).then(hits => this.setState({ list: hits }));
  }

  async doSearch(query) {
    const url = `https://hn.algolia.com/api/v1/search?query=${query}&hitsPerPage=30`;

    const response = await fetch(url);
    const result = await response.json();
    return result.hits;
  }

  render() {
    const { input, list } = this.state;

    return html`
      <div>
        <h1>Search Hacker News with Preact</h1>
        <form type="submit" onSubmit=${this.onSubmit}>
          <input type="text" onChange=${this.onChange} value=${input} />
          <button type="text">Search</button>
        </form>
        <br />
        ${list.map(
          item =>
            html`
              <div key=${item.objectID}>
                <a href=${item.url} target="_blank" rel="noopener noreferrer">
                  ${item.title}
                </a>
                <hr />
                <br />
              </div>
            `
        )}
      </div>
    `;
  }
}

export default App;
