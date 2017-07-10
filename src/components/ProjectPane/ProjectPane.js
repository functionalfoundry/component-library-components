import React from 'react'
import RepoDropdown, { RepoT } from '../RepoDropdown'
import BranchDropdown, { BranchT } from '../BranchDropdown'
import Theme from 'js-theme'
import BranchStatus from '../BranchStatus'
import InfoTable from '../InfoTable'
import InfoTableRow from '../InfoTable/InfoTableRow'

type PropsT = {
  /** Called when the GitHub icon is clicked */
  onClickRepoGithub: Function,
  /** Called when a repo is selected in the repo dropdown */
  onSelectRepo: Function,
  /** List of all the repos to display in the repo dropdown */
  repos: Array<RepoT>,
  /** The currently selected repo ID to display in the repo dropdown */
  selectedRepoId: string,
  /** All the branches to display in the branch dropdown */
  branches: Array<BranchT>,
  /** Called when a branch is selected in the branch dropdown */
  onSelectBranch: Function,
  /** The currently selected branch ID to display in the branch dropdown */
  selectedBranchId: string,
}

/** Shows the repo dropdown, branch dropdown, and build status in the left navbar */
const ProjectPane = ({
  repos,
  selectedRepoId,
  onClickRepoGithub,
  onSelectRepo,
  onSelectBranch,
  branches,
  selectedBranchId,
}: PropsT) => (
  <div>
    <RepoDropdown
      repos={repos}
      selectedRepoId={selectedRepoId}
      onClickRepoGithub={onClickRepoGithub}
      onSelectRepo={onSelectRepo}
    />
    <div
      style={{
        marginTop: 4,
        marginLeft: 30,
      }}
    >
      <InfoTable>
        <InfoTableRow
          title="Branch"
          info={
            <BranchDropdown
              branches={branches}
              selectedBranchId={selectedBranchId}
              onSelectBranch={onSelectBranch}
            />
          }
        />
        <InfoTableRow
          title="Status"
          info={
            <div style={{ marginLeft: 8 }}>
              <BranchStatus
                status={getCurrentBranch(branches, selectedBranchId).status}
                onIconClick={
                  getCurrentBranch(branches, selectedBranchId).onStatusIconClick
                }
              />
            </div>
          }
        />
      </InfoTable>
    </div>
  </div>
)

const getCurrentBranch = (branches, selectedBranchId) =>
  branches.find(branch => branch.id === selectedBranchId) || {}

const defaultTheme = {}

const ThemedProjectPane = Theme('ProjectPane', defaultTheme)(ProjectPane)
export default ThemedProjectPane
