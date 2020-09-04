import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addComment } from '../redux/actionCreator';

import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetails from './DishDetailsComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Footer from './FooterComponent';

const mapStateToProps = state => {
    return {
        dishes : state.dishes,
        comments : state.comments,
        leaders : state.leaders,
        promotions : state.promotions
    }
}

const mapDispatchToProps = dispatch => ({
    addComment : (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});
class Main extends Component {

    render() {

        const HomePage = () => {
            return(
                <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                leader={this.props.leaders.filter((lead) => lead.featured)[0]}
                promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                />
            );
        };

        const AboutUS = () => {
            return(
                <About leaders={this.props.leaders} />
            );
        };

        const DishWithId = ({match}) => {
            return(
                <DishDetails dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                addComment = {this.props.addComment}
                />
            );
        };

        return (
            <div>
                <Header />

                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/about" component={AboutUS} />
                    <Redirect to="/home" />
                </Switch>

                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
