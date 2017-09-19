import React from 'react'
import RepoInfo, { RepoT } from '../RepoInfo'
import Theme from 'js-theme'
import RepoStatus from '../RepoStatus'
import InfoTable from '../InfoTable'
import InfoTableRow from '../InfoTable/InfoTableRow'

type PropsT = {
  /** Called when the GitHub icon is clicked */
  onClickRepoGithub: Function,
  /** The repo to display */
  repo: RepoT,
}

/** Shows the repo dropdown, branch dropdown, and build status in the left navbar */
const RepoPane = ({ repo, onClickRepoGithub }: PropsT) => {
  return (
    <div>
      <RepoInfo repo={repo} onClickRepoGithub={onClickRepoGithub} />
      <div
        style={{
          marginTop: 4,
          marginLeft: 30,
        }}
      >
        <InfoTable>
          <InfoTableRow
            title={repo.refType === 'tag' ? 'Tag' : 'Branch'}
            info={
              <div style={{ marginLeft: 8 }}>
                {repo.ref}
              </div>
            }
          />
          <InfoTableRow
            title="Commit"
            info={
              <div style={{ marginLeft: 8 }}>
                {repo.commit}
              </div>
            }
          />
          <InfoTableRow
            title="Status"
            info={
              <div style={{ marginLeft: 8 }}>
                <RepoStatus status={repo.status} />
              </div>
            }
          />
        </InfoTable>
      </div>
    </div>
  )
}

const defaultTheme = {}

const ThemedRepoPane = Theme('RepoPane', defaultTheme)(RepoPane)
export default ThemedRepoPane
