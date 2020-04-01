/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPost
// ====================================================

export interface GetPost_post_category {
  readonly __typename: "CategoryType";
  readonly id: string;
  readonly name: string;
}

export interface GetPost_post_tags {
  readonly __typename: "TagType";
  readonly id: string;
  readonly name: string;
}

export interface GetPost_post_createdBy {
  readonly __typename: "AdminUserType";
  readonly name: string;
}

export interface GetPost_post {
  readonly __typename: "PostType";
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly category: GetPost_post_category;
  readonly tags: ReadonlyArray<GetPost_post_tags>;
  readonly createdAt: any;
  readonly createdBy: GetPost_post_createdBy | null;
  readonly updatedAt: any;
}

export interface GetPost {
  /**
   * 特定の記事ID
   */
  readonly post: GetPost_post | null;
}

export interface GetPostVariables {
  readonly rawId?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPosts
// ====================================================

export interface GetPosts_allPosts_pageInfo {
  readonly __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  readonly hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  readonly hasPreviousPage: boolean;
  /**
   * When paginating forwards, the cursor to continue.
   */
  readonly endCursor: string | null;
  /**
   * When paginating backwards, the cursor to continue.
   */
  readonly startCursor: string | null;
}

export interface GetPosts_allPosts_edges_node_category {
  readonly __typename: "CategoryType";
  readonly name: string;
}

export interface GetPosts_allPosts_edges_node_tags {
  readonly __typename: "TagType";
  readonly name: string;
}

export interface GetPosts_allPosts_edges_node_createdBy {
  readonly __typename: "AdminUserType";
  readonly name: string;
}

export interface GetPosts_allPosts_edges_node {
  readonly __typename: "PostNode";
  /**
   * The ID of the object.
   */
  readonly id: string;
  readonly title: string;
  readonly rawId: number | null;
  readonly category: GetPosts_allPosts_edges_node_category;
  readonly tags: ReadonlyArray<GetPosts_allPosts_edges_node_tags>;
  readonly createdAt: any;
  readonly createdBy: GetPosts_allPosts_edges_node_createdBy | null;
  readonly updatedAt: any;
}

export interface GetPosts_allPosts_edges {
  readonly __typename: "PostNodeEdge";
  /**
   * The item at the end of the edge
   */
  readonly node: GetPosts_allPosts_edges_node | null;
}

export interface GetPosts_allPosts {
  readonly __typename: "PostNodeConnection";
  /**
   * Pagination data for this connection.
   */
  readonly pageInfo: GetPosts_allPosts_pageInfo;
  readonly totalCount: number | null;
  /**
   * Contains the nodes in this connection.
   */
  readonly edges: ReadonlyArray<(GetPosts_allPosts_edges | null)>;
}

export interface GetPosts {
  readonly allPosts: GetPosts_allPosts | null;
}

export interface GetPostsVariables {
  readonly after?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
