About:

Since my first code review on this app I have striven to better encapsulate my classes and become more consistent in my syntax. The search feature is now much more robust and repopulates the original list of books. I also wanted to prepopulate some books but it kept referring to that original list when reloading the page.

I undertook this project to better understand Object Oriented Programming. I drew inspiration from <a href="https://github.com/arizonal2014/OOP-Book-List-Project-with-ES6-Vanilla-JavaScript/blob/master/BookList/appes6.js">this Book List project</a>. However, I have made several changes which include:

<ol>
    <li>Use more semantic HTML than the collection of divs in the example</li>
    <li>Store the book entries in localStorage. This allowed me to: </li>
        <ul>
            <li>Have the entries persist over different sessions</li>
            <li>Make some significant changes to the Javascript</li>
        </ul>
    <li>I used CSS Grid for the responsive layout as opposed to the CSS library used in the example</li>
    <li>I added search functionality</li>
</ol>
