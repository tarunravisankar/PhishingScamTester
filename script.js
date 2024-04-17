const emails = [
    {
        subject: "Urgent: Security Alert - Action Required",
        content: "Dear [Your Name],<br><br>We have detected suspicious activity on your account and it requires immediate attention. To secure your account, please click the link below to verify your identity:<br><br>Link: <a href='hxxps://www.amaz0n.com' class='fake-link' title='https://www.amazon.com'>Click Here</a><br><br>Please act promptly to avoid any further complications. If you have any questions or concerns, don't hesitate to contact our support team.<br><br>Thank you for your cooperation.<br><br>Sincerely,<br>Amazon Support",
        phishing: true
    },
    {
        subject: "Account Verification Required",
        content: "Dear [Your Name],<br><br>Your account is due for verification. Failure to verify your account within 24 hours may result in suspension. Please click the link below to proceed with the verification process:<br><br>Link: <a href='hxxp://www.apple-io.com' class='fake-link' title='https://www.apple.com'>Click Here</a><br><br>Regards,<br>Apple Support",
        phishing: true
    },
    {
        subject: "Your Amazon Order Confirmation",
        content: "Dear [Your Name],<br><br>Thank you for your recent purchase on Amazon. Your order details are as follows:<br><br>Order Number: 123456789<br>Product: XYZ<br>Total Amount: $50<br><br>If you have any questions or concerns regarding your order, please feel free to contact us.<br><br>Regards,<br>Amazon Customer Service",
        phishing: false
    },
    {
        subject: "Your Monthly Newsletter",
        content: "Dear Subscriber,<br><br>Here's your monthly newsletter with the latest updates and offers. Stay informed and enjoy exclusive deals!<br><br>Best regards,<br>Newsletter Team",
        phishing: false
    },
    {
        subject: "You've Won a Prize!",
        content: "Congratulations [Your Name],<br><br>You've been selected as the lucky winner of our prize giveaway! To claim your prize, please click the link below:<br><br>Link: <a href='hxxp://claimyurprize.cm' class='fake-link' title='https://www.prize-giveaway.cm'>Click Here</a><br><br>Don't miss out on this opportunity!<br><br>Best regards,<br>Prize Giveaway Team",
        phishing: true
    },
    {
        subject: "Important Account Update Required",
        content: "Dear [Your Name],<br><br>We've noticed unusual activity on your account. To secure your account, please log in and update your information immediately:<br><br>Link: <a href='hxxp://www.udateacc0unt.cm' class='fake-link' title='https://www.update-account.com'>Click Here</a><br><br>Regards,<br>Account Security Team",
        phishing: true
    },
    {
        subject: "Your Monthly Newsletter",
        content: "Dear Subscriber,<br><br>Here's your monthly newsletter with the latest updates and offers. Stay informed and enjoy exclusive deals!<br><br>Best regards,<br>Newsletter Team",
        phishing: false
    },
    {
        subject: "Payment Confirmation",
        content: "Hi [Your Name],<br><br>Your recent payment of $50 has been successfully processed. Thank you for your purchase!<br><br>Best regards,<br>Payment Team",
        phishing: false
    },
    {
        subject: "Urgent: Account Suspension Notice",
        content: "Dear [Your Name],<br><br>Your account has been flagged for suspicious activity and will be suspended if not resolved immediately. Click the link below to verify your account details:<br><br>Link: <a href='hxxp://verifyaccount.com' class='fake-link' title='https://www.account-verify.com'>Click Here</a><br><br>Regards,<br>Account Management Team",
        phishing: true
    },
    {
        subject: "Urgent: Tax Payment Required",
        content: "Dear Taxpayer,<br><br>We have detected discrepancies in your recent tax filings that require immediate attention. Failure to resolve these issues promptly may result in penalties or legal actions.<br><br>To address this matter, please call our dedicated Tax Resolution Team at the following number:<br><br>Phone Number: <span class='fake-number' title='1-800-123-4567'>1-800-123-4567</span><br><br>Our representatives are available to assist you with resolving your tax concerns. Please have your tax identification information ready when you call.<br><br>Thank you for your cooperation.<br><br>Sincerely,<br>Internal Revenue Service (IRS)",
        phishing: true
    }
    
    
];


let currentEmailIndex = 0;
let correctAnswers = 0;

function startTest() {
    const userName = document.getElementById("name").value.trim();
    if (userName === "") {
        alert("Please enter your name to start the test.");
        return;
    }

    document.getElementById("name-input").style.display = "none";
    document.getElementById("email-container").style.display = "block";
    document.getElementById("options-container").style.display = "block";
    document.getElementById("score").innerText = `Score: ${correctAnswers}/${emails.length}`;
    displayEmail();
}

