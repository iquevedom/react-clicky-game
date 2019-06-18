import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import friend from "./friends.json";
//import Wrapper from "./components/Wrapper";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friend,
    clickedFriend:[],
    score:0
  };
//when you click on a card ... the fish is taken out of the array
imageClick = event => {
  const currentFriend = event.target.alt;
  const FriendAlreadyClicked =
    this.state.clickedFriend.indexOf(currentFriend) > -1;

//if you click on a fish that has already been selected, the game is reset and cards reordered
  if (FriendAlreadyClicked) {
    this.setState({
      friend: this.state.friend.sort(function(a, b) {
        return 0.5 - Math.random();
      }),
      clickedFriend: [],
      score: 0
    });
      alert("You lose. Play again?");

//if you click on an available fish, your score is increased and cards reordered
  } else {
    this.setState(
      {
        friend: this.state.friend.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedFriend: this.state.clickedFriend.concat(
          currentFriend
        ),
        score: this.state.score + 1
      },
//if you get all 12 fish corrent you get a congrats message and the game resets        
      () => {
        if (this.state.score === 15) {
          alert("Wow! 15 ... Maximum score!");
          this.setState({
            friend: this.state.friend.sort(function(a, b) {
              return 0.5 - Math.random();
            }),
            clickedFriend: [],
            score: 0
          });
        }
      }
    );
  }
};


//  removeFriend = id => {
// Filter this.state.friends for friends with an id not equal to the id being removed
//    const friend = this.state.friend.filter(friend => friend.id !== id);
//    // Set this.state.friends equal to the new friends array
//    this.setState({ friend });
//  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.friend.map(friend => (
            <FriendCard
              imageClick={this.imageClick}
              id={friend.id}
              key={friend.id}
              image={friend.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;
