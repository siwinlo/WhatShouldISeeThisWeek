import React from "react";
import { Parser } from "./parser";

export class Randomize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: undefined,
      randomUrl: undefined
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.randomizeURL = this.randomizeURL.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://qe8jl4jty7.execute-api.us-east-1.amazonaws.com/dev/?url=" +
        encodeURIComponent(
          "https://www.artforum.com/api/guide/entities-by-place-location/new-york?category=all&page=1&size=1&fetchAll=0"
        )
    )
      .then(function(response) {
        return response.json();
      })
      .then(myJson => {
        console.log("I got feetched");
        let url = this.randomizeURL(myJson.pages);
        console.log("totalpages", myJson.pages);
        console.log("url=", url);
        this.setState({ totalPages: myJson.pages, randomUrl: url });
      });
  }
  randomizeURL(totalPages) {
    return `https://www.artforum.com/api/guide/entities-by-place-location/new-york?category=all&page=${Math.floor(
      Math.random() * totalPages
    )}&size=1&fetchAll=0`;
  }

  render() {
    console.log(this.state.randomUrl);
    if (this.state.randomUrl !== undefined) {
      return <Parser url={this.state.randomUrl} />;
    } else {
      return <h2> loading </h2>;
    }
  }
}
