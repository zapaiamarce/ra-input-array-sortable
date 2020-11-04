A sortable input for React Admin.

# Setup

```sh
yarn add ra-input-array-sortable
```

# Use

```tsx
import {
  TextField,
  TextInput,
  Edit,
  SimpleForm,
  NumberInput,
  required,
} from "react-admin";
import SortableArray from "ra-input-array-sortable";

const EditItem = (props) => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={required()} />

      <SortableArray source="colors" label="Colors">
        <TextInput source="" />
      </SortableArray>

      <SortableArray source="cars" label="Cars">
        <TextInput source="brand" />
        <NumberInput source="year" />
      </SortableArray>
    </SimpleForm>
  </Edit>
);

/*
Result:
{
    name:"string",
    colors:["blue","gray"],
    cars:[{
        brand:"Renault",
        year:2019
    },{
        brand:"Chevrolet",
        year:1978
    }]
}
*/

export default EditItem;
```

# Todo

- Support deepest objects
