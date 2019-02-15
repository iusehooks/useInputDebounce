A custom React Hook for debouncing user inputs on Input and Textarea elements.

![useInputDebounce](img/useinputdebounce.gif)

- [Example](#example)
- [CodeSandbox Example](#codesandbox-example)
- [API Reference](#api-reference)
- [License](#license)

[![Build Status](https://travis-ci.org/iusehooks/useInputDebounce.svg?branch=master)](https://travis-ci.org/iusehooks/useInputDebounce) ![License](https://img.shields.io/npm/l/useinputdebounce.svg?style=flat)

# Installation

```sh
npm install --save useinputdebounce
```

# Example

```js
import React, { useState } from "react";
import ReactDOM from "react-dom";
import useInputDebounce from "useinputdebounce";

function App() {
  const [results, setSearch] = useState([]);

  const effect = async (value, updateValue) => {
    const res = await searchCharacters(value);
    setSearch(res);
  };

  const attributes = useInputDebounce(effect, { delay: 200, minLength: 1 });

  return (
    <div>
      <input {...attributes} placeholder="Search Country..." />
      {results.map(result => (
        <div key={result.name}>
          <h2>{result.name}</h2>
        </div>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

function searchCharacters(search) {
  return fetch(`https://restcountries.eu/rest/v2/name/${search}`)
    .then(r => r.json())
    .then(r => (r.status !== 404 ? r : []))
    .catch(error => []);
}
```

# CodeSandbox Example

- Fetching Data: [Sandbox](https://codesandbox.io/s/2p8q4p4jvj)

# API Reference

```js
const { value, onChange } = useInputDebounce(effect, { opts });
```

### Returns:

These should be applied to your input element.

- value: <string> current input value
- onChange(): <func> called on input value change

### Parameters:

- `effect`: The function you wish to execute after the debounce delay.
  - Arguments: **value**, **updateValue()**. These arguments will be passed to your effect function when it is called by useInputDebounce after the delay (see example above).
    - _value_: a string with the current value of the input
    - _updateValue(string)_: a function allowing you to update the input value after debounce delay
- `opts`: An object whose properties can be { delay, minLength, initial }
  - default values:
    - delay: 0 (zero)
    - minLength: 0 (zero)
    - initial: no initial value (undefined)

# License

This software is free to use under the MIT license.
See the [LICENSE file](/LICENSE.md) for license text and copyright information.
