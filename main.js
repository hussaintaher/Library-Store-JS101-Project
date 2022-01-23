let prompt = require('prompt');
prompt.start();

// Global Variables
let allBooks = [['1234', 'adventure', 'hussain', '400', '90'], ['1234', 'love', 'ali', '20', '500']];

//-------------Start Functions-------------------------------------
// Show All Books
const showAllBooks = async () => {
    console.log(allBooks);
    wantRepeat();
}
// Add new Book
const addBook = async () => {
    let {bookNumber, bookTitle, bookAuthor, bookPrice, bookQuantity} = await prompt.get(['bookNumber', 'bookTitle', 'bookAuthor', 'bookPrice', 'bookQuantity']);
    allBooks.push([bookNumber, bookTitle, bookAuthor, bookPrice, bookQuantity]);
    console.log('See your All Books ^_*: ')
    showAllBooks();
}

// Edit Book
const editBook = async () => {
    let {question: bookNum} = await prompt.get({description: 'Write the number of book you wanna edit', type: 'string'});
    let {question: inputText} = await prompt.get({description: 'What you want to edit - number, author, title, price, quantity?', type: 'string'});
    let {question: newValue} = await prompt.get({description: 'Write new value', type: 'string'});

    for (let i=0; i < allBooks.length; i++) {
        if (allBooks[i][i].includes(bookNum)) {
            if (inputText === 'number') {
                allBooks[i][0] = newValue
            } else if (inputText === 'title') {
                allBooks[i][1] = newValue
            } else if (inputText === 'author') {
                allBooks[i][2] = newValue
            } else if (inputText === 'price') {
                allBooks[i][3] = newValue
            } else if (inputText === 'quantity') {
                allBooks[i][4] = newValue
            }
            console.log('New Edit:', allBooks[i])
        }
    }
    wantRepeat();
}
// Delete Book using the number of book
const deleteBook = async () => {
    let {question: inputText} = await prompt.get({description: "Write the book's number you wanna delete", type: 'string'});
    let newArr = allBooks.filter((item) => item[0] != inputText);
    allBooks = newArr;
    console.log('Book Deleted: ', newArr);
    wantRepeat();
}
// Show a Book
const showBook = async () => {
    let {question: repeat} = await prompt.get({description: 'Write the name, title or author you wanna see', type: 'string'});
    console.log(repeat)
    let showValue = repeat.toLocaleLowerCase();
    console.log(showValue)
    for (let i=0; i < allBooks.length; i++) {
        if (allBooks[i].includes(showValue)) {
            console.log('I Got It: ', allBooks[i]);
            break;
        }
    }
    wantRepeat()
}
// Selling books
const buyBook = async (userTitle, userQuantity, userBudget) => {
    let [book] = allBooks.filter((item) => item[1] === userTitle);
    if (book != undefined) {
        let bookQuantity = Number(book[4]);
        let bookPrice = Number(book[3]);
        // bookQuantity should be more than 0 and equal or less than the requirement quantitty from the customer
        if (bookQuantity > 0 && userQuantity <= bookQuantity) {
            console.log('Quantity Required:', userQuantity)
            console.log('Number of books:', bookQuantity)
            if (userBudget > 0 && userBudget >= bookPrice) {
                console.log('his money ', userBudget)
                console.log('book\'s price ', bookPrice)
                console.log('he has enough money')
                const receipt = {
                    userTitle,
                    userQuantity,
                    userBudget,
                    book,
                    price: `Total Price: ${userQuantity * bookPrice}`,
                }
                // convert it into JSON
                const a = JSON.stringify(receipt)
                console.log('Your bill:', a)
            } else {
                console.log('there is No money')
            }
        } else {
            console.log('Books are out of stock')
        }
    } else {
        console.log('This book is not available')
    }
    wantRepeat()    
}
// To repeat the program
const wantRepeat = async () => {
    // Do you want to add more book ?
    let {question: x} = await prompt.get({description: 'Do you want to repeat y/n?', type: 'string'});
    console.log(x)
    if (x === 'yes') {
        runAgain()
    } else {
        console.log('Good Bay')
        return;
    }
}
//-------------End Functions-------------------------------------


//-------------Start Starting Function Point-------------------------------------
const entryPoint = async () => {
    // What do you want to do exacly ?
    let {question: toDo} = await prompt.get({description: 'Choose Service - add/show/show all/edit/delete/buy?', type: 'string'});
    switch(toDo) {
        case 'add':
            addBook();
            break;
        case 'edit':
            editBook();
            break;
        case 'delete':
            deleteBook();
            break;
        case 'show':
            showBook();
            break;
        case 'show all':
            showAllBooks(); // I write custom arguments instead of prompt for fast result
            break;
        case 'buy':
            buyBook('love', 500, 30); // I write custom arguments instead of prompt for fast result
            break;
        default:
            console.log('write your command correctly! --__--');
            
    }   
    
}
//-------------End Starting Function Point-------------------------------------


//-------------End Repeating Function-------------------------------------
// Run the program again
const runAgain = () => {
    entryPoint();
}
//-------------End Repeating Function-------------------------------------

//-----------Run--------------------------------------------
entryPoint(); // Comment the function to stop the program
//-----------Run--------------------------------------------

