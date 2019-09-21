# v-money mask for Vue.js

### TL;DR;
A`"v-money"`directive for Vue.js that sets the **masked** and **unmasked** value of an`"input"`component (eg the `"v-text-field"` component from vuetify)
It is a specialized form of a`mask`
It is based on`@vuejs-tips/v-money`

### Install

```sh
npm install @titou10/v-money --save
yarn add @titou10/v-money
bower install @titou10/v-money --save
```

## Usage

### A. Globally

```js
import Vue from "vue";
import money from "@titou10/v-money";

// register directive v-money
Vue.use(money, { precision: 4 });
```

### B. Use as directive:

```html
<template>
  <input v-model.lazy="price" v-money="money" />
</template>

<script>
  import { money } from "@titou10/v-money";
  export default {
    directives: { money }, 
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
    }
  };
</script>
```

### v-money properties

| property  | Required | Type    | Default | Description                                            |
| --------- | -------- | ------- | ------- | ------------------------------------------------------ |
| precision | **true** | Number  | 2       | How many decimal places                                |
| decimal   | false    | String  | "."     | Decimal separator                                      |
| thousands | false    | String  | ","     | Thousands separator                                    |
| prefix    | false    | String  | ""      | Currency symbol followed by a Space, like "R\$ "       |
| suffix    | false    | String  | ""      | Percentage for example: " %"                           |
| unmaskedVar | false | String | null   | name of an attribute in "data" to receive the unmasked value |

### Why this package?
This package has been created because the`@vuejs-tips/v-money` does not provide a way to get the unmasked value when it is used as a directive

  Most of the credit goes to: 

- https://github.com/vuejs-tips/v-money/tree/master/src
- https://github.com/luizhenriquerdias/vuejs-money
