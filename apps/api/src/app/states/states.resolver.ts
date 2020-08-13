import { Query, Resolver } from '@nestjs/graphql';

export interface State {
  id: number;
  name: string;
  code: string;
}

@Resolver('State')
export class StatesResolver {
  private states: State[] = [
    { id: 1, code: 'DE', name: 'Delaware' },
    { id: 2, code: 'PA', name: 'Pennsylvania' },
    { id: 3, code: 'NJ', name: 'New Jersey' },
    { id: 4, code: 'GA', name: 'Georgia' },
    { id: 5, code: 'CT', name: 'Connecticut' },
    { id: 6, code: 'MA', name: 'Massachusetts' },
    { id: 7, code: 'MD', name: 'Maryland' },
    { id: 8, code: 'SC', name: 'South Carolina' },
    { id: 9, code: 'NH', name: 'New Hampshire' },
    { id: 10, code: 'VA', name: 'Virginia' },
    { id: 11, code: 'NY', name: 'New York' },
    { id: 12, code: 'NC', name: 'North Carolina' },
    { id: 13, code: 'RI', name: 'Rhode Island' },
  ];

  @Query('states')
  getAllSets(): State[] {
    return this.states;
  }
}
