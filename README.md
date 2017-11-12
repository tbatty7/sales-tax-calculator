# sales-tax-calculator
Kata that has you create a calculator that prints out the sales tax and totals of a list of items.

- This was written using Node with the testing suite composed of Mocha and Chai.

## Installing and running tests.

1.	Open up Terminal/Git Bash.
2.	Change directory **cd** to directory that this project is downloaded to.
3.	Run the following command: **npm install**.
4.  To run tests type ***npm test***.

## Assumptions for project

- Input must a string, as indicated by instructions, consisting of quantity first, then item name, followed by the word 'at' and ending with the net price.
- Quantity is a positive integer
- Price is a positive number formatted as money depicting cents after the decimal point.
- Imported items have the word 'imported' in them.
- Output must be a set of multiple strings, as indicated by instructions, with quantity, followed by item name, and the gross cost, as well as the totaled sales tax and the gross total.
- There must be a list that holds items that will be exempt of sales tax.
- Each item must be input seperately.
- The tax must only be combined with the cost at output, it cannot change the stored value of the cost, because two seperate taxes must be calculated from it.
- The money must be converted to integers before calculations can be made with it and then converted back at output.
