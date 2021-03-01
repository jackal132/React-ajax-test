import { Component } from "react";

class Nav extends Component {
  
  state = {
    list:[]
  }

  // 컴포넌트가 생성될때 ajax call 을 통해서 초기화를 해야될경우에
  // componentDidMount()를 ajax call을 넣고 ajax로 가져온 데이터로 직접
  // 영향을 주는것이 아니라 state를 통해 render가 영향을 받도록 한다.
  componentDidMount() {
    fetch('list.json')
      .then(function(result) {
        return result.json();
      })
      .then(function(json) {
        this.setState({list:json});
      }.bind(this));  
  }

  render() {
    var listTag = [];
    for(var i =0; i < this.state.list.length; i++){
      var li = this.state.list[i];
      listTag.push(<li key={li.id}><a href={li.id}>{li.title}</a></li>)
    }

    return (
      <nav>
        <ul>
          {listTag}
        </ul>
      </nav>
    );
  }
}

function App() {
  return (
    <div className="App">
      <h1>WEB</h1>
      <Nav></Nav>
      <article>
        <h2>Welcome</h2>
        Hello, React &amp; Ajax
      </article>
    </div>
  );
}

export default App;
