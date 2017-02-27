class ProductCategoryRow extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
          <tr>
            <th colSpan="2">{this.props.category}</th>
          </tr>
      )
    }
}

class ProductRow extends React.Component {
    constructor() {
        super();
    }

    render() {
        var name = !this.props.product.stocked
              ? <span style={{ color: 'red' } }>{this.props.product.name}</span>
              : this.props.product.name
        return (
          <tr>
            <td>{name}</td>
            <td>{this.props.product.price}</td>
          </tr>
        )
    }
}

class ProductTable extends React.Component {
    constructor() {
        super();
    }

    render() {
        var rows = [];
        var lastCategory = null;
        var currentProducts = this.props.products;
        var filterTextCurrent = this.props.filterText;
        var inStockOnlyCurrent = this.props.inStockOnly;

        //if (filterTextCurrent !== "") {
        //  currentProducts = currentProducts.filter(function(product){
        //    return product.name.indexOf(filterTextCurrent) !== -1;
        //  })
        //}
        //console.log(currentProducts);
        currentProducts.forEach(
            function (product) {
                if (product.name.indexOf(filterTextCurrent) === -1 || (!product.stocked && inStockOnlyCurrent)) {
                    return;
                }
                if (product.category !== lastCategory) {
                    rows.push(<ProductCategoryRow category={product.category} key={product.category } />);
                }
                rows.push(<ProductRow product={product} key={product.name } />);
                lastCategory = product.category;
            }
        )
        return (
                        <table>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>{rows}</tbody>
                        </table>
                      )
    }
}

class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = { texto: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onUserInput(
          this.refs.filterTextInput.value,
          this.refs.inStockInput.checked
        )
    }
    render() {
        return (
            <form>
                <input type="text" placeholder="Enter search..." value={this.props.filterText} onChange={this.handleChange} ref="filterTextInput" />
                <p>
                <input type="checkbox" checked={this.props.inStockOnly} ref="inStockInput" onChange={this.handleChange} /> { ' ' }
                    Only show products in stock
                </p>
            </form>
        )
    }
}


class FilterableProductTable extends React.Component {
    constructor() {
        super();
        this.state = {
            filterText: '',
            inStockOnly: false
        }
        this.onUserInput = this.onUserInput.bind(this);
    }

    onUserInput(filterText, inStockOnly) {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        })
    }

    render() {
        return (
            <div>
                <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} onUserInput={this.onUserInput} />
                <ProductTable products={this.props.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
            </div>
              )
    }
}

var data = [
  { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
  { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
  { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
  { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
  { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 11" }
];

ReactDOM.render(<FilterableProductTable products={data } />, document.getElementById('root'));