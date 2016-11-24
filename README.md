# component-library-components

## LiveView
### component
* id
* implementation - Function | Class
* name - String
* owner
  * firstName - String
  * lastName - String
  * profilePhoto - String

### componentState
* id
* name - String
* propKeyValues - Array\<PropKeyValueT>
  * key - String
  * options - Array\<String>
  * value - String
  * inputType - 'TextField' | 'Slider' | 'Radio'

### data
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

### properties - Array\<PropertyT>
* name - String
* type - String
* default - String
* description - String

### onUpdatePropKeyValues
Called with the new propKeyValues array when the user changes the selection in the LiveEditor

### onAddPropToPropKeyValues
Called with the prop name that should be added to the LiveEditor propKeyValues

### onRemovePropFromPropKeyValues
Called with the prop name that should be removed from the LiveEditor propKeyValues
