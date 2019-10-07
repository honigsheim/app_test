import React from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';

const Base = ({ children }) => (
  <div>
    <Header />
    <main>
      {children}
    </main>
    <Footer />
  </div>
);

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Base);
