import * as React from "react";
import {
  Admin,
  Edit,
  ListGuesser,
  Resource,
  SimpleForm,
  TextInput,
} from "react-admin";
import ReactDOM from "react-dom";
import Sortable from "./index";

const item = {
  id: 1,
  title: "Hola",
  items: [{ title: "first" }, { title: "second" }],
};
const dataProvider: any = {
  async getList() {
    return {
      data: [item],
      total: 1,
    };
  },
  async getOne() {
    return { data: item };
  },
  async update(...params) {
    console.log(params);
  },
};
export const HolaEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <Sortable source="items">
        <TextInput source="title" />
      </Sortable>
    </SimpleForm>
  </Edit>
);

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={ListGuesser} edit={HolaEdit} />
  </Admin>
);

const app = document.getElementById("app");
console.log(app);

ReactDOM.render(<App />, app);
