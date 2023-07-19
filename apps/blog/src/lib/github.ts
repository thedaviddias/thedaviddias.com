import { graphql } from '@octokit/graphql'
import { Language, Repository } from '@octokit/graphql-schema'

type SortType = 'PUSHED_AT' | 'STARGAZERS'

export interface GhProjectsProps extends Pick<Repository, 'name' | 'url' | 'description'> {
  updatedAt: Date
  stars: Pick<Repository, 'stargazerCount'>
  forks: number
  language: Language
}

export const fetchRepos = async (sort: SortType, limit: number) => {
  // https://docs.github.com/en/graphql/reference/objects#repository
  const { user } = await graphql(
    `
      query ($username: String!, $sort: RepositoryOrderField!, $limit: Int) {
        user(login: $username) {
          repositories(
            first: $limit
            isLocked: false
            isFork: false
            ownerAffiliations: OWNER
            privacy: PUBLIC
            orderBy: { field: $sort, direction: DESC }
          ) {
            edges {
              node {
                name
                url
                description
                pushedAt
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                  color
                }
              }
            }
          }
        }
      }
    `,
    {
      username: 'thedaviddias',
      limit,
      sort,
      headers: {
        authorization: `token ${process.env.GH_PUBLIC_TOKEN}`,
      },
    }
  )

  const repos: GhProjectsProps[] = user.repositories.edges.map(
    ({ node: repo }: { node: Repository }) => ({
      name: repo.name,
      url: repo.url,
      description: repo.description,
      updatedAt: repo.pushedAt,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      language: repo.primaryLanguage,
    })
  )

  return repos
}
