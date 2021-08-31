import { gql } from "@apollo/client";

export const ARTICLE_QUERY = gql`
  query ($_id: String!) {
    article(_id: $_id) {
      _id
      body
      title
      isLiked
      isSaved
      userEmail
      createdAt
      updatedAt
      likesCount
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
        createdAt
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

export const ARTICLE_LIKED_SAVED_QUERY = gql`
  query ($articleId: String!) {
    article(_id: $articleId) {
      isLiked
      isSaved
    }
  }
`;
