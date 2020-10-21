<template lang="pug">
.wrapper
  h1 Examples:
  h2 Example fields definition:
  table
    tr
      th name
      th type
      th required
      th size
      th description
      th default
    tr(v-for="f in example")
      td {{ f.name }}
      td {{ f.type }}
      td {{ f.required }}
      td {{ f.size }}
      td {{ f.description }}
      td {{ f.default }}
  .ex
    h3 Form
    h3 Results
  hr

  h2 The normal form
  .ex
    FormBuilder(:fields="example", @input="input", v-model="ex1")
    pre {{ JSON.stringify(ex1, null, ' ') }}
  hr

  h2 Example form with slot override
  p Replacing 'string' types with a div with red background
  .ex
    FormBuilder(:fields="example", @input="input", v-model="ex2")
      template(v-slot:string="slotProps")
        div(
          style="background:red;",
          @click="slotProps.input(slotProps.field.name, 'hardcoded change')"
        ) Click me to change the field value
    pre {{ JSON.stringify(ex2, null, ' ') }}
  hr
  h2 Example form with css overrides
  h2 Example form with nested forms
  //- Use v-slot:fields to create the fake 'fields' type and render it using another FormBuilder component
</template>

<script>
import FormBuilder from "./components/FormBuilder.vue";

// const example = [
//   {
//     name: "string field",
//     type: "string",
//     required: true,
//     description: "A plain text string field",
//     default: "",
//   },
//   {
//     name: "password field",
//     type: "password",
//     required: true,
//     description: "A password field",
//     default: "supersafepassword",
//   },
//   {
//     name: "mapping",
//     type: "mapping",
//     required: true,
//     size: "2+",
//     description: "Object that represents a mapping of string to string",
//     default: '{"label":"http://www.w3.org/2000/01/rdf-schema#label"}',
//   },
//   {
//     name: "matchers",
//     type: "triple-pattern",
//     required: false,
//     size: "1+",
//     description: "Triple patterns that will match",
//     default: '[{"p":"http://www.w3.org/2000/01/rdf-schema#label"}]',
//   },
//   {
//     name: "is-it",
//     type: "boolean",
//     required: false,
//     description: "If set to true, it is. If set to false, it is not.",
//     default: "false",
//   },
//   {
//     name: "timeout",
//     type: "number",
//     required: false,
//     description:
//       "Timeout for the request sent to the Endpoint. Measured in Milliseconds",
//     default: "15000",
//   },
//   {
//     name: "query",
//     type: "sparql-query",
//     required: true,
//     size: "1",
//     description: "SPARQL Query example",
//     default: "",
//   },
// ];
const example = [
  {
    name: "trips",
    type: "triple-pattern",
    required: true,
    size: "2-",
    description: "Object that represents a mapping of string to string",
    default: '{"p":"http://www.w3.org/2000/01/rdf-schema#label"}',
  },
  {
    name: "mapping",
    type: "mapping",
    required: true,
    size: "2-",
    description: "Object that represents a mapping of string to string",
    default: '{"label":"http://www.w3.org/2000/01/rdf-schema#label"}',
  },
  {
    name: "string field",
    type: "string",
    required: true,
    size: "2+",
    description: "A plain text string field",
    default: "",
  },
  {
    name: "number field",
    type: "number",
    required: true,
    size: "2+",
    description: "A number field",
    default: "",
  },
  {
    name: "boolean field",
    type: "boolean",
    required: true,
    size: "2+",
    description: "A number field",
    default: "",
  },
  {
    name: "password field",
    type: "password",
    required: true,
    size: "2+",
    description: "A password field",
    default: "",
  },
  {
    name: "SPARQL query field",
    type: "sparql-query",
    required: true,
    size: "1+",
    description: "A sparql query field",
    default: "CONSTRUCT {?S ?P ?O}WHERE{?S ?P ?O}",
  },
];
export default {
  name: "App",
  components: {
    FormBuilder,
  },
  data() {
    return {
      example,
      ex1: {},
      ex2: {},
    };
  },
  methods: {
    input(evt) {
      console.log(evt);
    },
  },
};
</script>
<style scoped>
.ex {
  display: grid;
  grid-template-columns: 3fr 2fr;
}
.fields {
  font-size: 0.8em;
}
.field {
  display: flex;
}
table,
td {
  padding: 2px;
  border: 1px solid black;
}
</style>