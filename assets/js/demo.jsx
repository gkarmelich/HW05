import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root, channel) {
    ReactDOM.render( <Demo channel = {channel} / > , root);
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;

    this.state = {
      cards: ["CLICK TO GUESS", "CLICK TO GUESS", "CLICK TO GUESS", "CLICK TO GUESS", 
              "CLICK TO GUESS", "CLICK TO GUESS", "CLICK TO GUESS", "CLICK TO GUESS", 
              "CLICK TO GUESS", "CLICK TO GUESS", "CLICK TO GUESS", "CLICK TO GUESS", 
              "CLICK TO GUESS", "CLICK TO GUESS", "CLICK TO GUESS", "CLICK TO GUESS"],
      status: [null, null, null, null,
               null, null, null, null,
               null, null, null, null,
               null, null, null, null],
      score: 0
    };

    this.channel.join()
      .receive("ok", this.gotView.bind(this))
      .receive("error", resp => {console.log("Unable to join", resp)});
  }

  gotView(view) {
    this.setState(view.game);

    let clicks = _.filter(this.state.status, (chan) => chan == "attempts");

    if (clicks.length == 2) {
      setTimeout(
        () => this.channel.push("match").receive("ok", this.gotView.bind(this)),
        1000
      );
    }
  }

  clicksToServer(index) {
      let ind = index;
      let view = this.gotView.bind(this);
      let chan = this.channel;

      return function (event) {
        chan.push("clicked", { index: ind })
          .receive("ok", view);
      }
  }

  restart() {
    setTimeout(
      () => this.channel.push("restart").receive("ok", this.gotView.bind(this)),
      1000
    );
  }

  render() {
    return (
      <div>
        <div className="table">
          <div className="row">
            <Table
              state={this.state}
              select={this.clicksToServer.bind(this)}
              index={0} />
            <Table
              state={this.state}
              select={this.clicksToServer.bind(this)}
              index={1} />
            <Table
              state={this.state}
              select={this.clicksToServer.bind(this)}
              index={2} />
            <Table
              state={this.state}
              select={this.clicksToServer.bind(this)}
              index={3} />
          </div>
          <div className="row">
            <Table
              state={this.state}
              select={this.clicksToServer.bind(this)}
              index={4} />
            <Table
              state={this.state}
              select={this.clicksToServer.bind(this)}
              index={5} />
            <Table
              state={this.state}
              select={this.clicksToServer.bind(this)}
              index={6} />
            <Table
              state={this.state}
              select={this.clicksToServer.bind(this)}
              index={7} />
          </div>
          <div className="row">
            <Table
              state={this.state}
              select={this.clicksToServer.bind(this)}
              index={8} />
            <Table
              state={this.state}
              select={this.clicksToServer.bind(this)}
              index={9} />
            <Table
              state={this.state}
              select={this.clicksToServer.bind(this)}
              index={10} />
            <Table
              state={this.state}
              select={this.clicksToServer.bind(this)}
              index={11} />
          </div>
          <div className="row">
            <Table
              state={this.state}
              select={this.clicksToServer.bind(this)}
              index={12} />
            <Table
              state={this.state}
              select={this.clicksToServer.bind(this)}
              index={13} />
            <Table
              state={this.state}
              select={this.clicksToServer.bind(this)}
              index={14} />
            <Table
              state={this.state}
              select={this.clicksToServer.bind(this)}
              index={15} />
          </div>
          <div className="row">
            <div className="score">
              <h3>Score (lower the better): {this.state.score}</h3>
            </div>
            <div className="button">
              <Button className="restart"
                onClick={this.restart.bind(this)}>
                RESTART
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Table(props) {
  let ind = props.index;
  let text = props.state.cards[ind];

  return (
    <div className="tile" onClick={props.select(ind)}>
        {text}
    </div>
  );
}