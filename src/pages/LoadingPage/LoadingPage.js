import React, {Component} from 'react';
import Loader from '../../components/Loader/Loader';
import './LoadingPage.sass';

class LoadingPage extends Component {
  redirect() {
    const {dataReady, history} = this.props;
    if (!dataReady) {
      return;
    }
    history.push('/login');
  }

  componentDidUpdate() {
    this.redirect();
  }

  componentDidMount() {
    this.redirect();
  }

  render() {
    return <Loader/>;
  }
}

export default LoadingPage;
