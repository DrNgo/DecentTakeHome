pragma solidity >= 0.5.0 < 0.7.0;

contract DecentTakeHome {
  event Greeting(
    string greeting
  );
  string greeting;
  constructor() public {
    greeting = 'Hello World';
  }
  function greet() public {
    emit Greeting(greeting);
  }
}