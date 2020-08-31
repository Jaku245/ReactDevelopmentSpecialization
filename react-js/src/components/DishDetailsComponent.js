import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';

class DishDetails extends Component {

    renderComments(dishComments) {
        const comments = dishComments.map((comment) => {
            return (
                <ul key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>--{comment.author},&nbsp;{new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(comment.date))}</p>
                </ul>
            );
        });
        return (
            <div>
                <h4>Comments</h4>
                <li className="list-unstyled">
                    {comments}
                </li>
            </div>
        );
    }

    render() {
        const dish = this.props.selectedDish;
        if (dish != null) {
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg width="100%" src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5">
                        {this.renderComments(dish.comments)}
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

export default DishDetails;