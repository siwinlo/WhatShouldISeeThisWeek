import React from "react";

export class Parser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: undefined,
      title: undefined,
      venue: undefined,
      location: undefined,
      startDate: undefined,
      endDate: undefined,
      description: undefined,
      link: undefined,
      imageSrc: undefined,
      imageCaption: undefined,
      images: []
    };
    this.fetchFirstPage = this.fetchFirstPage.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  fetchFirstPage() {
    fetch(
      "https://qe8jl4jty7.execute-api.us-east-1.amazonaws.com/dev/?url=" +
        encodeURIComponent(this.props.url)
    )
      .then(function(response) {
        return response.json();
      })
      .then(myJson => {
        console.log(JSON.stringify(myJson));
        const info = myJson._embedded.location[0];
        const images = info.images;
        this.setState({
          artist: info.title.split("\n")[0],
          title: info.title.split("\n")[1],
          venue: info.location.name,
          address: info.location.address,
          hours: info.location.hours,
          startDate: info.showStart.substring(0, 10),
          endDate: info.showEnd.substring(0, 10),
          dates: `${info.showStart.substring(
            0,
            10
          )} to ${info.showEnd.substring(0, 10)}`,
          description: info.descriptionExtended,
          link: info.path,
          imageSrc: `https://artforum.com${images[0].pathLarge}`,
          imageCaption: images[0].captionFormatted
        });
      });
  }
  componentDidMount() {
    this.fetchFirstPage();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.fetchFirstPage();
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.artist}</h1>
        <h2>{this.state.title} </h2>
        <h3> {this.state.venue} </h3>
        <p> {this.state.address} </p>
        <p> {this.state.hours} </p>
        <p>{this.state.dates}</p>
        <blockquote> {this.state.description} </blockquote>
        <br />
        <img src={this.state.imageSrc} alt={this.state.imageCaption} /> <br />
        <p>
          <small>{this.state.imageCaption}</small>
        </p>
      </div>
    );
  }
}
