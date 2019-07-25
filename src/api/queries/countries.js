import { gql } from "apollo-boost";

export const getAllCountries = gql`{
  countries {
    name
    code
  }
}`;