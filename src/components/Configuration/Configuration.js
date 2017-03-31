/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {
  Button,
  Heading,
  EditableText,
  Icon,
  TextInput,
  View,
} from '@workflo/components'
import {
  Colors,
  Spacing,
  Fonts,
} from '@workflo/styles'

type RepoT = {
  name: string,
  rootDirectory: string,
  sourcePath: string,
  filePattern: string,
  namePattern: string,
}

type ThemeT = {
  name: string,
  backgroundColor: string,
}

type PropsT = {
  configuration: {
    repos: Array<RepoT>,
    themes: Array<ThemeT>,
  },
  onChange: Function,
  onClickAddRepo: Function,
  onClickAddTheme: Function,
  theme: Object,
}

const defaultProps = {
  configuration: {
    repos: [],
    themes: [],
  },
  onClickAddRepo: () => {},
  onClickAddTheme: () => {},
}

/**
 *  This component is really lacking a Form. Once we add a Form
 *  component we should come back and redo this
 */

class ConfigurationContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      configuration: props.configuration,
    }
  }

  handleChange = (configuration) => {
    this.setState({ configuration })
  }

  handleSave = () => {
    this.props.onChange(this.state.configuration)
  }

  render () {
    return (
      <Configuration
        {...this.props}
        configuration={this.state.configuration}
        onChange={this.handleChange}
        onSave={this.handleSave}
      />
    )
  }
}

class Configuration extends React.Component {
  props: PropsT

  render() {
    const {
      configuration,
      onChange,
      onSave,
      theme,
      onClickAddRepo,
      onClickAddTheme,
      onClickDeleteRepo,
      onClickDeleteTheme,
      ...props,
    } = this.props

    return (
      <View
        {...theme.configuration}
      >
        <SectionHeader
          name='Repos'
          onClickAdd={onClickAddRepo}
        />
        {configuration.repos.map((repo) => (
          <Repo
            key={repo.name}
            name='Example Library'
            repo={repo}
            onChange={(value) => {
              updateWhere(
                configuration,
                'repos',
                { name: repo.name },
                value
              )
              onChange(configuration)
            }}
            onSave={onSave}
            onClickDelete={onClickDeleteRepo}
          />
        ))}

        <SectionHeader
          name='Themes'
          onClickAdd={onClickAddTheme}
        />
        {configuration.themes.map((theme, index) => (
          <ThemeSection
            key={index}
            theme={theme}
            onChange={(value) => {
              updateWhere(
                configuration,
                'themes',
                { name: theme.name },
                value
              )
              onChange(configuration)
            }}
            onSave={onSave}
            onClickDelete={onClickDeleteTheme}
          />
        ))}
      </View>
    )
  }
}

// MUTATES
// Finds the right item and updates it in configuration
const updateWhere = (configuration, prop, where, value) => {
  let index
  const item = configuration[prop].find((element) => {
    const whereKeys = Object.keys(where)
    for (let i = 0; i <= whereKeys.length; i++) {
      const key = whereKeys[i]
      if (element[key] === where[key]) {
        index = i
        return true
      }
    }
  })
  configuration[prop][index] = value
}

const SectionHeader = ({
  name,
  onClickAdd,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flex: '0 1 auto',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Heading
        size='Huge'
        theme={{
          heading: {
            flex: '0 1 auto',
          },
        }}
      >
        {name}
      </Heading>
      <Button
        kind='secondary'
        shade='dark'
        onClick={onClickAdd}
        theme={{
          button: {
            flex: '0 1 auto',
            padding: '10px 10px',
            height: 30,
            width: 30,
            marginLeft: Spacing.small,
            marginTop: -4,
          },
        }}
      >
        <Icon
          name='add'
          size='large'
          theme={{
            icon: {
              alignItems: 'center'
            }
          }}
        />
      </Button>
    </div>
  )
}

class ItemHeader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isHovering: false,
      initialName: props.name,
    }
  }

  handleMouseEnter = () => {
    this.setState({ isHovering: true })
  }

  handleMouseLeave = () => {
    this.setState({ isHovering: false })
  }

  render () {
    const { name, onClickDelete, children } = this.props
    const { isHovering, initialName } = this.state
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {!children && (
          <Heading
            size='Large'
            theme={{
              heading: {
                color: Colors.grey400,
              },
            }}
          >
            {name}
          </Heading>
        )}
        {/*           // This is a hack because EditableText needs the initial value passed in always */}
        {React.Children.map(this.props.children, (child => React.cloneElement(child, { value: initialName })))}
        {isHovering && (
          <Icon
            name='minus'
            size='base'
            stroke={Colors.grey400}
            onClick={onClickDelete}
            theme={{
              icon: {
                marginLeft: Spacing.tiny,
                cursor: 'pointer',
                alignItems: 'center'
              }
            }}
          />
        )}
      </div>
    )
  }
}

const Input = ({
  key,
  value,
  label,
  onChange,
  onSave,
}) => {
  return (
    <div style={{ marginTop: Spacing.tiny }}>
      <TextInput
        value={value}
        onChange={onChange}
        onBlur={onSave}
        label={label}
        theme={{
          textInput: {
            borderColor: Colors.primary,
            color: 'white',
          },
          inputContain: {
            maxWidth: 600,
            width: 600,
          },
        }}
      />
    </div>
  )
}

const Repo = ({
  // name,
  // rootDirectory,
  // filePattern,
  // namePattern,
  repo,
  onClickDelete,
  onChange,
  onSave,
  ...props
}) => {
  return (
    <div
      style={{ marginBottom: Spacing.small }}
    >
      <ItemHeader
        name={repo.name}
        onClickDelete={() => onClickDelete(repo.name)}
      />
      <Input
        value={repo.rootDirectory}
        label='Root directory'
        onChange={(value) => onChange({
          ...repo,
          rootDirectory: value,
        })}
        onSave={onSave}
      />
      <Input
        value={repo.sourcePath}
        label='Source path'
        onChange={(value) => onChange({
          ...repo,
          sourcePath: value,
        })}
        onSave={onSave}
      />
      <Input
        value={repo.filePattern}
        label='File pattern'
        onChange={(value) => onChange({
          ...repo,
          filePattern: value,
        })}
        onSave={onSave}
      />
      <Input
        value={repo.namePattern}
        label='Name pattern'
        onChange={(value) => onChange({
          ...repo,
          namePattern: value,
        })}
        onSave={onSave}
      />
    </div>
  )
}

const ThemeSection = ({
  theme,
  onChange,
  onSave,
  onClickDelete,
}) => {
  return (
    <div
      style={{ marginBottom: Spacing.small }}
    >
      <ItemHeader
        name={theme.name}
        onClickDelete={() => onClickDelete(theme.name)}
      >
        <EditableText
          value={theme.name}
          onChange={(value) => onChange({
            ...theme,
            name: value,
          })}
          onStopEdit={onSave}
          theme={{
            text: {
              ...Fonts.large,
              color: Colors.grey400,
            },
          }}
        />
      </ItemHeader>
      <Input
        key='backgroundColor'
        value={theme.backgroundColor}
        label='Background color'
        onChange={(value) => onChange({
          ...theme,
          backgroundColor: value,
        })}
        onSave={onSave}
      />
    </div>
  )
}

Configuration.defaultProps = defaultProps

const defaultTheme = {
  configuration: {
  },
}

export default Theme('Configuration', defaultTheme)(ConfigurationContainer)
