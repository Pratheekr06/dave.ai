import React, { Component } from "react";
import Header from "../../components/Header/Header";
import { Container } from "react-bootstrap";
import axios from "axios";
import ReviewInfo from "../../components/ReviewInfo/ReviewInfo";

class Review extends Component {
  state = {
    review: [],
  };

  componentDidMount() {
    axios
      .get("https://cors-anywhere.herokuapp.com/http://www.i2ce.in/" + this.props.match.params.id, {
        headers: {
          "Content-type": "application/json",
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then((response) => {
        let array_response = [response.data];
        this.setState({
          review: array_response,
        });
        console.log(response.data);
      });
  }

  render() {
    const { review } = this.state;
    let reviewInfo = review.map((data) => {
      return (
        <ReviewInfo
          key={data._id}
          id={data._id}
          name={data.name}
          title={data.title}
          comment={data.comment}
          usefulness={data.usefulness}
          deliveryDate={data.deliveryDate}
          rating={data.rating}
        />
      );
    });

    return (
      <>
        <Header />
        <Container className="my-4">{reviewInfo}</Container>
      </>
    );
  }
}

export default Review;
