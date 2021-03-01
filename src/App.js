import { Component } from "react";

class Nav extends Component {

  render() {
    var listTag = [];
    for(var i =0; i < this.props.list.length; i++) {
      var li = this.props.list[i];
      
      listTag.push(
        <li key={li.id}>
          <a href={li.id} data-id={li.id} onClick={function(e) {
              e.preventDefault();
              this.props.onClick(e.target.dataset.id);
            }.bind(this)}>
            {li.title}
          </a>
        </li>)
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

class Article extends Component {
  render() {
    return (
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    );
  }
}

class NowLoading extends Component {
  render() {
    return (<div>NowLoading...</div>);
  }
}

class App extends Component {

  state = {
    article:{
      item:{title:'Welcome', desc:'Hello, React & Ajax'},
      isLoading:false
    },
    list:{
      items:[],
      isLoading:false
    }
  }

  // 컴포넌트가 생성될때 ajax call 을 통해서 초기화를 해야될경우에
  // componentDidMount()를 ajax call을 넣고 ajax로 가져온 데이터로 직접
  // 영향을 주는것이 아니라 state를 통해 render가 영향을 받도록 한다.
  componentDidMount() {
    
    var newList = Object.assign({}, this.state.list, {isLoading:true});
    this.setState({list:newList});

    fetch('list.json')
      .then(function(result) {
        return result.json();
      })
      .then(function(json) {
        this.setState({list:{
          items:json,
          isLoading:false
        }});
      }.bind(this));  
  }

  render () {
    var NavTag = null;
    if(this.state.list.isLoading) {
      NavTag = <NowLoading></NowLoading>
    } else {
      NavTag = <Nav list={this.state.list.items} onClick={function(id) {
        var newArticle = Object.assign({}, this.state.article, {isLoading:true});
        this.setState({article:newArticle});

        fetch(id+'.json')
        .then(function(result){
          return result.json();
        }).then(function(json){
          this.setState({
            article:{
              item:{
                title:json.title,
                desc:json.desc
              },
              isLoading:false
            }
          });
        }.bind(this));
      }.bind(this)}></Nav>
    }

    var ArticleTag = null;
    if(this.state.article.isLoading){
      ArticleTag = <NowLoading></NowLoading>;
    } else {
      ArticleTag = <Article 
        title={this.state.article.item.title} 
        desc={this.state.article.item.desc}>
      </Article>;
    }

    return (
      <div className="App">
        <h1>WEB</h1>
        {NavTag}
        {ArticleTag}
      </div>
    )
  }
}

export default App;
