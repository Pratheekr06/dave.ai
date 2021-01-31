import React from "react";
import { Card } from "react-bootstrap";
import styles from "./ReviewInfo.module.css";

const BlogInfo = (props) => {
  return (
    <div key={props.id}>
      <h2>{props.title}</h2>
      <Card className="mt-3">
        <Card.Body>
          <Card.Text className={styles.Comment}>{props.comment}</Card.Text>
          <Card.Text>{props.usefulness}</Card.Text>
          <Card.Text>Ratings : {props.rating}/5</Card.Text>
          <Card.Text className={styles.Name}>
            Posted By : {props.name}
          </Card.Text>
          <Card.Text>{props.deliveryDate}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BlogInfo;
