import React from 'react';
import Header from './Header';
import MainSection from './MainSection';
import Footer from './Footer';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <MainSection />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
