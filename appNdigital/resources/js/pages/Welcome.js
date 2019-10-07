import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ReeValidate from 'ree-validate';
import classNames from 'classnames';
import AuthService from '../services';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
  console.log("Facebook", response);
}
const responseGoogle = (response) => {
  console.log("Google" ,response);
}
class Welcome extends Component {
  constructor() {
    super();

    this.validator = new ReeValidate({
      email: 'required|email',
      password: 'required|min:6',
    });

    this.state = {
      loading: false,
      email: '',
      password: '',
      errors: {},
      response: {
        error: false,
        message: '',
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    // If a field has a validation error, we'll clear it when corrected.
    const { errors } = this.state;
    if (name in errors) {
      const validation = this.validator.errors;
      this.validator.validate(name, value).then(() => {
        if (!validation.has(name)) {
          delete errors[name];
          this.setState({ errors });
        }
      });
    }
  }

  handleBlur = (e) => {
    const { name, value } = e.target;

    // Avoid validation until input has a value.
    if (value === '') {
      return;
    }

    const validation = this.validator.errors;
    this.validator.validate(name, value).then(() => {
      if (validation.has(name)) {
        const { errors } = this.state;
        errors[name] = validation.first(name);
        this.setState({ errors });
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const credentials = {
      email,
      password,
    };

    this.validator.validateAll(credentials)
      .then((success) => {
        if (success) {
          this.setState({ loading: true });
          this.submit(credentials);
        }
      });
  }

  submit = (credentials) => {
    this.props.dispatch(AuthService.login(credentials))
      .catch((err) => {
        this.loginForm.reset();
        const errors = Object.values(err.errors);
        errors.join(' ');
        const response = {
          error: true,
          message: errors,
        };
        this.setState({ response });
        this.setState({ loading: false });
      });
  }

  render() {
    // If user is already authenticated we redirect to entry location.
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return (
        <Redirect to={from} />
      );
    }

    const { response, errors, loading } = this.state;

    return (
      <div>
        <div className="d-flex flex-column flex-md-row align-items-md-center py-5">
          <div className="container">
            <div className="row">
              <div className="section-about col-lg-6 mb-4 mb-lg-0">
                <div>
                  <h2>Welcome Back</h2>
                  <p>Log in with your email address and password to fully enjoy the area.</p>
                </div>
              </div>
              <div className="section-login col-lg-6">
                <h4>Log in to the App</h4>

                <div className="card-login card mb-3">
                  <div className="card-body">

                    <form className="form-horizontal" method="POST" onSubmit={this.handleSubmit} ref={(el) => { this.loginForm = el; }}>

                      {response.error &&
                      <div className="alert alert-danger" role="alert">
                        Credentials were incorrect. Try again!
                      </div>
                      }

                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          className={classNames('form-control', {
                              'is-invalid': ('email' in errors),
                            })
                          }
                          placeholder="Enter email"
                          required
                          onChange={this.handleChange}
                          onBlur={this.handleBlur}
                          disabled={loading}
                        />

                        {('email' in errors) &&
                        <div className="invalid-feedback">{ errors.email }</div>
                        }
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          id="password"
                          type="password"
                          className={classNames('form-control', {
                              'is-invalid': ('password' in errors),
                            })
                          }
                          name="password"
                          placeholder="Enter password"
                          required
                          onChange={this.handleChange}
                          onBlur={this.handleBlur}
                          disabled={loading}
                        />
                        {('password' in errors) &&
                        <div className="invalid-feedback">{ errors.password }</div>
                        }
                      </div>

                      <div className="form-group text-center">
                        <button
                          type="submit"
                          className={classNames('btn btn-primary', {
                            'btn-loading': loading,
                          })}
                        >
                          Sign In
                        </button>
                      </div>


                      <div className="login-invite-text text-center">{'Don\'t have an account?'} <Link style={{color: 'black'}} to="/register">Register</Link>.</div>
                    </form>
                  </div>
                </div>
                <div className="card-login card mb-3">
                  <div className="card-body">
                  <h4>Log-in via Google or Facebook</h4>
                    <GoogleLogin
                        clientId="41379440257-h0hfmags3ssm9k51c1a21pli7vs5eva7.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                      />

                      <br></br>
                      <br></br>

                    <FacebookLogin
                    appId="456634008515157"
                    fields="name,email,picture"
                    callback={responseFacebook}
                    /> 
                  </div>
                </div>

                <div className="password-reset-link text-center">
                  <Link style={{color: 'black'}}to="/forgot-password">
                    Forgot Your Password?
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Welcome.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Welcome);
