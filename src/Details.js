import { Component } from "react";
import { useParams } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Carousel from "./Carousel";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = { loading: true };
  // }
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();

    this.setState({ loading: false, ...json.pets[0] });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  adopt = () => {
    return (window.location = "http://bit.ly/pet-adopt");
  };

  render() {
    if (this.state.loading) {
      return <h2>loading ...</h2>;
    }

    const { name, animal, breed, city, state, description, images, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal.charAt(0).toUpperCase() + animal.substring(1)} – {breed} –{" "}
            {city}, {state}
          </h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>

          {/* Modal Logic */}
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <ThemeContext.Consumer>
                    {([theme]) => (
                      <button
                        onClick={this.adopt}
                        style={{ backgroundColor: theme }}
                      >
                        Yes, please
                      </button>
                    )}
                  </ThemeContext.Consumer>
                  <ThemeContext.Consumer>
                    {([theme]) => (
                      <button
                        onClick={this.toggleModal}
                        style={{ backgroundColor: theme }}
                      >
                        No
                      </button>
                    )}
                  </ThemeContext.Consumer>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

// wrapping Details (class component) inside
// function component, in order to use Hooks
const WrappedDetails = () => {
  const params = useParams();
  return (
    <ErrorBoundary>
      <Details params={params} />
    </ErrorBoundary>
  );
};

export default WrappedDetails;
