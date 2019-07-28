import { gql } from "apollo-boost";

export const getAllCountries = gql`{
  countries {
    code
    name
    native
    phone
    currency
    emoji
    continent {
      code
      name
    }
    languages {
      code
      name
      rtl
      native
    }
  }
}`;