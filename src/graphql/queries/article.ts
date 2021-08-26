import { gql } from "@apollo/client";

export const ARTICLE_QUERY = gql`
  query ($_id: String!) {
    article(_id: $_id) {
      _id
      body
      title
      userEmail
      createdAt
      updatedAt
    }
  }
`;

export const ARTICLES_QUERY = gql`
  query ($userEmail: String, $searchFilter: String, $limit: Int, $offset: Int) {
    articles(
      limit: $limit
      offset: $offset
      userEmail: $userEmail
      searchFilter: $searchFilter
    ) {
      totalCount
      articles {
        _id
        body
        title
        userEmail
      }
    }
  }
`;

export const SAVED_ARTICLES_QUERY = gql`
  {
    savedArticles {
      _id
      body
      title
      userEmail
    }
  }
`;

export const SAVED_ARTICLES_IDS_QUERY = gql`
  {
    savedArticles {
      _id
    }
  }
`;
