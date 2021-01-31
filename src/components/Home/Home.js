import React, { Component } from "react";
import Header from "../Header/Header";
import { Container, Jumbotron, Button, Card, Row, Col, Form, Pagination } from "react-bootstrap";
import styles from "./Home.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Home extends Component {
  state = {
    review: [],
    productId: '',
    viewerId: '',
    currentPage: 1,
    reviewsPerPage: 3,
  };

  componentDidMount() {
    axios
      .get("https://cors-anywhere.herokuapp.com/http://www.i2ce.in/", {
        headers: {
          "Content-type": "application/json",
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then((res) => {
        let array_response = [res.data];
        this.setState({
          review: array_response,
        })
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleProductIdChange = e => {
    this.setState({
      productId: e.target.value,
    });
  };

  handleViewerIdChange = e => {
    this.setState({
      viewerId: e.target.value,
    });
  }

  handleSubmit = e => {
    e.stopPropagation();
    const { productId, viewerId } = this.state;
    axios.get(`https://cors-anywhere.herokuapp.com/http://www.i2ce.in/${productId}/${viewerId}`, {
      headers: {
        "Content-type": "application/json",
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(res => {
        let array_response = [res.data];
        this.setState({
          review: array_response,
        })
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handlePagination = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { review } = this.state;
    const { currentPage, reviewsPerPage } = this.state;

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReview = review.slice(indexOfFirstReview, indexOfLastReview);

    const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(review.length / reviewsPerPage); i++) {
          pageNumbers.push(i);
        }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
          <Pagination.Item
            className="p-1"
            key={number}
            id={number}
            onClick={this.handlePagination}
          >
            {number}
          </Pagination.Item>
        );
      });    

    let reviewData = currentReview.map((data) => {
      return (
        <Col xs={4}>
        <Card
          className="ml-3"
          key={data._id}
          style={{ width: "18rem", display: "inline-flex" }}
        >
          <Card.Body>
            <Card.Title className={styles.Align}>{data.title}</Card.Title>
            <Card.Text>
              {data.comment}
            </Card.Text>
            <Card.Text>
              {data.usefulness}
            </Card.Text>
            <Card.Text>
              {data.name}
            </Card.Text>
            <Card.Text>
            {data.rating}/5
            </Card.Text>
            <Button className={styles.Button2} variant="info">
              <NavLink to={"https://cors-anywhere.herokuapp.com//http://www.i2ce.in/" + data._id}>More Info</NavLink>
            </Button>
          </Card.Body>
        </Card>
        </Col>
      );
    });

    return (
      <>
        <Header />
        <Container className="my-4">
          <Jumbotron className="py-5 px-5">
            <h1 className={styles.Product}>Product Review Portal</h1>
            <p className={styles.Para1}>Select the Product of your choice to read reviews on it</p>
            <p className={styles.Para1}>
              Don't know which Product to choose.? Select from the Product IDs
            </p>
            <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col xs={3}>
              <Form.Label>Product IDs</Form.Label>
              <Form.Control
                variant="primary"
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                custom
                onChange={e => this.handleProductIdChange(e)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
              </Form.Control>
              </Col>
              <Col xs={3}>
              <Form.Label>Viewers IDs</Form.Label>
              <Form.Control
                variant="primary"
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                custom
                onChange={e => this.handleViewerIdChange(e)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
              </Form.Control>
              </Col>
            </Row>
            <Button onSubmit={this.handleSubmit} type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          </Jumbotron>
          <Row>
            {reviewData}
          </Row>
          <Row>
            <Col>
            <Pagination className={styles.Pagination}>
              {renderPageNumbers}
            </Pagination>  
            </Col>  
          </Row>    
        </Container>
      </>
    );
  }
}

export default Home;
