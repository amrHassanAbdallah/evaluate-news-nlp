import validURL from "../src/validURL"
// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the submit functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the validURL() function", () => {
           // Define the input for the function, if any, in the form of variables/array
           // Define the expected output, if any, in the form of variables/array
           // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
           // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
           expect(validURL).toBeDefined();
})
test("Testing invalid url with non url as input", () => {
    let input = "(not-url)"
    let expected = false
   expect(validURL(input)).toBe(expected)
})
test("Testing valid url", () => {
    let input = "http://google.com"
    let expected = true
   expect(validURL(input)).toBe(expected)
})

});