function displayEmail() {
    const emailContainer = document.getElementById("email-container");
    const currentEmail = emails[currentEmailIndex];
    const userName = document.getElementById("name").value.trim();
    let personalizedContent = currentEmail.content.replace("[Your Name]", userName);

    emailContainer.innerHTML = `
        <h2>${currentEmail.subject}</h2>
        <p>${personalizedContent}</p>
    `;

    // Apply styling to email content
    emailContainer.style.border = "1px solid #ccc";
    emailContainer.style.padding = "20px";
    emailContainer.style.borderRadius = "5px";
    emailContainer.style.backgroundColor = "#fff";

    // Apply underlining to the links
    const fakeLinks = emailContainer.querySelectorAll('.fake-link');
    fakeLinks.forEach(link => {
        link.style.textDecoration = 'underline';
        link.style.cursor = 'pointer';
        link.addEventListener('focus', () => {
            link.setAttribute('title', 'Click the link!');
        });
        link.addEventListener('blur', () => {
            const originalTitle = link.getAttribute('title');
            link.setAttribute('title', originalTitle);
        });
    });
}




function selectOption(option) {
    const phishingBtn = document.getElementById("phishing-btn");
    const realEmailBtn = document.getElementById("real-email-btn");

    if (option === 'phishing') {
        if (!phishingBtn.classList.contains('selected')) {
            phishingBtn.classList.add('selected');
            realEmailBtn.classList.remove('selected');
            evaluateAnswer('phishing');
        }
    } else if (option === 'real') {
        if (!realEmailBtn.classList.contains('selected')) {
            realEmailBtn.classList.add('selected');
            phishingBtn.classList.remove('selected');
            evaluateAnswer('real');
        }
    }
}

function evaluateAnswer(selectedOption) {
    const currentEmail = emails[currentEmailIndex];
    if ((selectedOption === 'phishing' && currentEmail.phishing) || (selectedOption === 'real' && !currentEmail.phishing)) {
        correctAnswers++;
        showFeedback(true); // Show feedback for correct answer
    } else {
        showFeedback(false); // Show feedback for incorrect answer
    }

    currentEmailIndex++;
    document.getElementById("score").innerText = `Score: ${correctAnswers}/${emails.length}`;

    if (currentEmailIndex < emails.length) {
        displayEmail(); // Display the next email
        document.getElementById("phishing-btn").classList.remove('selected');
        document.getElementById("real-email-btn").classList.remove('selected');
    } else {
        endTest();
    }
}

function showFeedback(isCorrect) {
    const feedbackContainer = document.getElementById("feedback");
    const currentEmail = emails[currentEmailIndex];

    if (isCorrect) {
        feedbackContainer.innerHTML = `
            <p><strong>Correct!</strong> This email is indeed a phishing attempt.</p>
        `;
    } else {
        feedbackContainer.innerHTML = `
            <p><strong>Incorrect.</strong> This email is a phishing attempt. Pay attention to ${currentEmail.phishing ? 'the suspicious link in the bottom left-hand corner on a laptop or press and hold on link without clicking on a phone.' : 'the legitimate sender and content.'}</p>
        `;
    }

    feedbackContainer.style.display = "block";

    // Hide the feedback after 3 seconds
    setTimeout(() => {
        feedbackContainer.style.display = "none";
    }, 3000); // 3000 milliseconds = 3 seconds
}


function endTest() {
    document.getElementById("phishing-btn").style.display = "none";
    document.getElementById("real-email-btn").style.display = "none";
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("result").innerHTML = `You scored ${correctAnswers} out of ${emails.length}.<br><button onclick="resetQuiz()">Take the quiz again</button>`;
    document.getElementById("result").style.display = "block";
}

function goToHome() {
    window.location.href = "index.html"; // Redirect to the index.html page
}

function resetQuiz() {
    // Reset quiz variables
    currentEmailIndex = 0;
    correctAnswers = 0;

    // Reset UI
    document.getElementById("name-input").style.display = "block";
    document.getElementById("email-container").style.display = "none";
    document.getElementById("options-container").style.display = "none";
    document.getElementById("phishing-btn").style.display = "block";
    document.getElementById("real-email-btn").style.display = "block";
    document.getElementById("submit-btn").style.display = "none"; // Hide submit button
    document.getElementById("result").style.display = "none";

    // Clear user input
    document.getElementById("name").value = "";

    // Update score display
    document.getElementById("score").innerText = `Score: ${correctAnswers}/${emails.length}`;
}
