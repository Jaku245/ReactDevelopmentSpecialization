import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { postComment,  postFeedback, fetchDishes, fetchPromos, fetchComments, fetchLeaders } from '../redux/actionCreator';

import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetails from './DishDetailsComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Footer from './FooterComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions
    }
}

const mapDispatchToProps = dispatch => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) },
    fetchPromos: () => { dispatch(fetchPromos()) },
    fetchComments: () => { dispatch(fetchComments()) },
    fetchLeaders: () => { dispatch(fetchLeaders()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
    postFeedback: (firstName,lastName,mobile,email,agree,contactType,message) => dispatch(postFeedback(firstName,lastName,mobile,email,agree,contactType,message))
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {

        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMess={this.props.promotions.errMess}
                    promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.leaders.filter((lead) => lead.featured)[0]}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMess}
                />
            );
        };

        const AboutUS = () => {
            return (
                <About leaders={this.props.leaders.leaders}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMess}
                />
            );
        };

        const DishWithId = ({ match }) => {
            return (
                <DishDetails dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    errMess={this.props.dishes.errMess}
                    isLoading={this.props.dishes.isLoading}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />
            );
        };

        return (
            <>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300} >
                        <Switch location={this.props.location} >
                            <Route path="/home" component={HomePage} />
                            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                            <Route path="/menu/:dishId" component={DishWithId} />
                            <Route path="/about" component={AboutUS} />
                            <Route path="/contact" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                            <Redirect to="/home" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
