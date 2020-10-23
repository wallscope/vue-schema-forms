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
    FormBuilder(
      :fields="example",
      @input="input",
      v-model="ex1",
      @error="addErr(1, $event)",
      @submit="submit"
    )
    div
      p Errors
        p.error(v-for="e, i in errors1", @click="deleteErr(1, i)") {{ e.field }}:{{ e.error.index }} -- {{ e.error.message }}
      pre {{ JSON.stringify(ex1, null, ' ') }}
  hr

  h2 Example form with slot override
  p Replacing 'string' types with a div with red background
  .ex
    FormBuilder(
      :fields="example",
      @input="input",
      v-model="ex2",
      @error="addErr(2, $event)",
      @submit="submit"
    )
      template(v-slot:string="slotProps")
        div(
          style="background:red;",
          @click="slotProps.input(slotProps.field.name, 'hardcoded change')"
        ) Click me to change the field value
    div
      p Errors
      p.error(v-for="e, i in errors2", @click="deleteErr(2, i)") {{ e.field }}:{{ e.error.index }} -- {{ e.error.message }}
      pre {{ JSON.stringify(ex1, null, ' ') }}
  hr

  h2 Example form with css overrides for a specific component type
  p Overriding css in children components is achieved using the special ::v-deep combinator in css
  .ex.override
    FormBuilder(
      :fields="example",
      @input="input",
      v-model="ex3",
      @error="addErr(3, $event)",
      @submit="submit"
    )
    div
      p Errors
      p.error(v-for="e, i in errors3", @click="deleteErr(3, i)") {{ e.field }}:{{ e.error.index }} -- {{ e.error.message }}
      pre {{ JSON.stringify(ex3, null, ' ') }}
  hr

  h2 Example form with css overrides for all inputs
  p Overriding css in children components is achieved using the special ::v-deep combinator in css
  .ex.override2
    FormBuilder(
      :fields="example",
      @input="input",
      v-model="ex4",
      @error="addErr(3, $event)",
      @submit="submit"
    )
    div
      p Errors
      p.error(v-for="e, i in errors4", @click="deleteErr(4, i)") {{ e.field }}:{{ e.error.index }} -- {{ e.error.message }}
      pre {{ JSON.stringify(ex4, null, ' ') }}
  hr

  h2 Example form with nested forms
  .ex
    FormBuilder(
      :fields="nested",
      @input="input",
      v-model="ex5",
      @error="addErr(5, $event)",
      @submit="submit"
    ) 
    div
      p Errors
      p.error(v-for="e, i in errors5", @click="deleteErr(5, i)") {{ e.field }}:{{ e.error.index }} -- {{ e.error.message }}
      pre {{ JSON.stringify(ex5, null, ' ') }}
  hr

  h2 Example form with multiple levels of nesting
  .ex
    FormBuilder(
      :fields="turtles",
      @input="input",
      v-model="ex6",
      @error="addErr(6, $event)",
      @submit="submit"
    ) 
    div
      p Errors
      p.error(v-for="e, i in errors6", @click="deleteErr(6, i)") {{ e.field }}:{{ e.error.index }} -- {{ e.error.message }}
      pre {{ JSON.stringify(ex6, null, ' ') }}
  hr
</template>

<script>
import Vue from "vue";
import FormBuilder from "./components/FormBuilder.vue";

const example = [
  {
    name: "trips",
    type: "triple-pattern",
    required: false,
    size: "1+",
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
    default: "2",
  },
  {
    name: "boolean field",
    type: "boolean",
    required: true,
    size: "2+",
    description: "A number field",
    default: "true",
  },
  {
    name: "password field",
    type: "password",
    required: true,
    size: "2+",
    description: "A password field",
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
      nested: [
        {
          name: "Normal String Field",
          type: "string",
          size: "2+",
          description: "A simple field in a nested form",
          default: "",
        },
        {
          name: "Form",
          type: "form",
          description: "This is a nested form",
          fields: example,
        },
      ],
      turtles: [
        {
          name: "Turtles",
          type: "form",
          fields: [
            {
              name: "All",
              type: "form",
              fields: [
                {
                  name: "The",
                  type: "form",
                  fields: [
                    {
                      name: "Way",
                      type: "form",
                      fields: [
                        {
                          name: "Down",
                          type: "form",
                          fields: [
                            {
                              name: "right?",
                              type: "boolean",
                              default: "true",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      ex1: {},
      ex2: {},
      ex3: {},
      ex4: {},
      ex5: {},
      ex6: {},
      errors1: [],
      errors2: [],
      errors3: [],
      errors4: [],
      errors5: [],
      errors6: [],
    };
  },
  methods: {
    input(evt) {
      console.log(evt);
    },
    addErr(example, e) {
      this[`errors${example}`].push(e);
    },
    deleteErr(example, i) {
      Vue.delete(this[`errors${example}`], i);
    },
    submit(evt) {
      alert(`submitted without errors:\n${JSON.stringify(evt, null, "  ")}`);
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

.override ::v-deep .string {
  background-color: aqua;
}

.override2 ::v-deep input {
  background-color: rgb(162, 0, 255);
}
</style>