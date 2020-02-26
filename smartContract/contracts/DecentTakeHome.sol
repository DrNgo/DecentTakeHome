pragma solidity >= 0.5.0 < 0.7.0;

contract DecentTakeHome {
  uint public stringCount = 0;

  struct String {
    uint id;
    string data;
  }

  mapping(uint => String) public strings;

  event NewString(
    uint id,
    string content
  );

  function addString(string memory _content) public {
    stringCount ++;
    strings[stringCount] = String(stringCount, _content);
    emit NewString(stringCount, _content);
  }
}