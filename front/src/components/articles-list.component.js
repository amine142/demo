import React, { Component } from "react";
import ArticleDataService from "../services/article.service";
import { Link } from "react-router-dom";

export default class ArticlesList extends Component {
  constructor(props) {
    super(props);
    this.retrieveArticles = this.retrieveArticles.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveArticle = this.setActiveArticle.bind(this);
    
    this.state = {
      articles: [],
      currentArticle: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveArticles();
  }

  retrieveArticles() {
    ArticleDataService.getAll()
      .then(response => {
        this.setState({
          articles: response.data['hydra:member']
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveArticles();
    this.setState({
      currentArticle: null,
      currentIndex: -1
    });
  }

  setActiveArticle(article, index) {
    this.setState({
      currentArticle: article,
      currentIndex: index
    });
  }


  render() {
    const {  articles, currentArticle, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Article List</h4>
          <ul className="list-group">
            {articles &&
              articles.map((article, index) => (
                <li
                  className={"list-group-item "}
                  onClick={() => this.setActiveArticle(article, index)}
                  key={index}
                >
                  {article.title}
                <Link
                to={"/articles/" + article.id}
                className="badge badge-warning"
              >
                Show
              </Link></li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
