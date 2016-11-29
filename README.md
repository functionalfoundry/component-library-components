# component-library-components

## LiveView
### component
* id
* implementation - Function | Class
* name - string
* owner
  * firstName - string
  * lastName - string
  * profilePhoto - string
* properties - Array\<PropertyT>
  * name - string
  * type - string
  * default - string
  * description - string

### componentState
* id
* name - string
* propKeyValues - Array\<PropKeyValueT>
  * key - string
  * options - Array\<string>
  * value - string
  * input - <PropKeyValueInputT>
    * type - 'TextField' | 'Slider' | 'Radio'
    * ?start - number
    * ?end - number
    * ?step - number

### dataCode
Code to parse and display as a string

Ex)
```
const user = {
  firstName: 'Brenda',
  lastName: 'Jenner',
}

const comment = {
  description: 'Something good',
}

const responders = [
  {
    firstName: 'Brenda',
    lastName: 'Jenner',
  },
  {
    firstName: 'Jenna',
    lastName: 'Doe',
  },
]
```

### actionsCode
Code to parse and display in the editor

Ex)
```
const handleClick = () => {
  setState({ clicked: true })
}
```

### onUpdatePropKeyValues
Called with the new propKeyValues array when the user changes the selection in the LiveEditor

### onAddPropToPropKeyValues
Called with the prop name that should be added to the LiveEditor propKeyValues

### onRemovePropFromPropKeyValues
Called with the prop name that should be removed from the LiveEditor propKeyValues

### onChangeData
Called with an object with the following structure on every key press
{
  data: Object - Map with data key and values,
  text: string - Updated code string. Must be passed back in as dataCode,
}

### onChangeActions
Called with an object with the following structure on every key press
{
  data: Object - Map with action key and values,
  text: string - Updated code string. Must be passed back in as actionsCode,
}


## Header
Includes the title, subtitle, back button, search, and action bar

### title - string

### subtitle - string

### onClickBack - Function

### search
{
  show: boolean,
  text: string,
  onSearch: Function,
}

### quickActions
[
  {
    icon: string,
    onClick: Function,
  },
]

### secondaryActions
[
  {
    label: string,
    onClick: Function,
  },
]

### primaryAction
{
  label: string,
  onClick: Function,
}
