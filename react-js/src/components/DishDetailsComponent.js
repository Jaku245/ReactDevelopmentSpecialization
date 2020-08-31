import React from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';


function RenderComments({ dishComments }) {
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

function RenderDish({ dish }) {
    return (
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

const DishDetails = (props) => {
    const dish = props.selectedDish;
    if (dish != null) {
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={dish} />
                </div>
                <div className="col-12 col-md-5">
                    <RenderComments dishComments={dish.comments} />
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}


export default DishDetails;