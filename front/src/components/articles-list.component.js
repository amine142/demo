import React, { Component } from "react";
import ArticleDataService from "../services/article.service";
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { Switch, Route, Link } from "react-router-dom";
import Article from "./article.component";

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
      columns: [
            {
                name: 'Title',
                selector: row => row.title,
            },
            {
                name: 'content',
                selector: row => row.content,
            },
            {
              name: "Actions",
              selector: row => row.id,
              cell: (  row ) => <Link to={"/articles/"+row.id}>Show</Link>,
              ignoreRowClick: true,
              allowOverflow: true,
            },
        ]
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
    const { columns,  articles, currentArticle, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Article List</h4>
          <DataTable
            pagination
            columns={columns}
            data={articles}
            selectableRows
        />
        </div>
      </div>
    );
  }
}
