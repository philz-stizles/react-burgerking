import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Layout from './hoc/Layout/Layout';
import { authCheckState } from './store/actions';

class App extends Component {
  componentDidMount() {
    this.props.onAuthCheckState()
  }

  render() {
    const { isAuthenticated }  = this.props

    let routes = (
      <Switch>
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if(isAuthenticated) {
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onAuthCheckState: () => dispatch(authCheckState()),
})

const mapStateToProps = ({ auth: { token } }) => ({
  isAuthenticated: token !== null
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
