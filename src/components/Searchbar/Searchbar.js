import React, {Component} from 'react';
import actions from '../../redux/actions';
import store from '../../redux/store';
import Input from '../Form/Input';
import SVG from '../SVG/SVG';
import searchSVG from '../../svg/search.svg';
import './Searchbar.sass';

class Searchbar extends Component {
  constructor() {
    super();

    this.state = {
      query: ''
    };

    this.timer = null;
    this.smartSearch = this
      .smartSearch
      .bind(this);
  }

  setQuery() {
    store.dispatch(actions.setSearchQuery(this.state.query));
  }

  componentDidMount() {
    this.setState({query: this.props.searchQuery});
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  // limit the number of times we 'setSearchQuery'
  smartSearch() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.setQuery(), 300);
  }

  render() {
    let markup = null;

    if (this.props.user) {
      markup = (
        <div className="Searchbar" onKeyUp={this.smartSearch}>
          <Input
            type="text"
            placeholder="how to fix stuff..."
            value={this.state.query}
            onChange={e => this.setState({query: e.target.value})}/>
          <SVG file={searchSVG} name="searchSVG"/>
        </div>
      );
    }

    return markup;
  }
}

export default Searchbar;
