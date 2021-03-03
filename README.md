# Apple Calculator

This is repository is an implementation of an Apple Calculator. It supports addition, subtraction, multiplication, and division.

You check it out [here](https://linakherchi.github.io/react-calculator/)

## Screenshots 

<img width="887" alt="Screen Shot 2021-03-02 at 7 56 28 PM" src="https://user-images.githubusercontent.com/51456702/109751258-edccdd80-7b92-11eb-855e-5ce978c052d6.png">

## Technologies used

* HTML5
* SCSS 
* React 

## Features 

This calculator supports a number of features that exist in the Apple Calculator: 
1. It has a limit of 9 digits in the calculator screen;
2. Numbers are separated by commas at every 3 digits;
3. If a resulting number is too big, that number is converted to an exponential syntax:

![2021-03-02 20 39 44](https://user-images.githubusercontent.com/51456702/109753670-89604d00-7b97-11eb-80fe-b5cf2a8f7e32.gif)

4. It handles decimal numbers and slices result accordingly to not display more than 9 digits;
5. It supports addition, subtraction, multiplication, and division and respects the priority of operations;

![2021-03-02 20 42 50](https://user-images.githubusercontent.com/51456702/109753960-05f32b80-7b98-11eb-867d-9fab799a25fe.gif)

6. The operator screen shows the running total of the operation so far. That is, if I press “5”, then “+”, then “5” then “+” it should display “10”;

![2021-03-02 20 52 30](https://user-images.githubusercontent.com/51456702/109754671-515a0980-7b99-11eb-8c8c-13acfa795f73.gif)

7. The AC button clears the running total and displays a blank result;
8. The equals button clears the running total and displays the result. Thus, whatever is pressed next will begin a new chain of operations;

![2021-03-02 20 55 46](https://user-images.githubusercontent.com/51456702/109754906-c0cff900-7b99-11eb-939e-dc3c5901dc66.gif)


## How to start locally 

* `npm install`
* `npm start` 

Note: If you want to work on CSS, you will need to run `scss --watch styles/application.scss:styles/application.css` on a separate terminal

## Code example

The function below displays a number on the screen calculator when the number is not a decimal. If the length of the number to display is greater than 9, that means that the number is too big and we want to convert it to an exponential version.

If not, we want to display we as a 3 digits comma separated number.
```js

displayResult(){
  if (String(this.state.displayedNumber).length > 9){
    return this.state.displayedNumber.toExponential(1);
  } else {
    return this.state.displayedNumber.toLocaleString();
  }
}

```






