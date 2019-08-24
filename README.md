# v-money Mask for Vue.js

### TD;LR;
A directive for Vue.js to handle v-money input types tat sets the **masked** and **unmasked** value of an`"input"`component (eg the `"v-text-field"` component from vuetify)

## Usage

### A. Globally

```js
import Vue from "vue";
import money from "@titou10/v-money";

// register directive v-money
Vue.use(money, { precision: 4 });
```

### B. Use as directive: https://jsfiddle.net/nj3cLoum/2/

```html
<template>
  <div><input v-model.lazy="price" v-money="money" /> {{price}}</div>
</template>

<script>
  import { VMoney } from "@titou10/v-money";

  export default {
    data() {
      return {
        price: 123.45,
        money: {
          decimal: ",",
          thousands: ".",
          prefix: "R$ ",
          suffix: " #",
          precision: 2,
          unmaskedVar: null 
        }
      };
    },

    directives: { money: VMoney }
  };
</script>
```

## Properties

| property  | Required | Type    | Default | Description                                            |
| --------- | -------- | ------- | ------- | ------------------------------------------------------ |
| precision | **true** | Number  | 2       | How many decimal places                                |
| decimal   | false    | String  | "."     | Decimal separator                                      |
| thousands | false    | String  | ","     | Thousands separator                                    |
| prefix    | false    | String  | ""      | Currency symbol followed by a Space, like "R\$ "       |
| suffix    | false    | String  | ""      | Percentage for example: " %"                           |
| unmaskedVar | false | String | null   | name of a var in data to receive unmasked data |

### References

- https://github.com/luizhenriquerdias/v-money
- https://github.com/vuejs-tips/v-money/tree/master/src
