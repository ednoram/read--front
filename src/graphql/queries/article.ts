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
  query ($userEmail: String) {
    articles(userEmail: $userEmail) {
      _id
      body
      title
      userEmail
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
