import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type State = {
  __typename?: 'State';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  states?: Maybe<Array<Maybe<State>>>;
};

export type StatesQueryVariables = Exact<{ [key: string]: never }>;

export type StatesQuery = { __typename?: 'Query' } & {
  states?: Maybe<
    Array<Maybe<{ __typename?: 'State' } & Pick<State, 'id' | 'name'>>>
  >;
};

export const StatesDocument = gql`
  query states {
    states {
      id
      name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class StatesGQL extends Apollo.Query<StatesQuery, StatesQueryVariables> {
  document = StatesDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
