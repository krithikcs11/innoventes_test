import React, { Component } from "react";
import "./App.css";
import RemoveIcon from "@material-ui/icons/RemoveCircle";
import AddIcon from "@material-ui/icons/AddCircle";
import PersonIcon from "@material-ui/icons/Person";
import AccessibilityIcon from "@material-ui/icons/AccessibilityNew";
import group from "./group.png";
import roomIcon from "./room.png";
const roomCapacity = 4;
const maxRoom = 5;
class App extends Component {
  constructor(props) {
  super(props);
    this.state = {
      room: 1,
      adult: 1,
      child: 0
    };
  }

  // to remove the room count
  removeRoomCount = () => {
    let { room, adult, child } = this.state;
    let totalMember = child + adult;
    let prevoiusRoom = roomCapacity * (room - 1);
    if (room > 1 && totalMember <= prevoiusRoom) {
      room -= 1;
      this.setState({ room: room });
    } else if (room > 1) {
      room -= 1;
      if (child >= roomCapacity) {
        child -= roomCapacity;
      } else if (
        child > 0 &&
        child < roomCapacity &&
        totalMember > roomCapacity
      ) {
        adult -= roomCapacity - child;
        child = 0;
      } else if (adult > roomCapacity) {
        adult = prevoiusRoom;
      }
      this.setState({ room: room, adult: adult, child: child });
    }
  };

  // to add a room count
  addRoomCount = () => {
    let { room, adult, child } = this.state;
    if (room < maxRoom) {
      room += 1;
      if (room > adult + child) adult = room - child;
      this.setState({ room: room, adult: adult });
    }
  };

  //to add adult count
  addAdultCount = () => {
    let { adult, room, child } = this.state;
    let availableCount = roomCapacity * room;
    let totalMember = child + adult;
    if (totalMember < availableCount) {
      adult += 1;
      this.setState({ adult: adult });
    } else if (room !== maxRoom) {
      adult += 1;
      room += 1;
      this.setState({ adult: adult, room: room });
    }
  };

  // to remove adult count
  removeAdultCount = () => {
    let { child, adult, room } = this.state;
    let totalMember = child + adult;
    if (adult > 1 && totalMember <= room) {
      adult -= 1;
      room -= 1;
      this.setState({ adult: adult, room: room });
    } else if (adult > 1) {
      adult -= 1;
      this.setState({ adult: adult });
    }
  };

  //to add child count
  addChildCount = () => {
    let { adult, room, child } = this.state;
    let availableCount = roomCapacity * room;
    let totalMember = child + adult;
    if (totalMember < availableCount) {
      child += 1;
      this.setState({ child: child });
    } else if (room !== maxRoom) {
      child += 1;
      room += 1;
      this.setState({ child: child, room: room });
    }
  };

  //to remove child count
  removeChildCount = () => {
    let { child, adult, room } = this.state;
    let totalMember = child + adult;
    if (child > 0 && totalMember <= room) {
      child -= 1;
      room -= 1;
      this.setState({ child: child, room: room });
    } else if (child > 0) {
      child -= 1;
      this.setState({ child: child });
    }
  };

  render() {
    let me = this;
    let { child, adult, room } = me.state;
    let items = [
      {
        name: "ROOMS",
        count: room,
        icon: roomIcon,
        onAddClick: () => {
          me.addRoomCount();
        },
        onRemoveClick: () => {
          me.removeRoomCount();
        }
      },
      {
        name: "ADULTS",
        count: adult,
        iconComponent: <PersonIcon className="icon" />,
        onAddClick: () => {
          me.addAdultCount();
        },
        onRemoveClick: () => {
          me.removeAdultCount();
        }
      },
      {
        name: "CHILDREN",
        count: child,
        iconComponent: <AccessibilityIcon className="icon" />,
        onAddClick: () => {
          me.addChildCount();
        },
        onRemoveClick: () => {
          me.removeChildCount();
        }
      }
    ];
    return (
      <div className="my-app">
        <div className="app-title">
          <img className="group-logo" src={group} alt="group" />
          <div className="title-label">
            Choose number of
            <span className="title-people-label">people</span>
          </div>
        </div>
        <div className="container">{getItems(items)}</div>
      </div>
    );
  }
}
export default App;

function getItems(items) {
  let ItemUI = [];
  items.forEach(item => {
    ItemUI.push(
      <div key={item.name} className="container-item">
        <div className="item-icon">
          {item.icon ? (
            <img className="icon" src={item.icon} alt="group" />
          ) : (
            item.iconComponent
          )}
        </div>
        <div className="item-name-container">
          <div className="item-name">{item.name}</div>
        </div>
        <div className="item-remove-icon">
          <RemoveIcon
            onClick={e => item.onRemoveClick()}
            className="remove-icon"
          />
        </div>
        <div className="item-count">
          <div className="count">{item.count}</div>
        </div>
        <div className="item-add-icon">
          <AddIcon onClick={e => item.onAddClick()} className="add-icon" />
        </div>
      </div>
    );
  });
  return ItemUI;
}


