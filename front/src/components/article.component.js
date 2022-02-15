import React, { Component } from "react";
import ArticleDataService from "../services/article.service";


export default class Article extends Component {
  constructor(props) {
    super(props);
    this.getArticle = this.getArticle.bind(this);

    this.state = {
      currentArticle: {
        id: null,
        title: "",
        content: ""
      }
    };
  }

  componentDidMount() {
    this.getArticle(this.props.match.params.id);
  }

  getArticle(id) {
    ArticleDataService.get(id)
      .then(response => {
        this.setState({
          currentArticle: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { currentArticle } = this.state;

    return (
      <div>
          <div className="edit-form">
            <h4>Article</h4>
           
              <div className="form-group">
               {currentArticle.title}
              </div>
              <div className="form-group">
               {currentArticle.content}
              </div>
            
              </div>
      </div>
    );
  }
}
