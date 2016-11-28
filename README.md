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

### onUpdatePropKeyValues
Called with the new propKeyValues array when the user changes the selection in the LiveEditor

### onAddPropToPropKeyValues
Called with the prop name that should be added to the LiveEditor propKeyValues

### onRemovePropFromPropKeyValues
Called with the prop name that should be removed from the LiveEditor propKeyValues
