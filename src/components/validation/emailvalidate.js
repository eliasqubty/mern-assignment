function validate(emailToTest) {
  // check for @
  var atSymbol = emailToTest.indexOf("@");
  if (atSymbol < 1) return false;

  var dot = emailToTest.indexOf(".");
  if (dot <= atSymbol + 2) return false;

  // check that the dot is not at the end
  if (dot === emailToTest.length - 1) return false;

  return true;
}

export { validate };
