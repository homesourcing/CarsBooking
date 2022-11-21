import { useQuery, gql } from "@apollo/client";

export const useWorkshops = () => { 
  const data = useQuery(gql`
    query {
      allWorkshop {
        edges {
          node {
            workshop_id
            dist
            name
            slug
            street
            zip
            city
            county
            lat
            long
            email
            phone
            facebook
            homepage
            free_text
            active
            collection_pages
            affiliation_name
          }
        }
      }
    }
  `)

  return data.allWorkshop.edges.map(({ node }) => ({ ...node }))
}
